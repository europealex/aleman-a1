import React from "react";

interface Props {
  categories: any[];
  onSelect: (index: number, mode: "vocabulary" | "exercise") => void;
}

export default function MenuView({ categories, onSelect }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() =>
              onSelect(index, cat.title === "Vocabulary" ? "vocabulary" : "exercise")
            }
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="text-6xl">{cat.icon}</div>
            <h2 className="text-2xl font-bold">{cat.title}</h2>
            <p>{cat.exercises.length} exercises</p>
          </button>
        ))}
      </div>
    </div>
  );
}
