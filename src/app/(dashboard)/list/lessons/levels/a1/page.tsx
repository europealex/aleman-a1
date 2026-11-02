"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Nivel = "A1" | "A2" | "B1" | "B2";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type VoiceRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: {
    resultIndex: number;
    results: ArrayLike<{
      isFinal: boolean;
      0: { transcript: string };
    }>;
  }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type VoiceWindow = Window & {
  SpeechRecognition?: new () => VoiceRecognition;
  webkitSpeechRecognition?: new () => VoiceRecognition;
};

const saludos: Record<Nivel, string> = {
  A1: "Hallo! Ich bin dein Deutschlehrer. Wie heißt du?",
  A2: "Hallo! Schön, dich zu sehen. Wie war dein Tag?",
  B1: "Guten Tag! Was hast du heute gemacht?",
  B2: "Herzlich willkommen! Worüber möchtest du diskutieren?",
};

const nombresNivel: Record<Nivel, string> = {
  A1: "Principiante absoluto",
  A2: "Principiante",
  B1: "Intermedio",
  B2: "Intermedio alto",
};

export default function ConversacionAlemanPage() {
  const [nivel, setNivel] = useState<Nivel>("A1");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: saludos.A1 },
  ]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [error, setError] = useState("");
  const [ultimaRespuesta, setUltimaRespuesta] = useState("");

  const reconocimientoRef = useRef<VoiceRecognition | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, cargando]);

  function detenerAudio() {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
  }

  function leerRespuesta(respuesta: string) {
    if (!("speechSynthesis" in window)) {
      setError("Tu navegador no admite la lectura de voz.");
      return;
    }

    const frase = respuesta.trim().split(/\n\s*\n/)[0];
    if (!frase) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(frase);
    utterance.lang = "de-DE";
    utterance.rate = nivel === "A1" ? 0.8 : 0.9;

    const voces = window.speechSynthesis.getVoices();
    const voz = voces.find((v) =>
      v.lang.toLowerCase().startsWith("de")
    );

    if (voz) utterance.voice = voz;
    window.speechSynthesis.speak(utterance);
  }

  function detenerMicrofono() {
    reconocimientoRef.current?.stop();
    reconocimientoRef.current = null;
    setEscuchando(false);
  }

  function iniciarMicrofono() {
    setError("");

    const navegador = window as VoiceWindow;
    const SpeechRecognition =
      navegador.SpeechRecognition ||
      navegador.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Tu navegador no admite el reconocimiento de voz. Prueba Google Chrome en un ordenador o Android."
      );
      return;
    }

    detenerAudio();

    try {
      reconocimientoRef.current?.stop();

      const reconocimiento = new SpeechRecognition();
      reconocimiento.lang = "de-DE";
      reconocimiento.continuous = false;
      reconocimiento.interimResults = true;

      reconocimiento.onresult = (event) => {
        let finalTexto = "";
        let textoParcial = "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const resultado = event.results[i];

          if (resultado.isFinal) {
            finalTexto += resultado[0].transcript;
          } else {
            textoParcial += resultado[0].transcript;
          }
        }

        if (finalTexto.trim()) {
          setTexto((anterior) =>
            `${anterior} ${finalTexto}`.trim()
          );
        } else if (textoParcial) {
          setTexto((anterior) =>
            anterior.trim()
              ? `${anterior.split(" ⌁ ")[0]} ⌁ ${textoParcial}`
              : textoParcial
          );
        }
      };

      reconocimiento.onerror = (event) => {
        if (event.error === "not-allowed") {
          setError(
            "No hay permiso para usar el micrófono. Actívalo en los permisos del navegador."
          );
        } else if (
          event.error !== "no-speech" &&
          event.error !== "aborted"
        ) {
          setError(`Error del micrófono: ${event.error}`);
        }
      };

      reconocimiento.onend = () => {
        setEscuchando(false);
        reconocimientoRef.current = null;
      };

      reconocimientoRef.current = reconocimiento;
      reconocimiento.start();
      setEscuchando(true);
    } catch {
      setEscuchando(false);
      setError(
        "No se pudo iniciar el micrófono. Comprueba los permisos del navegador."
      );
    }
  }

  async function enviarMensaje(
    event?: FormEvent<HTMLFormElement>
  ) {
    event?.preventDefault();

    const limpio = texto.trim().replace(/\s*⌁\s*/g, " ");
    if (!limpio || cargando) return;

    detenerMicrofono();
    detenerAudio();

    const historial: Message[] = [
      ...messages,
      { role: "user", content: limpio },
    ];

    setMessages(historial);
    setTexto("");
    setCargando(true);
    setError("");

    try {
      const response = await fetch("/api/german-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nivel, messages: historial }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "No se pudo obtener una respuesta."
        );
      }

      if (
        typeof data.reply !== "string" ||
        !data.reply.trim()
      ) {
        throw new Error("Gemini devolvió una respuesta vacía.");
      }

      setMessages((anteriores) => [
        ...anteriores,
        { role: "assistant", content: data.reply },
      ]);

      setUltimaRespuesta(data.reply);
      leerRespuesta(data.reply);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado."
      );
    } finally {
      setCargando(false);
    }
  }

  function cambiarNivel(nuevo: Nivel) {
    if (cargando) return;

    detenerMicrofono();
    detenerAudio();
    setNivel(nuevo);
    setMessages([
      { role: "assistant", content: saludos[nuevo] },
    ]);
    setTexto("");
    setError("");
    setUltimaRespuesta("");
  }

  function nuevaConversacion() {
    if (cargando) return;

    detenerMicrofono();
    detenerAudio();
    setMessages([
      { role: "assistant", content: saludos[nivel] },
    ]);
    setTexto("");
    setError("");
    setUltimaRespuesta("");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#315b9b] via-[#244d87] to-[#173660] text-white">
        <div className="mx-auto flex min-h-[470px] max-w-5xl flex-col px-5 pb-5 pt-6 sm:min-h-[500px]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={nuevaConversacion}
              disabled={cargando}
              aria-label="Nueva conversación"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-3xl hover:bg-white/25 disabled:opacity-50"
            >
              ×
            </button>

            <span className="rounded-full bg-white/15 px-5 py-3 text-sm">
              {escuchando
                ? "Escuchando..."
                : "Lección de alemán"}
            </span>

            <button
              type="button"
              onClick={() => leerRespuesta(ultimaRespuesta)}
              disabled={!ultimaRespuesta}
              className="rounded-full bg-white/15 px-4 py-3 font-bold hover:bg-white/25 disabled:opacity-40"
            >
              1×
            </button>
          </div>

          {/* Espacio reservado para añadir una imagen más adelante */}
          <div className="relative flex flex-1 flex-col items-center justify-center pt-4">
            <div
              aria-hidden="true"
              className="h-[255px] w-full max-w-[320px] sm:h-[300px]"
            />

            <h1 className="mt-1 text-center text-2xl font-bold sm:text-3xl">
              Deutsch lernen
            </h1>

            <p className="mt-1 text-center text-sm text-blue-100">
              Tu profesor personal de alemán
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {(["A1", "A2", "B1", "B2"] as Nivel[]).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => cambiarNivel(item)}
                    disabled={cargando}
                    aria-pressed={nivel === item}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      nivel === item
                        ? "bg-white text-blue-900 shadow"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <span className="text-xs text-blue-100">
              {nombresNivel[nivel]}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto flex min-h-[calc(100vh-470px)] max-w-3xl flex-col px-4 pb-5 pt-6 sm:px-6">
        <div
          ref={chatRef}
          aria-label="Conversación con el profesor"
          aria-live="polite"
          className="flex-1 space-y-5 overflow-y-auto pb-4"
        >
          {messages.map((message, index) => (
            <div
              key={`${index}-${message.role}`}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <span className="mr-2 mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg">
                  🤖
                </span>
              )}

              <div
                className={`max-w-[86%] whitespace-pre-wrap rounded-[24px] px-5 py-4 text-[17px] leading-7 ${
                  message.role === "user"
                    ? "rounded-br-md bg-[#d9eaff] text-slate-900"
                    : "rounded-bl-md bg-[#f0f1f2] text-slate-800"
                }`}
              >
                {message.content}

                {message.role === "assistant" && (
                  <button
                    type="button"
                    onClick={() => leerRespuesta(message.content)}
                    aria-label="Escuchar mensaje"
                    className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm hover:bg-blue-50"
                  >
                    ▶
                  </button>
                )}
              </div>
            </div>
          ))}

          {cargando && (
            <div
              role="status"
              className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600"
            >
              🤖 Dein Lehrer denkt nach... El profesor está pensando...
            </div>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={enviarMensaje}
          className="mt-3"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <textarea
              id="mensaje-ayuda"
              value={texto}
              onChange={(event) => setTexto(event.target.value)}
              placeholder="Escribe o habla en alemán..."
              rows={1}
              maxLength={3000}
              disabled={cargando}
              aria-label="Tu mensaje"
              className="max-h-32 min-h-12 flex-1 resize-y bg-transparent px-3 py-3 outline-none placeholder:text-slate-400 disabled:opacity-50"
            />

            <button
              type="button"
              onClick={
                escuchando
                  ? detenerMicrofono
                  : iniciarMicrofono
              }
              disabled={cargando}
              aria-label={
                escuchando
                  ? "Detener micrófono"
                  : "Activar micrófono"
              }
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white transition disabled:opacity-40 ${
                escuchando
                  ? "animate-pulse bg-red-600"
                  : "bg-[#399bf4] hover:bg-blue-600"
              }`}
            >
              {escuchando ? "■" : "🎙"}
            </button>

            <button
              type="submit"
              disabled={cargando || !texto.trim()}
              aria-label="Enviar mensaje"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xl text-white hover:bg-slate-700 disabled:opacity-30"
            >
              ↑
            </button>
          </div>
        </form>

        <div className="grid grid-cols-3 gap-4 pb-2 pt-5">
          <button
            type="button"
            onClick={() =>
              document.getElementById("mensaje-ayuda")?.focus()
            }
            className="flex flex-col items-center gap-2 text-[#399bf4]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              ⌨
            </span>
            <span className="text-sm">Escribir</span>
          </button>

          <button
            type="button"
            onClick={
              escuchando
                ? detenerMicrofono
                : iniciarMicrofono
            }
            disabled={cargando}
className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-4xl text-white shadow-lg transition hover:scale-105 disabled:opacity-50 ${
  escuchando ? "bg-red-500" : "bg-blue-500"
}`}
aria-label={
  escuchando
    ? "Detener micrófono"
    : "Hablar con el profesor"
}
          >
            {escuchando ? "■" : "🎙"}
          </button>

          <button
            type="button"
            onClick={() =>
              setError(
                "Di una frase corta en alemán, por ejemplo: Hallo! Wie geht es dir?"
              )
            }
            className="flex flex-col items-center gap-2 text-[#399bf4]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              💡
            </span>
            <span className="text-sm">Ayuda</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 border-t border-slate-100 pt-4 text-sm">
          <button
            type="button"
            onClick={() => leerRespuesta(ultimaRespuesta)}
            disabled={!ultimaRespuesta}
            className="rounded-full px-3 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
          >
            🔊 Repetir respuesta
          </button>

          <button
            type="button"
            onClick={detenerAudio}
            className="rounded-full px-3 py-2 text-slate-600 hover:bg-slate-100"
          >
            ⏹ Detener audio
          </button>

          <button
            type="button"
            onClick={nuevaConversacion}
            disabled={cargando}
            className="rounded-full px-3 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
          >
            ↻ Reiniciar
          </button>
        </div>
      </section>
    </main>
  );
}