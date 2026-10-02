import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini on server
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// In-memory peace reflections store with pre-seeded curated global reflections
interface Reflection {
  id: string;
  author: string;
  location: string;
  theme: 'peace' | 'truth' | 'courage' | 'humanity' | 'simplicity';
  message: string;
  timestamp: string;
}

const communityReflections: Reflection[] = [
  {
    id: 'ref-1',
    author: 'Aarav Patel',
    location: 'Ahmedabad, India',
    theme: 'peace',
    message: 'Peace is not merely the absence of external conflict; it is the presence of an unwavering calm inside one’s conscience.',
    timestamp: '2026-03-28T10:14:00Z',
  },
  {
    id: 'ref-2',
    author: 'Elena Rostova',
    location: 'Geneva, Switzerland',
    theme: 'truth',
    message: 'To stand with truth when it is unpopular requires deeper courage than any sword can offer.',
    timestamp: '2026-03-29T14:32:00Z',
  },
  {
    id: 'ref-3',
    author: 'Kofi Mensah',
    location: 'Accra, Ghana',
    theme: 'courage',
    message: 'Nonviolence taught our liberation leaders that dignity cannot be confiscated by force if the spirit refuses to surrender.',
    timestamp: '2026-03-30T09:20:00Z',
  },
  {
    id: 'ref-4',
    author: 'Mei Lin Chen',
    location: 'Kyoto, Japan',
    theme: 'simplicity',
    message: 'Living simply so that others may simply live. In our hyper-consumer world, this is the most radical act of kindness.',
    timestamp: '2026-03-31T16:45:00Z',
  },
  {
    id: 'ref-5',
    author: 'Marcus Vance',
    location: 'Atlanta, USA',
    theme: 'humanity',
    message: 'Martin Luther King Jr. walked with Gandhi’s spirit across the Edmund Pettus Bridge. That bridge is still being built today.',
    timestamp: '2026-04-01T11:05:00Z',
  },
];

// Curated historically grounded fallback answers if no API key or network glitch
const getHistoricalFallback = (question: string): { reply: string; source: string; isHypothetical: boolean } => {
  const q = question.toLowerCase();
  
  if (q.includes('nonviolence') || q.includes('conflict') || q.includes('violence')) {
    return {
      reply: 'Nonviolence (Ahimsa) is not a garment to be put on and off at will. Its seat is in the heart, and it must be an inseparable part of our very being. It is not passive submission to evil; it is the active, soul-force resistance to injustice. I have always held that nonviolence is the greatest force at the disposal of mankind. It is mightier than the mightiest weapon of destruction devised by the ingenuity of man.',
      source: 'Harijan (1938) & Young India (1920)',
      isHypothetical: false,
    };
  }

  if (q.includes('technology') || q.includes('modern') || q.includes('ai') || q.includes('computer') || q.includes('phone')) {
    return {
      reply: 'In my lifetime, I did not oppose machinery when it helped the poorest laborer, but I opposed the craze for machinery that concentrated wealth in few hands and displaced human labor into destitution. Regarding modern digital systems: through the lens of Sarvodaya (the welfare of all), any technology should be judged by whether it ennobles human dignity, brings people closer in mutual understanding, and frees the oppressed—or whether it encourages idle greed, division, and dependency.',
      source: 'Young India (Nov 5, 1925) & Contemporary Philosophical Extrapolation',
      isHypothetical: true,
    };
  }

  if (q.includes('unfair') || q.includes('injustice') || q.includes('anger') || q.includes('wronged')) {
    return {
      reply: 'When you are treated unfairly, resist the injustice with all the strength of your soul, but refuse to hate the wrongdoer. As I wrote in Young India: "Hate the sin and love the sinner." To meet anger with anger only doubles the darkness of the world. True Satyagraha means making the oppressor see their own injustice not by breaking their head, but by winning their conscience through patient suffering and moral clarity.',
      source: 'Autobiography: The Story of My Experiments with Truth (1927)',
      isHypothetical: false,
    };
  }

  if (q.includes('truth') || q.includes('courage')) {
    return {
      reply: 'There is no god higher than Truth. In the early years I used to say "God is Truth," but later realization taught me that "Truth is God." And Truth cannot be pursued by a coward. Satyagraha requires the highest form of courage—the bravery to endure hardship without retaliation, to speak what is right when all around you demand silent conformity.',
      source: 'Speech at Lausanne, Switzerland (Dec 8, 1931)',
      isHypothetical: false,
    };
  }

  if (q.includes('young') || q.includes('youth') || q.includes('future') || q.includes('student')) {
    return {
      reply: 'My appeal to young minds has always been to balance book learning with hand labor and moral duty. Cultivate fearlessness, honesty, and simplicity. Do not wait for institutions or governments to reform society; be the change you wish to see manifest in the world. Service to the weakest among us is the highest education you will ever receive.',
      source: 'Address to Students, Ceylon (1927) & Young India',
      isHypothetical: false,
    };
  }

  return {
    reply: 'Truth resides in every human heart, and one has to search for it there, guided by truthfulness in everyday actions. In all your undertakings, ask yourself: does this step help the poorest and weakest person you have ever seen? If it does, your doubt and your fears will melt away.',
    source: 'The Talisman, Collected Works of Mahatma Gandhi (Vol. 89, Aug 1947)',
    isHypothetical: false,
  };
};

