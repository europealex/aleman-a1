"use client";
 
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
 
export default function AnimalesPage() {
const animales = [
{
palabra: "die Brille",
traduccion: "Las gafas",
imagen: "/ropa/die Brille.jpg",
},
{
palabra: "die Handschuhe",
traduccion: "Los guantes",
imagen: "/ropa/die Handschuhe.jpg",
},
{
palabra: "die Krawatte",
traduccion: "La corbata",
imagen: "/ropa/die Krawatte.jpg",
},
{
palabra: "die Mütze",
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
traduccion: "Los calcetines",
imagen: "/ropa/die Socken.jpg",
},
{
palabra: "das T-Shirt",
traduccion: "La camiseta",
imagen: "/ropa/die T-shirt.jpg",
},
];
 
const [indice, setIndice] = useState(0);
 
const reproducirAudio = () => {
const voz = new SpeechSynthesisUtterance(
animales[indice].palabra
);
 
voz.lang = "de-DE";
 
speechSynthesis.cancel();
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

<div className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
 
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
Aprende alemán con imágenes
</p>
 
<div className="rounded-3xl bg-white p-6 shadow-2xl">
 
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
 
</div>
</div>
</main>
);
}
