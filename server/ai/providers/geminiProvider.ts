import { GoogleGenAI } from '@google/genai';
import { AiModelRequest, AiModelResponse, ProviderHealthStatus } from '../types.js';

export class GeminiProvider {
  private client: GoogleGenAI | null = null;
  private readonly defaultModel = 'gemini-3.8-flash';

  constructor() {
    this.initClient();
  }

  private initClient(): void {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      try {
        this.client = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
      } catch (e) {
        console.warn('[GeminiProvider] Initialization warning:', e);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  public isConfigured(): boolean {
    return Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  }

  public async checkHealth(modelName: string = this.defaultModel): Promise<ProviderHealthStatus> {
    if (!this.isConfigured()) {
      return {
        provider: 'gemini',
        configured: false,
        operational: false,
        model: modelName,
        message: 'GEMINI_API_KEY is not set in environment.',
      };
    }

    const start = Date.now();
    try {
      if (!this.client) this.initClient();
      if (!this.client) throw new Error('Failed to instantiate Google GenAI client');

      const response = await this.client.models.generateContent({
        model: modelName,
        contents: 'Respond with the word "READY" if you are operational for scientific research.',
      });

      const latencyMs = Date.now() - start;
      const text = response.text || '';

      return {
        provider: 'gemini',
        configured: true,
        operational: text.length > 0,
        latencyMs,
        model: modelName,
        message: `Gemini API is operational (Latency: ${latencyMs}ms)`,
      };
    } catch (err: any) {
      return {
        provider: 'gemini',
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: modelName,
        message: err.message || 'Gemini connectivity failed.',
        error: String(err),
      };
    }
  }

  public async execute(
    request: AiModelRequest,
    modelName: string = this.defaultModel,
    enableSearchGrounding: boolean = false
  ): Promise<AiModelResponse> {
    if (!this.isConfigured()) {
      throw new Error('GEMINI_API_KEY not configured in environment variables.');
    }

    if (!this.client) this.initClient();
    if (!this.client) throw new Error('Google GenAI client unavailable.');

    const start = Date.now();

    const config: any = {
      systemInstruction: request.systemPrompt,
    };

    if (request.responseMimeType) {
      config.responseMimeType = request.responseMimeType;
    }

    if (enableSearchGrounding) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await this.client.models.generateContent({
      model: modelName,
      contents: request.userPrompt,
      config,
    });

    const text = response.text || '';
    const durationMs = Date.now() - start;

    // Extract grounding sources if search was enabled
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = rawChunks
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Official Reference',
        url: chunk.web?.uri || '',
      }))
      .filter((s: any) => Boolean(s.url));

    return {
      text,
      provider: 'gemini',
      model: modelName,
      sources,
      durationMs,
    };
  }
}
