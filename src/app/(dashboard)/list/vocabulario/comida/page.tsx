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