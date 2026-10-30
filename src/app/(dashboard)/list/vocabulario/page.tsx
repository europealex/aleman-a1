import Link from "next/link";

const categorias = [
  {
    nombre: "Animales",
    descripcion: "Aprende nombres de animales en alemán",
    ruta: "/list/vocabulario/animales",
    emoji: "🐶",
  },
  {
    nombre: "Comida",
    descripcion: "Alimentos, bebidas y comidas",
    ruta: "/list/vocabulario/comida",
    emoji: "🍎",
  },
  {
    nombre: "Frases",
    descripcion: "Expresiones útiles en alemán",
    ruta: "/list/vocabulario/frases",
    emoji: "💬",
  },
  {
    nombre: "Objetos",
    descripcion: "Objetos de la vida cotidiana",
    ruta: "/list/vocabulario/objetos",
    emoji: "🎒",
  },
  {
    nombre: "Ropa",
    descripcion: "Prendas y accesorios",
    ruta: "/list/vocabulario/ropa",
    emoji: "👕",
  },
  {
    nombre: "Saludos",
    descripcion: "Saluda y despídete en alemán",
    ruta: "/list/vocabulario/saludos",
    emoji: "👋",
  },
];

export default function VocabularioPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-600">
            Deutsch lernen
          </p>

          <h1 className="text-4xl font-extrabold text-slate-800 md:text-5xl">
            Aprende vocabulario
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Aprende alemán paso a paso con imágenes,
            tarjetas interactivas y pronunciación.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <Link
              key={categoria.ruta}
              href={categoria.ruta}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="mb-4 text-5xl">
                {categoria.emoji}
              </div>

              <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600">
                {categoria.nombre}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {categoria.descripcion}
              </p>

              <div className="mt-5 font-semibold text-indigo-600">
                Estudiar ahora →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}