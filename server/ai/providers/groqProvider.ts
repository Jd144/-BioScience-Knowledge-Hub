import { AiModelRequest, AiModelResponse, ProviderHealthStatus } from '../types.js';

export class GroqProvider {
  private readonly defaultModel = 'llama-3.3-70b-versatile';
  private readonly endpoint = 'https://api.groq.com/openai/v1/chat/completions';

  public isConfigured(): boolean {
    return Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim().length > 0);
  }

  public async checkHealth(modelName: string = this.defaultModel): Promise<ProviderHealthStatus> {
    if (!this.isConfigured()) {
      return {
        provider: 'groq',
        configured: false,
        operational: false,
        model: modelName,
        message: 'GROQ_API_KEY is not set in environment.',
      };
    }

    const start = Date.now();
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: 'user', content: 'Respond with the word "READY".' }],
          max_tokens: 10,
        }),
      });

      const latencyMs = Date.now() - start;
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `HTTP ${res.status} ${res.statusText}`;
        return {
          provider: 'groq',
          configured: true,
          operational: false,
          latencyMs,
          model: modelName,
          message: `Groq error: ${errMsg}`,
          error: errMsg,
        };
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '';

      return {
        provider: 'groq',
        configured: true,
        operational: content.length > 0,
        latencyMs,
        model: modelName,
        message: `Groq API is operational (Latency: ${latencyMs}ms)`,
      };
    } catch (err: any) {
      return {
        provider: 'groq',
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: modelName,
        message: err.message || 'Groq connectivity failed.',
        error: String(err),
      };
    }
  }

  public async execute(
    request: AiModelRequest,
    modelName: string = this.defaultModel
  ): Promise<AiModelResponse> {
    if (!this.isConfigured()) {
      throw new Error('GROQ_API_KEY not configured in environment variables.');
    }

    const start = Date.now();

    const messages = [
      { role: 'system', content: request.systemPrompt },
      { role: 'user', content: request.userPrompt },
    ];

    const body: any = {
      model: modelName,
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
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const durationMs = Date.now() - start;

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || `Groq API error HTTP ${res.status}`;
      if (res.status === 429) {
        throw new Error(`RATE_LIMIT: ${errMsg}`);
      }
      throw new Error(`Groq request failed: ${errMsg}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';
    const tokensUsed = data.usage?.total_tokens || 0;

    return {
      text,
      provider: 'groq',
      model: modelName,
      tokensUsed,
      durationMs,
    };
  }
}
