"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AnimalesPage() {
  const animales = [
    
    {
      palabra: "das Brot",
      traduccion: "El pan",
      imagen: "/comida/das Brot.jpg",
    },
    {
      palabra: "das Fleisch",
      traduccion: "La carne",
      imagen: "/comida/das Fleisch.jpg",
    },
    {
      palabra: "das Frühstück",
      traduccion: "El desayuno",
      imagen: "/comida/das Frühstück.jpg",
    },
    {
      palabra: "das mittagessen",
      traduccion: "la cena",
      imagen: "/comida/das mittagessen.jpg",
    },
    {
      palabra: "der Fisch",
      traduccion: "el pescado",
      imagen: "/comida/der Fisch.jpg",
    },
    {
      palabra: "der Käse",
      traduccion: "el queso",
      imagen: "/comida/der Käse.jpg",
    },
  ];

  const [indice, setIndice] = useState(0);

  const reproducirAudio = () => {
    const voz = new SpeechSynthesisUtterance(animales[indice].palabra);
    voz.lang = "de-DE";
    speechSynthesis.speak(voz);
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

        <h1 className="mb-2 text-center text-4xl font-extrabold">
  Was ist das?<span className="text-red-500">das?</span>
</h1>

        <div className="mx-auto rounded-3xl bg-white p-6 shadow-2xl">
          <div className="flex justify-center">
  <div
    className="
      rounded-3xl
      p-3
      border-4
      border-cyan-400
      shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee]
      bg-white
    "
  >
    <Image
      src={animales[indice].imagen}
      alt={animales[indice].palabra}
      width={250}
      height={250}
      priority
      className="object-contain rounded-2xl"
    />
  </div>
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
              🔊 Escuchar
            </button>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={anterior}
              className="rounded-xl bg-gray-500 px-4 py-2 text-white"
            >
              ⬅ Anterior
            </button>

            <button
              onClick={siguiente}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white"
            >
              Siguiente ➡
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}