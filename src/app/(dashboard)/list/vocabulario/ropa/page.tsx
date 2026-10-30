"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AnimalesPage() {
  const animales = [
    {
      palabra: "die Brille",
      traduccion: "las gafas",
      imagen: "/ropa/die Brille.jpg",
    },
    {
      palabra: "die Handschuhe",
      traduccion: "Los guantes",
      imagen: "/ropa/die Handschuhe.jpg",
    },
    {
      palabra: "die Krawatte",
      traduccion: "la corbata",
      imagen: "/ropa/die Krawatte.jpg",
    },
    {
      palabra: " die Mütze",
      traduccion: "La gorra",
      imagen: "/ropa/die Mütze.jpg",
    },
    {
      palabra: "die Schuhe",
      traduccion: "Los zapatos",
      imagen: "/ropa/die Schuhe.jpg",
    },
    {
      palabra: "die Socken",
      traduccion: "Los calzetines",
      imagen: "/ropa/die Socken.jpg",
    },
    {
      palabra: "die T-shirt",
      traduccion: "La camiseta",
      imagen: "/ropa/die T-shirt.jpg",
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