// API: Historical Gandhi AI Conversation
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Graceful fallback to verified historical repository
    const fallback = getHistoricalFallback(message);
    return res.json({
      reply: fallback.reply,
      source: fallback.source,
      isHypothetical: fallback.isHypothetical,
      disclaimer: 'Educational simulation grounded in documented archives (Young India, Harijan, Autobiography).',
    });
  }

  try {
    const systemInstruction = `You are a respectful, thoughtful historical assistant for "Talk to History: A Conversation with Gandhi", an archival museum exhibition.
Guidelines:
1. Ground answers strictly in Gandhi's documented writings, speeches, letters, and philosophy (e.g. 'The Story of My Experiments with Truth', 'Hind Swaraj', 'Young India', 'Harijan', letters to Tagore, Salt March dispatches, the 1931 Round Table Conference).
2. Maintain a reflective, gentle, clear, humble tone. Do NOT claim to be the living spirit or consciousness of Gandhi; remain an archival AI guide answering faithfully to his historical legacy.
3. At the end of every answer, provide a "Source Reference:" line citing the specific work, speech, or publication date where his views on this topic are recorded.
4. When asked about modern issues (like social media, AI, smartphones, contemporary conflicts), explicitly distinguish his documented core principles (e.g. Swadeshi, non-exploitation, Sarvodaya, Ahimsa) from hypothetical extrapolation. Clearly label modern interpretations with "[Historical Extrapolation]".
5. Keep answers concise (between 2 to 4 paragraphs), resonant, and pedagogically rich.`;

    const chatContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-4)) {
        if (item.sender === 'user') {
          chatContents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'gandhi') {
          chatContents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    chatContents.push({ role: 'user', parts: [{ text: message }] });

    // Call Gemini with a 5-second timeout safeguard
    const geminiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.6,
        topP: 0.9,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Gemini API call timed out')), 5000);
    });

    const response = await Promise.race([geminiPromise, timeoutPromise]);

    const replyText = response.text || '';
    
    // Separate source citation if detected
    let reply = replyText;
    let source = 'The Collected Works of Mahatma Gandhi (Vols. 1–98)';
    let isHypothetical = replyText.includes('[Historical Extrapolation]');

    const sourceMatch = replyText.match(/Source Reference:\s*([^\n\r]+)/i);
    if (sourceMatch) {
      source = sourceMatch[1].trim();
      reply = replyText.replace(/Source Reference:\s*([^\n\r]+)/i, '').trim();
    }

    return res.json({
      reply,
      source,
      isHypothetical,
      disclaimer: 'AI historical simulation based on Gandhi’s verified speeches, letters, and published archives.',
    });
  } catch (error) {
    console.error('Gemini error, using curated archival fallback:', error);
    const fallback = getHistoricalFallback(message);
    return res.json({
      reply: fallback.reply,
      source: fallback.source,
      isHypothetical: fallback.isHypothetical,
      disclaimer: 'Curated historical archive extract (fallback mode active).',
    });
  }
});

// API: Peace Reflections (Tribute Wall)
app.get('/api/peace-reflections', (req, res) => {
  res.json({ reflections: communityReflections });
});

app.post('/api/peace-reflections', (req, res) => {
  const { author, location, theme, message } = req.body;

  if (!author || !message || message.trim().length < 5) {
    return res.status(400).json({ error: 'Please share a meaningful reflection (minimum 5 characters).' });
  }

  // Basic moderation: length check and sanitize
  const cleanMessage = String(message).slice(0, 300).trim();
  const cleanAuthor = String(author).slice(0, 40).trim();
  const cleanLocation = String(location || 'Global Citizen').slice(0, 50).trim();
  const validThemes = ['peace', 'truth', 'courage', 'humanity', 'simplicity'] as const;
  const selectedTheme = validThemes.includes(theme) ? theme : 'peace';

  const newReflection: Reflection = {
    id: `ref-${Date.now()}`,
    author: cleanAuthor,
    location: cleanLocation,
    theme: selectedTheme,
    message: cleanMessage,
    timestamp: new Date().toISOString(),
  };

  communityReflections.unshift(newReflection);
  if (communityReflections.length > 50) {
    communityReflections.pop();
  }

  res.status(201).json({ success: true, reflection: newReflection });
});

// Dev & Production serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
