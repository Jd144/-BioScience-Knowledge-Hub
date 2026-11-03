import { AiModelRequest, AiModelResponse, ProviderHealthStatus } from '../types.js';

export class OllamaProvider {
  private getBaseUrl(): string {
    return (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/+$/, '');
  }

  public async checkHealth(modelName: string = 'gemma3:4b'): Promise<ProviderHealthStatus> {
    const baseUrl = this.getBaseUrl();
    const start = Date.now();

    // Use AbortController for short 2500ms probe to avoid blocking cloud runtime
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    try {
      // 1. Probe version endpoint
      const versionRes = await fetch(`${baseUrl}/api/version`, {
        signal: controller.signal,
      }).catch((err) => {
        throw new Error(`Ollama daemon unreachable at ${baseUrl} (${err.message})`);
      });

      if (!versionRes.ok) {
        clearTimeout(timeout);
        return {
          provider: 'ollama',
          configured: true,
          operational: false,
          model: modelName,
          message: `Ollama reachable but returned HTTP ${versionRes.status}`,
        };
      }

      // 2. Check installed models
      const tagsRes = await fetch(`${baseUrl}/api/tags`, {
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeout);

      let modelInstalled = false;
      let installedList: string[] = [];

      if (tagsRes && tagsRes.ok) {
        const tagsData = await tagsRes.json().catch(() => ({}));
        const models = (tagsData.models || []).map((m: any) => m.name);
        installedList = models;
        modelInstalled = models.some((m: string) => m.toLowerCase().includes(modelName.toLowerCase().split(':')[0]));
      }

      const latencyMs = Date.now() - start;

      return {
        provider: 'ollama',
        configured: true,
        operational: true,
        latencyMs,
        model: modelName,
        message: modelInstalled
          ? `Ollama online at ${baseUrl}. Model "${modelName}" is ready.`
          : `Ollama online at ${baseUrl}, but "${modelName}" may need to be pulled (Available: ${installedList.slice(0, 3).join(', ') || 'none'}).`,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      return {
        provider: 'ollama',
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: modelName,
        message: `Local Ollama is offline or unreachable at ${baseUrl}. (Expected if running in cloud container or local daemon is stopped).`,
        error: String(err.message || err),
      };
    }
  }

  public async execute(
    request: AiModelRequest,
    modelName: string = 'gemma3:4b'
  ): Promise<AiModelResponse> {
    const baseUrl = this.getBaseUrl();
    const start = Date.now();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60s for local inference

    try {
      const prompt = `${request.systemPrompt}\n\nTask:\n${request.userPrompt}`;

      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: modelName,
          prompt,
          stream: false,
          format: request.responseMimeType === 'application/json' ? 'json' : undefined,
          options: {
            temperature: request.temperature ?? 0.2,
          },
        }),
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Ollama request failed with HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data.response || '';
      const durationMs = Date.now() - start;

      return {
        text,
        provider: 'ollama',
        model: modelName,
        durationMs,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      throw new Error(`Ollama execution failed: ${err.message}`);
    }
  }
}
