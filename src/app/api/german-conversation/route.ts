
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MODEL = "gemini-3.8-flash";

type Mensaje = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  if (!ai) {
    return NextResponse.json(
      { error: "No se encontró GEMINI_API_KEY en .env.local" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No se recibieron mensajes válidos." },
        { status: 400 }
      );
    }

    const historial = (messages as Mensaje[])
      .filter(
        (m) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-20);

    if (
      historial.length === 0 ||
      historial[historial.length - 1].role !== "user"
    ) {
      return NextResponse.json(
        { error: "Escribe una pregunta en alemán." },
        { status: 400 }
      );
    }

    const contents = historial.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.trim() }],
    }));

    const resultado = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: `
Eres un profesor de alemán para estudiantes de nivel A1.
Ayuda al estudiante a mantener una conversación en alemán.
Responde primero en alemán sencillo y después explica brevemente
en español cuando sea útil.
Corrige los errores con amabilidad y muestra una frase correcta.
Haz una pregunta sencilla en alemán para continuar la conversación.
Usa vocabulario básico y explicaciones claras.
`,
        maxOutputTokens: 512,
      },
    });

    const reply = resultado.text?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini no generó una respuesta. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en /api/german-conversation:", error);

    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      error.status === 503
        ? 503
        : 500;

    return NextResponse.json(
      {
        error:
          statusCode === 503
            ? "Gemini está ocupado. Inténtalo de nuevo."
            : "No se pudo generar la respuesta. Revisa la terminal de Next.js.",
      },
      { status: statusCode }
    );
  }
}
