
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AnimalesPage() {
  const animales = [
    {
      palabra: "der Hund",
      traduccion: "El perro",
      imagen: "/animales/hund.jpg",
    },
    {
      palabra: "die Katze",
      traduccion: "El gato",
      imagen: "/animales/katze.jpg",
    },
    {
      palabra: "der Vogel",
      traduccion: "El pájaro",
      imagen: "/animales/vogel.jpg",
    },
    {
      palabra: "die Schildkröte",
      traduccion: "La tortuga",
      imagen: "/animales/die Schildkröte.JPEG",
    },
    {
      palabra: "der Löwe",
      traduccion: "El león",
      imagen: "/animales/der Löwe.JPEG",
    },
  ];

  const [indice, setIndice] = useState(0);
  const [voces, setVoces] = useState<SpeechSynthesisVoice[]>([]);

  // Cargar las voces disponibles en el navegador
  useEffect(() => {
    const cargarVoces = () => {
      const vocesDisponibles = window.speechSynthesis.getVoices();
      setVoces(vocesDisponibles);
    };

    cargarVoces();

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      cargarVoces
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        cargarVoces
      );

      window.speechSynthesis.cancel();
    };
  }, []);

  // Reproducir pronunciación en alemán
  const reproducirAudio = () => {
    window.speechSynthesis.cancel();

    const vozAlemana =
      voces.find((voz) => voz.lang.toLowerCase() === "de-de") ||
      voces.find((voz) => voz.lang.toLowerCase().startsWith("de"));

    const audio = new SpeechSynthesisUtterance(
      animales[indice].palabra
    );

    audio.lang = "de-DE";

    if (vozAlemana) {
      audio.voice = vozAlemana;
    }

    // Velocidad y tono de pronunciación
    audio.rate = 0.85;
    audio.pitch = 1;
    audio.volume = 1;

    window.speechSynthesis.speak(audio);
  };

  // Siguiente animal
  const siguiente = () => {
    setIndice((prev) => (prev + 1) % animales.length);
  };

  // Animal anterior
  const anterior = () => {
    setIndice((prev) =>
      prev === 0 ? animales.length - 1 : prev - 1
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">

        <Link
          href="/"
          className="mb-4 inline-block font-semibold text-green-700"
        >
          ← Volver al inicio
        </Link>

        <h1 className="mb-6 text-center text-3xl font-bold">
          Flashcards 🇩🇪 Animales
        </h1>

        <div className="rounded-3xl border-2 border-green-200 bg-white p-6 shadow-lg">

          <div className="flex justify-center">
            <Image
              src={animales[indice].imagen}
              alt={animales[indice].palabra}
              width={250}
              height={250}
              priority
              className="object-contain"
            />
          </div>

          <h2 className="mt-6 text-center text-4xl font-bold text-slate-800">
            {animales[indice].palabra}
          </h2>

          <p className="mt-3 text-center text-2xl text-green-600">
            {animales[indice].traduccion}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={reproducirAudio}
              className="rounded-xl bg-green-600 px-6 py-3 text-lg font-semibold text-white hover:bg-green-700"
            >
              🔊 Escuchar en alemán
            </button>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={anterior}
              className="rounded-xl bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              ⬅ Anterior
            </button>

            <button
              onClick={siguiente}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Siguiente ➡
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-400">
            🇩🇪 Aprende alemán escuchando la pronunciación correcta
          </p>

        </div>
      </div>
    </main>
  );
}
