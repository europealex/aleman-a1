"use client";

import { useState } from "react";

export default function SaludosPage() {
  const palabras = [
    {
      aleman: "Hallo",
      espanol: "Hola",
    },
    {
      aleman: "Guten Morgen",
      espanol: "Buenos días",
    },
    {
      aleman: "Danke",
      espanol: "Gracias",
    },
  ];

  const [indice, setIndice] = useState(0);

  const hablar = () => {
    const voz = new SpeechSynthesisUtterance(
      palabras[indice].aleman
    );

    voz.lang = "de-DE";

    speechSynthesis.speak(voz);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">

        <h1 className="text-3xl font-bold text-center">
          {palabras[indice].aleman}
        </h1>

        <p className="text-center text-gray-500 mt-3">
          {palabras[indice].espanol}
        </p>

        <button
          onClick={hablar}
          className="w-full mt-4 bg-blue-500 text-white rounded-lg p-3"
        >
          🔊 Escuchar
        </button>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() =>
              setIndice(Math.max(0, indice - 1))
            }
            className="flex-1 bg-gray-200 rounded-lg p-3"
          >
            ← Anterior
          </button>

          <button
            onClick={() =>
              setIndice(
                Math.min(
                  palabras.length - 1,
                  indice + 1
                )
              )
            }
            className="flex-1 bg-green-500 text-white rounded-lg p-3"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}