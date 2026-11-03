import { db, ResearchRecord, VerificationStatus } from '../db.js';
import { aiEngine } from './aiEngine.js';
import { sanitizeUntrustedContent } from './types.js';

export interface ResearchQueryOptions {
  category?: 'job' | 'internship' | 'scholarship' | 'admission' | 'research' | 'fellowship' | 'conference' | 'exam' | 'news';
  targetInstitution?: string;
  targetExam?: string;
  customQuery?: string;
  maxResults?: number;
}

export class WebResearchEngine {
  // Authoritative biotechnology & science domains in India & internationally
  public readonly AUTHORITATIVE_DOMAINS = [
    'dbtindia.gov.in',
    'dbt.nta.ac.in',
    'dst.gov.in',
    'serb.gov.in',
    'anrfonline.in',
    'csir.res.in',
    'csirnet.nta.ac.in',
    'icmr.nic.in',
    'birac.nic.in',
    'rcb.res.in',
    'iisc.ac.in',
    'tifr.res.in',
    'ncbs.res.in',
    'nta.ac.in',
    'ugc.gov.in',
    'gate2026.iitr.ac.in',
    'jam2026.iitd.ac.in',
    'pgcuet.samarth.ac.in',
    'webjapps.ias.ac.in',
    'insaindia.res.in',
  ];

