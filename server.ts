import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize GoogleGenAI server-side with User-Agent header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Sello de IA (M5): Sustituto inteligente de ingredientes con advertencia de impacto
app.post('/api/ai/substitute', async (req, res) => {
  try {
    const { recipeTitle, missingIngredient, currentAmount, category } = req.body;

    if (!missingIngredient) {
      return res.status(400).json({ error: 'El ingrediente faltante es requerido.' });
    }

    if (ai) {
      try {
        const prompt = `En la receta "${recipeTitle || 'Receta de la Abuela'}" (Categoría: ${category || 'Cocina casera'}), falta el ingrediente: "${missingIngredient}" (Cantidad en la receta: ${currentAmount || 'según receta'}).
Como la Abuela sabia y cariñosa de la familia:
1. Proponle el sustituto más común y accesible que seguramente tenga en la despensa o nevera de casa.
2. Indica la proporción y cómo aplicarlo o incorporarlo en la preparación.
3. ADVIERTE CLARAMENTE cómo este cambio alterará el resultado final (sabor, textura, consistencia, color o tiempo de cocción).
4. Dale un consejo cariñoso tradicional de la abuela.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction:
              'Eres la Abuela de la casa, una cocinera tradicional sabia y bondadosa. Tu misión es proponer un sustituto casero viable para un ingrediente que falta en la cocina, pero siendo completamente honesta y advirtiendo con precisión cómo el cambio alterará el sabor, la textura o el resultado final del plato. Devuelve siempre un objeto JSON estructurado.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                originalIngredient: { type: Type.STRING },
                substituteIngredient: { type: Type.STRING },
                ratioRecommendation: { type: Type.STRING },
                howToApply: { type: Type.STRING },
                warningImpactOnResult: {
                  type: Type.STRING,
                  description: 'Advertencia obligatoria de cómo el sustituto altera el resultado final del plato',
                },
                abuelaAdvice: { type: Type.STRING },
              },
              required: [
                'originalIngredient',
                'substituteIngredient',
                'ratioRecommendation',
                'howToApply',
                'warningImpactOnResult',
                'abuelaAdvice',
              ],
            },
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        if (parsed.substituteIngredient) {
          return res.json({ success: true, data: parsed, source: 'gemini-3.8-flash' });
        }
      } catch (aiError) {
        console.warn('AI call temporarily unavailable, using Abuela Knowledge Base:', aiError);
      }
    }

    // Traditional Fallback if API key is not yet configured or offline
    const fallbackSubstitutions: Record<string, any> = {
      cilantro: {
        originalIngredient: missingIngredient,
        substituteIngredient: 'Perejil liso picado fresco con una pizca de orégano o comino',
        ratioRecommendation: 'Usa la misma cantidad (proporción 1:1)',
        howToApply: 'Añádelo al final del hervor justo antes de servir.',
        warningImpactOnResult: 'El perejil aporta frescura y color verde vibrante, pero carece del aroma cítrico y terroso característico del cilantro. El caldo quedará más suave y herbal, pero no tan punzante.',
        abuelaAdvice: 'Machaca el perejil con una punta de ajo para compensar el carácter del cilantro.',
      },
      yuca: {
        originalIngredient: missingIngredient,
        substituteIngredient: 'Papa pastusa o papa blanca en trozos grandes',
        ratioRecommendation: '1 taza de papa por cada taza de yuca requerida',
        howToApply: 'Agrégala 15 minutos más tarde que la yuca, ya que la papa se cocina más rápido.',
        warningImpactOnResult: 'La papa espesará el caldo más rápido, pero el almidón es más harinoso y menos gelatinoso que el de la yuca. El caldo quedará menos brillante y más denso.',
        abuelaAdvice: 'No revuelvas mucho la olla con la cuchara para que las papas no se desbaraten.',
      },
      manteca: {
        originalIngredient: missingIngredient,
        substituteIngredient: 'Mantequilla derretida con unas gotas de aceite vegetal',
        ratioRecommendation: 'Misma cantidad en peso o volumen',
        howToApply: 'Incorpórala tibia a la masa o al sofrito.',
        warningImpactOnResult: 'Dará un sabor lácteo más marcado. En masas de empanada, quedará ligeramente menos quebradiza y más blanda al enfriarse.',
        abuelaAdvice: 'Si buscas crocancia, añade una cucharadita de maicena disuelta en la masa.',
      },
      leche: {
        originalIngredient: missingIngredient,
        substituteIngredient: 'Leche evaporada diluida en 50% agua o bebida vegetal neutra',
        ratioRecommendation: '1 a 1',
        howToApply: 'Calienta antes de verterla para no cortar el hervor.',
        warningImpactOnResult: 'Puede alterar ligeramente el dulzor o la ligereza de la crema.',
        abuelaAdvice: 'Cuida el fondo de la olla con cuchara de palo.',
      },
    };

    const lower = (missingIngredient || '').toLowerCase();
    const matchedKey = Object.keys(fallbackSubstitutions).find((k) => lower.includes(k));
    const fallbackData = matchedKey
      ? fallbackSubstitutions[matchedKey]
      : {
          originalIngredient: missingIngredient,
          substituteIngredient: 'Ingrediente base complementario de despensa',
          ratioRecommendation: 'Usa una cantidad moderada (70% de la porción original)',
          howToApply: 'Incorpora a fuego suave probando el punto de sal o azúcar progresivamente.',
          warningImpactOnResult: 'Cualquier reemplazo variará la densidad y las notas de fondo tradicionales del plato familiar. Se recomienda vigilar el tiempo de cocción.',
          abuelaAdvice: 'Prueba la salsa tres veces con cuchara limpia antes de apagar el fogón.',
        };

    return res.json({ success: true, data: fallbackData, source: 'abuela-knowledge-base' });
  } catch (error: any) {
    console.error('Error in /api/ai/substitute:', error);
    res.status(500).json({
      error: 'No se pudo obtener la sugerencia de la abuela.',
      details: error.message,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
