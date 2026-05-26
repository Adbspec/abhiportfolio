import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import portfolioData from '../../../../src/data/portfolio.json';

export const runtime = 'edge';

// In-memory rate limiting map
// Format: { ip: { count: number, resetTime: number } }
const rateLimitMap = new Map();

// Constants
const MAX_REQUESTS_PER_MINUTE = 5;
const RATE_LIMIT_WINDOW_MS = 60000;

export async function POST(request) {
  try {
    // 1. IP Tracking & Rate Limiting
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'anonymous_ip';
    const now = Date.now();
    
    if (rateLimitMap.has(ip)) {
      const data = rateLimitMap.get(ip);
      if (now > data.resetTime) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      } else {
        if (data.count >= MAX_REQUESTS_PER_MINUTE) {
          return NextResponse.json(
            { error: "Rate limit exceeded. Please wait a minute before sending more messages." },
            { status: 429 }
          );
        }
        // Increment count
        rateLimitMap.set(ip, { count: data.count + 1, resetTime: data.resetTime });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse Request
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    if (query.length > 500) {
      return NextResponse.json({ error: "Query is too long. Please keep it under 500 characters." }, { status: 400 });
    }

    // 3. Setup Gemini API securely on backend
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: Gemini API Key missing in server environment variables.");
      return NextResponse.json(
        { error: "Configuration Error: API Key missing on server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are the digital professional projection of Abhishek (Abhi). You are NOT a third-party assistant; you must speak in the first person ("I", "my") as if you are Abhishek himself answering recruiter interview questions.
Your SOLE purpose is to answer questions about your professional experience, skills, projects, certifications, and career.
      
CRITICAL RULES:
1. FIRST-PERSON ONLY: Always speak as Abhishek. Never say "Abhi is" or "Based on his profile". Say "I am" and "My experience".
2. TONE & STYLE: Professional, grounded, mature, precise, honest, and strategic. Sound like a real person in a corporate interview.
3. NO CLICHÉS OR BUZZWORDS: Avoid generic praise, over-selling, or phrases like "passionate engineer" or "results-driven". Ground all responses in real technical experience and facts.
4. STRICT BOUNDARIES: If asked about general knowledge, programming help, politics, personal advice, or ANY topic not related to your career/portfolio, you MUST reject the query professionally. Use this exact phrase: "I’m here specifically to discuss my professional experience, technical skills, and projects."
5. KNOWLEDGE BASE: You MUST ONLY use the provided JSON data below to answer questions. Never hallucinate, invent, or fabricate information.
6. ANSWER STRUCTURE: Start directly. Focus on practical strengths. Reference real technical stack and projects. Keep answers medium-length unless deeper detail is requested.

JSON PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}`
    });

    // We use generateContent instead of startChat to keep it simple and stateless for the server
    // For a real chat, we could pass the message history in the POST request.
    // For now, this stateless approach prevents backend memory leaks.
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: query }] }],
      generationConfig: {
        temperature: 0.2, // Low temp for factual responses
        maxOutputTokens: 500,
      }
    });

    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });

  } catch (error) {
    console.error("Backend AI Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error occurred while processing your request." },
      { status: 500 }
    );
  }
}
