"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type VoiceResult = {
  isFinal: boolean;
  0: { transcript: string };
};

type VoiceEvent = {
  resultIndex: number;
  results: ArrayLike<VoiceResult>;
};

type VoiceRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: VoiceEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type VoiceWindow = Window & {
  SpeechRecognition?: new () => VoiceRecognition;
  webkitSpeechRecognition?: new () => VoiceRecognition;
};

const saludo: Message = {
  role: "assistant",
  content:
    "Hallo! Ich bin dein Deutschlehrer.\n\n" +
    "¡Hola! Soy tu profesor de alemán.\n\n" +
    "Wie heißt du? (¿Cómo te llamas?)",
};

export default function ConversacionAlemanPage() {
  const [messages, setMessages] = useState<Message[]>([saludo]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [error, setError] = useState("");
  const [ultimaRespuesta, setUltimaRespuesta] = useState("");

  const reconocimientoRef = useRef<VoiceRecognition | null>(null);

  function detenerAudio() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function leerRespuesta(respuesta: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("Tu navegador no admite la lectura de voz.");
      return;
    }

    // Solo leer el primer párrafo, que el profesor escribe en alemán.
    const fraseAlemana = respuesta.trim().split(/\n\s*\n/)[0];

    if (!fraseAlemana) return;

    window.speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(fraseAlemana);
    voz.lang = "de-DE";
    voz.rate = 0.85;
    voz.onerror = () => {
      setError("No se pudo reproducir el audio. Inténtalo otra vez.");
    };

    const seleccionarVoz = () => {
      const voces = window.speechSynthesis.getVoices();
      const vozAlemana = voces.find((item) =>
        item.lang.toLowerCase().startsWith("de")
      );

      if (vozAlemana) {
        voz.voice = vozAlemana;
      }

      window.speechSynthesis.speak(voz);
    };

    seleccionarVoz();
  }

  function iniciarMicrofono() {
    setError("");

    const navegador = window as VoiceWindow;
    const SpeechRecognition =
      navegador.SpeechRecognition ||
      navegador.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Tu navegador no admite reconocimiento de voz. Prueba con Chrome o Edge."
      );
      return;
    }

    try {
      detenerAudio();
      reconocimientoRef.current?.stop();

      const reconocimiento = new SpeechRecognition();

      reconocimiento.lang = "de-DE";
      reconocimiento.continuous = false;
      reconocimiento.interimResults = true;

      reconocimiento.onresult = (event) => {
        let transcripcion = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcripcion += event.results[i][0].transcript;
          }
        }

        if (transcripcion.trim()) {
          setTexto((anterior) =>
            `${anterior} ${transcripcion.trim()}`.trim()
          );
        }
      };

      reconocimiento.onerror = (event) => {
        const mensajes: Record<string, string> = {
          "not-allowed":
            "Permite el acceso al micrófono en la configuración del navegador.",
          "no-speech":
            "No se detectó voz. Inténtalo de nuevo hablando un poco más alto.",
          "audio-capture":
            "No se encontró un micrófono disponible.",
          network:
            "Falló el servicio de reconocimiento de voz. Comprueba tu conexión.",
        };

        setError(
          mensajes[event.error] ||
            `Error de reconocimiento de voz: ${event.error}.`
        );
      };

      reconocimiento.onend = () => {
        setEscuchando(false);
        reconocimientoRef.current = null;
      };

      reconocimientoRef.current = reconocimiento;
      setEscuchando(true);
      reconocimiento.start();
    } catch {
      setEscuchando(false);
      reconocimientoRef.current = null;
      setError(
        "No se pudo iniciar el micrófono. Comprueba los permisos del navegador."
      );
    }
  }

  function detenerMicrofono() {
    reconocimientoRef.current?.stop();
    setEscuchando(false);
  }

  async function enviarMensaje(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const textoLimpio = texto.trim();

    if (!textoLimpio || cargando) return;

    detenerMicrofono();
    detenerAudio();

    const nuevosMensajes: Message[] = [
      ...messages,
      { role: "user", content: textoLimpio },
    ];

    setMessages(nuevosMensajes);
    setTexto("");
    setCargando(true);
    setError("");

    try {
      const response = await fetch("/api/german-conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          messages: nuevosMensajes,
          nivel: "A1",
        }),
      });

      // Leer como texto primero permite detectar errores HTML de Next.js.
      const contenido = await response.text();
      let data: { reply?: string; error?: string };

      try {
        data = JSON.parse(contenido);
      } catch {
        console.error(
          "La API devolvió una respuesta que no es JSON:",
          contenido.slice(0, 500)
        );

        throw new Error(
          response.status === 404
            ? "No se encontró la API. Comprueba que el archivo esté en app/api/german-conversation/route.ts y reinicia Next.js."
            : `El servidor devolvió una respuesta no válida (HTTP ${response.status}). Revisa la terminal de Next.js.`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `La solicitud falló con el código HTTP ${response.status}.`
        );
      }

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("Gemini no devolvió una respuesta válida.");
      }

      setMessages((anteriores) => [
        ...anteriores,
        { role: "assistant", content: data.reply! },
      ]);

      setUltimaRespuesta(data.reply);
      leerRespuesta(data.reply);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado al conectar con Gemini."
      );
    } finally {
      setCargando(false);
    }
  }

  function nuevaConversacion() {
    detenerMicrofono();
    detenerAudio();

    setMessages([saludo]);
    setTexto("");
    setError("");
    setUltimaRespuesta("");
  }

  useEffect(() => {
    return () => {
      reconocimientoRef.current?.stop();

      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-2xl font-bold">
        🇩🇪 Profesor de alemán con Gemini
      </h1>

      <p className="my-2 text-gray-600">
        Nivel A1 · Escribe o habla en alemán y practica la conversación.
      </p>

      <section
        className="my-5 space-y-4 rounded-xl border bg-white p-4"
        aria-label="Conversación con el profesor"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <div
            key={`${index}-${message.role}`}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] whitespace-pre-wrap rounded-xl p-3 ${
                message.role === "user"
                  ? "bg-blue-100 text-gray-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="mb-1 text-sm font-semibold">
                {message.role === "user" ? "Tú" : "Profesor"}
              </p>
              {message.content}
            </div>
          </div>
        ))}

        {cargando && (
          <p role="status">Gemini está preparando su respuesta...</p>
        )}

        {error && (
          <div
            role="alert"
            className="whitespace-pre-wrap rounded-lg bg-red-50 p-3 text-red-700"
          >
            {error}
          </div>
        )}
      </section>

      <form onSubmit={enviarMensaje} className="space-y-3">
        <label htmlFor="mensaje" className="block font-medium">
          Escribe o dicta tu pregunta en alemán
        </label>

        <textarea
          id="mensaje"
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          placeholder="Hallo! Ich heiße Horacio. Wie geht es dir?"
          rows={3}
          maxLength={3000}
          disabled={cargando}
          className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={iniciarMicrofono}
            disabled={escuchando || cargando}
            className="rounded-xl bg-green-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            🎤 {escuchando ? "Escuchando..." : "Hablar en alemán"}
          </button>

          {escuchando && (
            <button
              type="button"
              onClick={detenerMicrofono}
              className="rounded-xl border px-4 py-3"
            >
              Detener micrófono
            </button>
          )}

          <button
            type="submit"
            disabled={cargando || !texto.trim()}
            className="rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            {cargando ? "Consultando Gemini..." : "Enviar y recibir respuesta"}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => leerRespuesta(ultimaRespuesta)}
          disabled={!ultimaRespuesta || cargando}
          className="rounded-xl border px-4 py-3 disabled:opacity-50"
        >
          🔊 Escuchar respuesta otra vez
        </button>

        <button
          type="button"
          onClick={detenerAudio}
          className="rounded-xl border px-4 py-3"
        >
          ⏹ Detener audio
        </button>

        <button
          type="button"
          onClick={nuevaConversacion}
          disabled={cargando}
          className="rounded-xl border px-4 py-3 disabled:opacity-50"
        >
          Nueva conversación
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Consejo: habla despacio. La transcripción aparecerá en el cuadro de
        texto; después pulsa Enviar y recibir respuesta para conversar con
        Gemini.
      </p>
    </main>
  );
}