/**
 * VerifDoc AI Chatbot Server
 * Architecture: Node.js (Express) + Google Gemini Pro
 * Security: API Key Backend-Only, Rate Limiting, CORS Strict
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();
const PORT = process.env.PORT || 3001;

// --- CONFIGURATION ---

// 1. Security: CORS (Restrict to VerifDoc domains in prod)
const allowedOrigins = [
    'http://localhost:5173', // Frontend Dev
    'http://localhost:3000', // Local Test
    'https://verifdoc.io'    // Production
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

// 2. Security: Rate Limiting (Prevent Abuse)
const rateLimiter = new RateLimiterMemory({
    points: 10, // 10 requests
    duration: 60, // per 60 seconds
});

// 3. AI Configuration (Gemini Pro)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- SYSTEM PROMPT (Engineered for Accuracy & Compliance) ---
const SYSTEM_PROMPT = `
Tu es VerifDoc AI, un analyste professionnel en vérification documentaire.
Tu analyses des documents et situations pour identifier des incohérences,
des indicateurs de risque et des limites d’analyse.
Tu n’émets jamais de décision finale ni d’avis juridique.
Tu expliques toujours ton raisonnement de manière structurée.
Tu peux répondre 'information insuffisante' si nécessaire.

FORMAT DE RÉPONSE ATTENDU :
- Type de document ou de situation : [Identifier le type]
- Points de cohérence : [Lister les éléments qui semblent corrects]
- Anomalies ou incohérences : [Lister les éléments suspects avec niveau de risque]
- Indicateurs de risque :
    * Technique : [Altérations numériques, métadonnées...]
    * Logique : [Incohérence de dates, montants...]
    * Contextuel : [Émetteur suspect, comportement...]
- Niveau de risque global : [Faible / Modéré / Élevé]
- Limites de l’analyse : [Ce qui ne peut pas être vérifié avec les infos fournies]
- Recommandations techniques : [Actions suggérées : demande d'original, appel émetteur...]

Reste factuel, professionnel et concis.
`;

// --- ROUTES ---

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'VerifDoc AI Chatbot' });
});

// Chat Endpoint
app.post('/chat', async (req, res) => {

    // A. Rate Limiting Check
    try {
        await rateLimiter.consume(req.ip);
    } catch (rejRes) {
        return res.status(429).json({ error: 'Too Many Requests' });
    }

    // B. Input Validation
    const { message, context } = req.body;
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message invalid or missing' });
    }

    try {
        // C. Model Initialization
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // D. Chat History / Context Injection
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `SYSTEM_INSTRUCTION: ${SYSTEM_PROMPT}` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Bien reçu. Je suis prêt à analyser vos documents et situations en tant que VerifDoc AI, en suivant strictement ce format structuré." }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 800,
                temperature: 0.2, // Low temperature for factual consistency
            },
        });

        // E. Generate Response
        const userMessage = context ? `[CONTEXTE: ${context}] ${message}` : message;
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        // F. Send Response
        res.json({
            response: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({
            error: 'Analysis Service Unavailable',
            details: 'Le moteur IA est temporairement indisponible.'
        });
    }
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`VerifDoc AI Chatbot Server running on port ${PORT}`);
});
