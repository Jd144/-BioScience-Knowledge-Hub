import { db, AiProviderId } from '../db.js';
import { AiModelRequest, AiModelResponse, ProviderHealthStatus } from './types.js';
import { GeminiProvider } from './providers/geminiProvider.js';
import { GroqProvider } from './providers/groqProvider.js';
import { OpenRouterProvider } from './providers/openrouterProvider.js';
import { OllamaProvider } from './providers/ollamaProvider.js';

export class AiEngine {
  private gemini = new GeminiProvider();
  private groq = new GroqProvider();
  private openrouter = new OpenRouterProvider();
  private ollama = new OllamaProvider();

  // In-memory cooldown tracker (timestamps until when a provider is in cooldown)
  private providerCooldowns = new Map<string, number>();

  // In-memory consecutive error counter
  private errorCounts = new Map<string, number>();

  /**
   * Health-check all 5 provider slots and return consolidated status
   */
  public async getHealthReport(): Promise<ProviderHealthStatus[]> {
    const store = db.getData();
    const cfg = store.aiConfig;

    const results: ProviderHealthStatus[] = [];

    // 1. Gemini
    const geminiStatus = await this.gemini.checkHealth(cfg.providerSettings.gemini?.model || 'gemini-3.8-flash');
    results.push(geminiStatus);

    // 2. Groq
    const groqStatus = await this.groq.checkHealth(cfg.providerSettings.groq?.model || 'llama-3.3-70b-versatile');
    results.push(groqStatus);

    // 3. OpenRouter (Free models only)
    const openrouterStatus = await this.openrouter.checkHealth(cfg.providerSettings.openrouter?.model || 'meta-llama/llama-3.3-70b-instruct:free');
    results.push(openrouterStatus);

    // 4. Ollama Gemma 3:4b
    const ollamaGemmaStatus = await this.ollama.checkHealth('gemma3:4b');
    ollamaGemmaStatus.provider = 'ollama_gemma';
    results.push(ollamaGemmaStatus);

    // 5. Ollama Qwen 2.5:1.5b
    const ollamaQwenStatus = await this.ollama.checkHealth('qwen2.5:1.5b');
    ollamaQwenStatus.provider = 'ollama_qwen';
    results.push(ollamaQwenStatus);

    // Update database status notes
    for (const res of results) {
      const pid = res.provider as AiProviderId;
      if (cfg.providerSettings[pid]) {
        cfg.providerSettings[pid].isOperational = res.operational;
        cfg.providerSettings[pid].lastTestedAt = new Date().toISOString();
        if (res.message) {
          cfg.providerSettings[pid].statusNote = res.message;
        }
      }
    }
    db.save();

    return results;
  }

  /**
   * Returns list of providers ordered by priority and availability
   */
  public getEligibleProviders(): AiProviderId[] {
    const store = db.getData();
    const priorities = store.aiConfig.providerPriorities || [
      'gemini',
      'groq',
      'openrouter',
      'ollama_gemma',
      'ollama_qwen',
    ];

    const now = Date.now();

    return priorities.filter((pid) => {
      // Must be enabled in settings
      const settings = store.aiConfig.providerSettings[pid];
      if (settings && !settings.enabled) return false;

      // Must not be currently in rate-limit / failure cooldown
      const cooldownUntil = this.providerCooldowns.get(pid);
      if (cooldownUntil && cooldownUntil > now) {
        return false;
      }

      // Check key configuration for cloud providers
      if (pid === 'gemini' && !this.gemini.isConfigured()) return false;
      if (pid === 'groq' && !this.groq.isConfigured()) return false;
      if (pid === 'openrouter' && !this.openrouter.isConfigured()) return false;

      return true;
    });
  }

