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

  useEffect(() => {
    const cargarVoces = () => {
      setVoces(window.speechSynthesis.getVoices());
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

    audio.rate = 0.85;
    audio.pitch = 1;
    audio.volume = 1;

    window.speechSynthesis.speak(audio);
  };

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % animales.length);
  };

  const anterior = () => {
    setIndice((prev) =>
      prev === 0 ? animales.length - 1 : prev - 1
    );
  };

  return (
    <main className="w-full bg-gradient-to-br from-sky-100 via-white to-cyan-100 py-8 px-6">

      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl">

        <Link
          href="/"
          className="mb-4 inline-block font-semibold text-green-700"
        >
          ← Volver al inicio
        </Link>

        <h1 className="mb-2 text-center text-5xl font-extrabold">
          Was ist <span className="text-red-500 drop-shadow-lg">das?</span>
        </h1>

        <p className="mb-6 text-center text-gray-500 font-semibold">
          Was ist Das?
        </p>

        <div className="mx-auto rounded-3xl bg-white p-6 shadow-2xl">

          <div className="flex justify-center">

            <div
              className="
                relative
                rounded-[40px]
                p-[5px]
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                via-purple-500
                to-pink-500
                shadow-[0_0_20px_#22d3ee,0_0_40px_#3b82f6,0_0_80px_#8b5cf6]
              "
            >
              <div
                className="
                  rounded-[36px]
                  bg-white
                  p-4
                "
              >
                <Image
                  src={animales[indice].imagen}
                  alt={animales[indice].palabra}
                  width={400}
                  height={400}
                  priority
                  className="object-contain rounded-3xl"
                />
              </div>
            </div>

          </div>

          <h2 className="mt-8 text-center text-4xl font-bold text-slate-800">
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