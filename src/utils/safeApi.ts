/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Safe API Utility
 * Resilient JSON fetcher that eliminates uncaught SyntaxError:
 * "Unexpected token 'A', 'A server e'... is not valid JSON"
 */

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
}

export async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const headers = new Headers(options?.headers || {});

  // Automatically attach Admin Token from localStorage if not specified
  if (!headers.has('Authorization')) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('bioscience_admin_session_token') : null;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Default to application/json for non-GET if body is a string
  if (options?.body && typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const text = await res.text();
    let data: any = null;

    if (text && text.trim()) {
      try {
        data = JSON.parse(text);
      } catch {
        // Text is not JSON (e.g. "A server error occurred" or HTML page)
        const cleanMessage = text.replace(/<[^>]+>/g, '').trim().substring(0, 200);
        return {
          ok: false,
          status: res.status,
          data: null,
          error: cleanMessage || `Server responded with status ${res.status}`,
        };
      }
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: data?.error || data?.message || `Request failed with status ${res.status}`,
      };
    }

    return {
      ok: true,
      status: res.status,
      data,
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: err?.message || 'Network communication error',
    };
  }
}