  /**
   * Fetch and safely extract text from an official source URL with timeout and sanitization
   */
  public async fetchOfficialSource(url: string): Promise<{ text: string; success: boolean; error?: string }> {
    try {
      const parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return { text: '', success: false, error: 'Invalid URL protocol' };
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 BioScienceHubResearchBot/1.0',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        return { text: '', success: false, error: `HTTP ${res.status} from source portal` };
      }

      const html = await res.text();
      const sanitized = sanitizeUntrustedContent(html, 20000);

      return {
        text: sanitized,
        success: true,
      };
    } catch (err: any) {
      return {
        text: '',
        success: false,
        error: err.message || 'Failed to retrieve source portal',
      };
    }
  }

  /**
   * Run targeted search via Tavily API (if configured) or fallback to Gemini Search Grounding
   */
  public async searchOfficialSources(query: string): Promise<{ title: string; url: string; snippet: string }[]> {
    const tavilyKey = process.env.TAVILY_API_KEY;

    // 1. Tavily API if configured
    if (tavilyKey && tavilyKey.trim().length > 0) {
      try {
        const res = await fetch('https://api.tavily.com/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: tavilyKey,
            query: `${query} official notification OR application form DBT DST CSIR NTA IISc`,
            search_depth: 'advanced',
            include_domains: this.AUTHORITATIVE_DOMAINS,
            max_results: 6,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.results)) {
            return data.results.map((r: any) => ({
              title: r.title || 'Official Portal',
              url: r.url,
              snippet: r.content || '',
            }));
          }
        }
      } catch (e) {
        console.warn('[WebResearchEngine] Tavily query warning, falling back to Gemini Grounding:', e);
      }
    }

    // 2. Fallback to Gemini Google Search Grounding
    try {
      const searchPrompt = `Find official announcements, government notifications, or portal updates for: ${query}.
Focus strictly on official Indian science institutions (DBT, DST, CSIR, ICMR, NTA, RCB, IISc, IITs).
Return a bulleted summary and list all official URLs found.`;

      const geminiRes = await aiEngine.executeWithFailover(
        {
          systemPrompt: 'You are an autonomous scientific researcher for BioScience Hub. You identify official, genuine announcements and their source URLs.',
          userPrompt: searchPrompt,
        },
        { enableSearchGrounding: true, preferredProvider: 'gemini' }
      );

      if (geminiRes.sources && geminiRes.sources.length > 0) {
        return geminiRes.sources.map((s) => ({
          title: s.title,
          url: s.url,
          snippet: geminiRes.text.substring(0, 200),
        }));
      }
    } catch (e) {
      console.warn('[WebResearchEngine] Gemini search grounding fallback warning:', e);
    }

    return [];
  }

  /**
   * Conduct structured research cycle and extract verified opportunity records
   */
  public async conductResearchCycle(options: ResearchQueryOptions): Promise<ResearchRecord[]> {
    const store = db.getData();
    const mode = store.aiConfig.operatingMode;
    const maxItems = options.maxResults || store.aiConfig.maxItemsPerResearchRun || 6;

    let queryTopic = 'biotechnology JRF vacancy project associate summer fellowship 2026';
    if (options.customQuery) {
      queryTopic = options.customQuery;
    } else if (options.targetExam) {
      queryTopic = `${options.targetExam} official bulletin examination date syllabus eligibility NTA`;
    } else if (options.targetInstitution) {
      queryTopic = `${options.targetInstitution} biotechnology fellowship recruitment admission notification`;
    } else if (options.category) {
      queryTopic = `biotechnology ${options.category} official notification deadline eligibility stipend`;
    }

    db.addAiActivityLog('system', 'RESEARCH_CYCLE_STARTED', 'DISCOVERY', [], 0, 'success', {
      queryTopic,
      category: options.category,
      operatingMode: mode,
    });

    // 1. Discover official leads
    const searchResults = await this.searchOfficialSources(queryTopic);
    const discoveredUrls = searchResults.map((r) => r.url);

    // 2. Prompt LLM to extract structured records from discovered information
    const extractionSystemPrompt = `You are the Scientific Research & Verification Engine of BioScience Hub.
Your task is to analyze discovered notifications and extract strictly genuine records.

RULES:
1. Only extract information supported by official facts.
2. If any field (stipend, deadline, eligibility) is not explicitly stated in the source, mark it as "Unknown". NEVER invent or guess details.
3. Classify verification status strictly:
   - "Verified Official": Original official agency notification URL is confirmed.
   - "Official Source Found – Further Review Needed": Official page found but incomplete criteria.
   - "Unverified": Secondary lead, requires inspection.
4. Return an exact JSON array of objects.

JSON schema per item:
{
  "title": string,
  "category": "job" | "internship" | "scholarship" | "admission" | "research" | "fellowship" | "conference" | "exam",
  "institution": string,
  "originalSourceUrl": string,
  "notificationUrlOrPdf": string,
  "publicationDate": string or "Unknown",
  "applicationOpeningDate": string or "Unknown",
  "applicationDeadline": string (YYYY-MM-DD) or "Unknown",
  "eligibility": string,
  "stipendOrFunding": string or "Unknown",
  "location": string or "Unknown",
  "duration": string or "Unknown",
  "officialApplicationLink": string or "Unknown",
  "verificationStatus": "Verified Official" | "Official Source Found – Further Review Needed" | "Unverified",
  "evidenceNotes": string (cite specific official notification number, date, or bulletin section)
}`;

    const userPrompt = `Analyze the following research leads for topic: "${queryTopic}".
Leads & Sources:
${searchResults.map((r, i) => `[Lead ${i + 1}] Title: ${r.title}\nURL: ${r.url}\nExcerpt: ${r.snippet}`).join('\n\n')}

Extract up to ${maxItems} verified opportunities in valid JSON format only.`;

    let extractedItems: any[] = [];
    let providerUsed = 'unknown';

    try {
      const aiResponse = await aiEngine.executeWithFailover({
        systemPrompt: extractionSystemPrompt,
        userPrompt,
        responseMimeType: 'application/json',
      });

      providerUsed = aiResponse.provider;
      const parsed = JSON.parse(aiResponse.text);
      if (Array.isArray(parsed)) {
        extractedItems = parsed;
      } else if (parsed && Array.isArray(parsed.items)) {
        extractedItems = parsed.items;
      }
    } catch (e: any) {
      console.warn('[WebResearchEngine] Extraction JSON parsing warning:', e);
      // Fallback empty if model did not return array
      extractedItems = [];
    }

    // 3. Normalize records and deduplicate against existing store
    const nowIso = new Date().toISOString();
    const createdRecords: ResearchRecord[] = [];

    for (const item of extractedItems) {
      if (!item.title || !item.institution) continue;

      // Check duplicates in existing opportunities or research queue
      const isDuplicate = store.opportunities.some(
        (opp) =>
          opp.title.toLowerCase().trim() === item.title.toLowerCase().trim() &&
          opp.organization.toLowerCase().trim() === item.institution.toLowerCase().trim()
      ) || store.aiResearchQueue.some(
        (q) =>
          q.title.toLowerCase().trim() === item.title.toLowerCase().trim() &&
          q.institution.toLowerCase().trim() === item.institution.toLowerCase().trim()
      );

      if (isDuplicate) {
        continue;
      }

      const record: ResearchRecord = {
        id: 'res-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        title: String(item.title).trim(),
        category: (item.category as any) || options.category || 'job',
        institution: String(item.institution).trim(),
        originalSourceUrl: item.originalSourceUrl || item.notificationUrlOrPdf || 'Unknown',
        notificationUrlOrPdf: item.notificationUrlOrPdf || item.originalSourceUrl || 'Unknown',
        publicationDate: item.publicationDate !== 'Unknown' ? item.publicationDate : undefined,
        applicationOpeningDate: item.applicationOpeningDate !== 'Unknown' ? item.applicationOpeningDate : undefined,
        applicationDeadline: item.applicationDeadline !== 'Unknown' ? item.applicationDeadline : undefined,
        eligibility: item.eligibility || 'Refer to official notification bulletin.',
        stipendOrFunding: item.stipendOrFunding !== 'Unknown' ? item.stipendOrFunding : undefined,
        location: item.location !== 'Unknown' ? item.location : 'India',
        duration: item.duration !== 'Unknown' ? item.duration : undefined,
        officialApplicationLink: item.officialApplicationLink !== 'Unknown' ? item.officialApplicationLink : undefined,
        lastCheckedAt: nowIso,
        lastUpdatedAt: nowIso,
        verificationStatus: (item.verificationStatus as VerificationStatus) || 'Official Source Found – Further Review Needed',
        evidenceNotes: item.evidenceNotes || 'Extracted from official portal announcement.',
        sourceMetadata: {
          searchQuery: queryTopic,
          discoveredAt: nowIso,
          confidenceScore: item.verificationStatus === 'Verified Official' ? 0.95 : 0.75,
        },
        discoveredByProvider: providerUsed,
        isPublishedToLive: false,
      };

      store.aiResearchQueue.unshift(record);
      createdRecords.push(record);
    }

    // Limit queue size to 200 items
    if (store.aiResearchQueue.length > 200) {
      store.aiResearchQueue = store.aiResearchQueue.slice(0, 200);
    }

    db.addAiActivityLog(providerUsed, 'RESEARCH_CYCLE_COMPLETED', 'DISCOVERY', discoveredUrls, createdRecords.length, 'success', {
      queryTopic,
      newRecordsAdded: createdRecords.length,
      mode,
    });

    db.save();
    return createdRecords;
  }
}

export const webResearchEngine = new WebResearchEngine();
