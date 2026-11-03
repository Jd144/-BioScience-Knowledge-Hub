import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

import { adminRouter } from './server/adminRoutes.js';
import { aiRouter } from './server/aiRoutes.js';
import { db } from './server/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Mount Admin API Routers
app.use('/api/admin/ai', aiRouter);
app.use('/api/admin', adminRouter);

// Public Maintenance Status Check
app.get('/api/maintenance/status', (req, res) => {
  db.checkAndAutoExpireMaintenance();
  const m = db.getData().maintenance;
  res.json({
    enabled: m.enabled,
    title: m.title,
    message_en: m.message_en,
    message_hi: m.message_hi,
    personal_message_en: m.personal_message_en,
    personal_message_hi: m.personal_message_hi,
    expected_reopening_iso: m.expected_reopening_iso,
    timezone: m.timezone,
    mini_games: m.mini_games || {
      memory_match: true,
      number_puzzle: true,
      quick_math: true,
      word_scramble: true,
    },
    server_time_iso: new Date().toISOString(),
  });
});

// Public Active Website Popups Endpoint
app.get('/api/popups/active', (req, res) => {
  const store = db.getData();
  const allPopups = store.popups || [];
  const now = new Date();

  const active = allPopups.filter((p) => {
    if (!p.enabled) return false;
    if (p.startDateTime) {
      const start = new Date(p.startDateTime);
      if (now < start) return false;
    }
    if (p.expiryDateTime) {
      const expiry = new Date(p.expiryDateTime);
      if (now > expiry) return false;
    }
    return true;
  });

  res.json(active);
});

// Initialize Google Gen AI with Gemini 3.8 Flash
const ai = new GoogleGenAI();

// Server-side Gemini Search Grounding API route
app.post('/api/gemini-search-grounding', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt string is required' });
    }

    // Call gemini-3.8-flash with googleSearch tool for real-time web grounding
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || 'No response generated.';
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const groundingSources = rawChunks
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Web Reference',
        url: chunk.web?.uri || '',
      }))
      .filter((s: any) => s.url);

    res.json({
      text,
      sources: groundingSources,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini-search-grounding:', error);
    res.status(500).json({
      error: error.message || 'Internal server error during search grounding',
    });
  }
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`BioScience Hub full-stack server running on port ${port}`);
  });
}

startServer();
