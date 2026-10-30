"use client";

import React, { useMemo, useCallback, memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";

// Tipos
interface VocabItem {
  icon: string;
  text: string;
}

interface CardProps {
  title: string;
  icon: string;
  items: VocabItem[];
  color: 'teal' | 'amber' | 'indigo' | 'rose';
  delay: number;
}

// Colores
const COLOR_SCHEMES = {
  teal: {
    bg: 'from-teal-100 to-teal-50',
    border: 'border-teal-400',
    text: 'text-teal-700',
    particle: 'bg-teal-200',
    button: 'from-teal-600 to-teal-700',
    shadow: 'rgba(20,184,166,0.5)',
  },
  amber: {
    bg: 'from-amber-100 to-amber-50',
    border: 'border-amber-400',
    text: 'text-amber-700',
    particle: 'bg-amber-200',
    button: 'from-amber-600 to-amber-700',
    shadow: 'rgba(245,158,11,0.5)',
  },
  indigo: {
    bg: 'from-indigo-100 to-indigo-50',
    border: 'border-indigo-400',
    text: 'text-indigo-700',
    particle: 'bg-indigo-200',
    button: 'from-indigo-600 to-indigo-700',
    shadow: 'rgba(99,102,241,0.5)',
  },
  rose: {
    bg: 'from-rose-100 to-rose-50',
    border: 'border-rose-400',
    text: 'text-rose-700',
    particle: 'bg-rose-200',
    button: 'from-rose-600 to-rose-700',
    shadow: 'rgba(244,63,94,0.5)',
  }
} as const;

// Ítems
const VocabItemComponent = memo(({ item }: { item: VocabItem }) => (
  <motion.li
    className="flex items-center gap-3 text-base text-gray-800 bg-white/60 p-2 rounded-xl"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
  >
    <span className="text-xl">{item.icon}</span>
    {item.text}
  </motion.li>
));
VocabItemComponent.displayName = "VocabItemComponent";

// Tarjeta rápida sin flip
const InteractiveCard = memo(({ title, icon, items, color, delay }: CardProps) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const scheme = useMemo(() => COLOR_SCHEMES[color], [color]);

  const handleStartExercises = useCallback(() => {
    router.push(`/list/lessons/levels/a2/exercises/${title.toLowerCase()}`);
  }, [router, title]);

  return (
    <motion.div
      className={`relative p-6 bg-gradient-to-br ${scheme.bg} rounded-3xl border-2 ${scheme.border} shadow-xl`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      {/* Efecto sutil */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.h2 className={`text-2xl font-bold flex items-center gap-3 ${scheme.text}`}>
        <span className="text-3xl">{icon}</span>
        {title}
      </motion.h2>

      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <VocabItemComponent key={index} item={item} />
        ))}
      </ul>

      <motion.button
        onClick={handleStartExercises}
        className={`w-full mt-6 px-4 py-2 bg-gradient-to-r ${scheme.button} text-white rounded-xl font-semibold`}
        whileHover={{ scale: 1.05 }}
      >
        Start Exercises
      </motion.button>
    </motion.div>
  );
});
InteractiveCard.displayName = "InteractiveCard";

export default InteractiveCard;
