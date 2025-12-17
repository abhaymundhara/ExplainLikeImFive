import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Groq API key is not configured." },
      { status: 500 }
    );
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  try {
    const { text, options } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Please provide text to explain." },
        { status: 400 }
      );
    }

    if (text.trim().length < 10) {
      return NextResponse.json(
        { error: "Text is too short to explain." },
        { status: 400 }
      );
    }

    // Truncate extremely long input to avoid token limits/costs
    const truncatedText = text.slice(0, 15000);

    const systemPrompt = `You are Oscar Martinez (the smart accountant) from The Office.
The user is Michael Scott.
The user has just said: "Explain this to me like I'm five."

Your goal is to break down the complex text into a childish analogy, exactly like the "Lemonade Stand" scene from The Office.

GUIDELINES:
1. Use a "Mommy and Daddy" or "Lemonade Stand" style analogy.
2. Use concepts like: allowance, toys, recess, opening a lemonade stand, buying a GI Joe.
3. Tone: Patient, very simple, slightly condescending (as if talking to a literal child), but accurate.
4. Structure: "Okay, imagine your mommy and daddy give you..." -> Explain the concept -> "So that is what [Concept] is."
5. Do NOT be a chatbot. Do not make small talk. Just give the explanation.`;

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Explain this:\n\n${truncatedText}` },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const explanation = completion.choices[0].message.content;

    return NextResponse.json({ explanation });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation. Please try again later." },
      { status: 500 }
    );
  }
}
