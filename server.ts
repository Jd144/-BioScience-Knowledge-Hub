import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

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
