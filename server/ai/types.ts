/**
 * Autonomous AI Research & Management System Types & Sanitization Utilities
 */

export interface AiModelRequest {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  responseMimeType?: string;
  tools?: any[];
}

export interface AiModelResponse {
  text: string;
  provider: string;
  model: string;
  sources?: { title: string; url: string }[];
  tokensUsed?: number;
  durationMs: number;
}

export interface ProviderHealthStatus {
  provider: string;
  configured: boolean;
  operational: boolean;
  latencyMs?: number;
  model: string;
  message: string;
  error?: string;
}

/**
 * Sanitizes untrusted text retrieved from external web sources / PDFs.
 * Protects against prompt injection by:
 * 1. Stripping control characters and raw HTML script/style blocks.
 * 2. Neutralizing common prompt override tokens (e.g., "Ignore previous instructions", "SYSTEM PROMPT:").
 * 3. Enclosing in clear untrusted payload tags so the LLM treats it as pure inert data.
 */
export function sanitizeUntrustedContent(raw: string, maxChars: number = 25000): string {
  if (!raw || typeof raw !== 'string') return '';

  let cleaned = raw
    // Strip script and style tags and their contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    // Strip HTML tags to plain text
    .replace(/<[^>]+>/g, ' ')
    // Normalize excessive whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Neutralize common prompt injection patterns
  const injectionPatterns = [
    /ignore\s+(all\s+)?previous\s+instructions/gi,
    /system\s+prompt\s*:/gi,
    /you\s+are\s+now\s+in\s+developer\s+mode/gi,
    /disregard\s+(the\s+)?above/gi,
    /override\s+all\s+safety/gi,
    /print\s+your\s+instructions/gi,
    /reveal\s+your\s+api\s+key/gi,
  ];

  for (const pattern of injectionPatterns) {
    cleaned = cleaned.replace(pattern, '[REDACTED_POTENTIAL_INJECTION]');
  }

  // Truncate to maximum allowable characters
  if (cleaned.length > maxChars) {
    cleaned = cleaned.substring(0, maxChars) + '... [TRUNCATED_FOR_SAFETY]';
  }

  return `<untrusted_web_source_content>\n${cleaned}\n</untrusted_web_source_content>`;
}