  /**
   * Execute request with automatic failover across providers in priority order.
   * If a provider fails with rate limit or transient error, it fails over to the next.
   * If all fail, preserves progress and safely throws with details.
   */
  public async executeWithFailover(
    request: AiModelRequest,
    options?: {
      enableSearchGrounding?: boolean;
      preferredProvider?: AiProviderId;
    }
  ): Promise<AiModelResponse> {
    const store = db.getData();
    let eligible = this.getEligibleProviders();

    // If a preferred provider was requested and is eligible, try it first
    if (options?.preferredProvider && eligible.includes(options.preferredProvider)) {
      eligible = [options.preferredProvider, ...eligible.filter((p) => p !== options.preferredProvider)];
    }

    if (eligible.length === 0) {
      const msg = 'No AI providers currently eligible or configured. Check API keys (GEMINI_API_KEY, GROQ_API_KEY, OPENROUTER_API_KEY) or start Ollama.';
      db.addAiActivityLog('system', 'ALL_PROVIDERS_UNAVAILABLE', 'EXECUTION_FAILOVER', [], 0, 'warning', {
        error: msg,
        cooldowns: Array.from(this.providerCooldowns.entries()).map(([k, v]) => ({
          provider: k,
          cooldownRemainingSec: Math.max(0, Math.ceil((v - Date.now()) / 1000)),
        })),
      });
      throw new Error(msg);
    }

    const errors: { provider: string; error: string }[] = [];

    for (const providerId of eligible) {
      try {
        const settings = store.aiConfig.providerSettings[providerId];
        let response: AiModelResponse;

        if (providerId === 'gemini') {
          const model = settings?.model || 'gemini-3.8-flash';
          response = await this.gemini.execute(request, model, options?.enableSearchGrounding);
        } else if (providerId === 'groq') {
          const model = settings?.model || 'llama-3.3-70b-versatile';
          response = await this.groq.execute(request, model);
        } else if (providerId === 'openrouter') {
          const model = settings?.model || 'meta-llama/llama-3.3-70b-instruct:free';
          response = await this.openrouter.execute(request, model);
        } else if (providerId === 'ollama_gemma') {
          response = await this.ollama.execute(request, 'gemma3:4b');
          response.provider = 'ollama_gemma';
        } else if (providerId === 'ollama_qwen') {
          response = await this.ollama.execute(request, 'qwen2.5:1.5b');
          response.provider = 'ollama_qwen';
        } else {
          continue;
        }

        // Success! Reset error counts for this provider
        this.errorCounts.delete(providerId);
        this.providerCooldowns.delete(providerId);

        // Update active provider in database
        store.aiConfig.activeProvider = providerId;
        db.incrementAiUsage(response.tokensUsed || 0);

        return response;
      } catch (err: any) {
        const errMsg = String(err.message || err);
        errors.push({ provider: providerId, error: errMsg });

        const isRateLimit = errMsg.includes('RATE_LIMIT') || errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED');
        const isAuthError = errMsg.includes('401') || errMsg.includes('403') || errMsg.includes('API_KEY_INVALID');

        // Apply cooldown if rate-limited (60 seconds) or auth-failed (15 minutes to avoid spamming)
        const cooldownSeconds = isRateLimit ? 60 : isAuthError ? 900 : 30;
        this.providerCooldowns.set(providerId, Date.now() + cooldownSeconds * 1000);

        const currentErrCount = (this.errorCounts.get(providerId) || 0) + 1;
        this.errorCounts.set(providerId, currentErrCount);

        db.addAiActivityLog(providerId, 'PROVIDER_FAILOVER_TRIGGERED', 'FAILOVER', [], 0, 'warning', {
          providerFailed: providerId,
          reason: errMsg,
          isRateLimit,
          isAuthError,
          cooldownSeconds,
          consecutiveErrors: currentErrCount,
        });

        console.warn(`[AiEngine] Provider ${providerId} failed (${errMsg}). Failing over to next eligible provider...`);
      }
    }

    // If we reach here, all attempted providers failed
    const combinedMsg = `All available AI providers failed. Attempts: ${errors.map((e) => `${e.provider}: ${e.error}`).join(' | ')}`;
    db.addAiActivityLog('system', 'ALL_PROVIDERS_EXHAUSTED', 'FAILOVER_HALT', [], 0, 'failed', { errors });
    throw new Error(combinedMsg);
  }
}

export const aiEngine = new AiEngine();
