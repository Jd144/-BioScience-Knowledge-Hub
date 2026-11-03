import { AiModelRequest, AiModelResponse, ProviderHealthStatus } from '../types.js';

export class OpenRouterProvider {
  private readonly defaultModel = 'meta-llama/llama-3.3-70b-instruct:free';
  private readonly endpoint = 'https://openrouter.ai/api/v1/chat/completions';

  // Strict list of allowed FREE-tier models to prevent any paid billing
  public readonly allowedFreeModels = [
    'meta-llama/llama-3.3-70b-instruct:free',
    'google/gemini-2.0-flash-exp:free',
    'qwen/qwen-2.5-72b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'meta-llama/llama-3.1-8b-instruct:free',
  ];

  public isConfigured(): boolean {
    return Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim().length > 0);
  }

  private validateFreeModel(model: string): string {
    // Enforce that only :free models are used
    if (!model.endsWith(':free') && !this.allowedFreeModels.includes(model)) {
      console.warn(`[OpenRouter] Model "${model}" is not in free tier list. Defaulting to free model.`);
      return this.defaultModel;
    }
    return model;
  }

  public async checkHealth(modelName: string = this.defaultModel): Promise<ProviderHealthStatus> {
    if (!this.isConfigured()) {
      return {
        provider: 'openrouter',
        configured: false,
        operational: false,
        model: modelName,
        message: 'OPENROUTER_API_KEY is not set in environment.',
      };
    }

    const safeModel = this.validateFreeModel(modelName);
    const start = Date.now();

    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://bioscienceknowledge-hub.vercel.app',
          'X-Title': 'BioScience Hub',
        },
        body: JSON.stringify({
          model: safeModel,
          messages: [{ role: 'user', content: 'Respond with the word "READY".' }],
          max_tokens: 10,
        }),
      });

      const latencyMs = Date.now() - start;
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `HTTP ${res.status} ${res.statusText}`;
        return {
          provider: 'openrouter',
          configured: true,
          operational: false,
          latencyMs,
          model: safeModel,
          message: `OpenRouter error: ${errMsg}`,
          error: errMsg,
        };
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '';

      return {
        provider: 'openrouter',
        configured: true,
        operational: content.length > 0,
        latencyMs,
        model: safeModel,
        message: `OpenRouter free tier operational (Latency: ${latencyMs}ms)`,
      };
    } catch (err: any) {
      return {
        provider: 'openrouter',
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: safeModel,
        message: err.message || 'OpenRouter connectivity failed.',
        error: String(err),
      };
    }
  }

  public async execute(
    request: AiModelRequest,
    modelName: string = this.defaultModel
  ): Promise<AiModelResponse> {
    if (!this.isConfigured()) {
      throw new Error('OPENROUTER_API_KEY not configured in environment variables.');
    }

    const safeModel = this.validateFreeModel(modelName);
    const start = Date.now();

    const messages = [
      { role: 'system', content: request.systemPrompt },
      { role: 'user', content: request.userPrompt },
    ];

    const body: any = {
      model: safeModel,
      messages,
      temperature: request.temperature ?? 0.2,
      max_tokens: request.maxTokens ?? 2048,
    };

    if (request.responseMimeType === 'application/json') {
      body.response_format = { type: 'json_object' };
    }

    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://bioscienceknowledge-hub.vercel.app',
        'X-Title': 'BioScience Hub',
      },
      body: JSON.stringify(body),
    });

    const durationMs = Date.now() - start;

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || `OpenRouter API error HTTP ${res.status}`;
      if (res.status === 429) {
        throw new Error(`RATE_LIMIT: ${errMsg}`);
      }
      throw new Error(`OpenRouter request failed: ${errMsg}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';
    const tokensUsed = data.usage?.total_tokens || 0;

    return {
      text,
      provider: 'openrouter',
      model: safeModel,
      tokensUsed,
      durationMs,
    };
  }
}
