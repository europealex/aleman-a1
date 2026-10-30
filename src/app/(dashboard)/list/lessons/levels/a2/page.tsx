"use client";

import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";

// Tipos para las props
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

// Constantes movidas fuera del componente
const COLOR_SCHEMES = {
  teal: {
    bg: 'from-teal-100 to-teal-50',
    border: 'border-teal-400',
    text: 'text-teal-700',
    particle: 'bg-teal-200',
    shadow: 'rgba(20,184,166,0.5)',
    button: 'from-teal-600 to-teal-700',
    backBg: 'from-teal-100 to-cyan-50',
    backBorder: 'border-teal-400'
  },
  amber: {
    bg: 'from-amber-100 to-amber-50',
    border: 'border-amber-400',
    text: 'text-amber-700',
    particle: 'bg-amber-200',
    shadow: 'rgba(245,158,11,0.5)',
    button: 'from-amber-600 to-amber-700',
    backBg: 'from-amber-100 to-yellow-50',
    backBorder: 'border-amber-400'
  },
  indigo: {
    bg: 'from-indigo-100 to-indigo-50',
    border: 'border-indigo-400',
    text: 'text-indigo-700',
    particle: 'bg-indigo-200',
    shadow: 'rgba(99,102,241,0.5)',
    button: 'from-indigo-600 to-indigo-700',
    backBg: 'from-indigo-100 to-violet-50',
    backBorder: 'border-indigo-400'
  },
  rose: {
    bg: 'from-rose-100 to-rose-50',
    border: 'border-rose-400',
    text: 'text-rose-700',
    particle: 'bg-rose-200',
    shadow: 'rgba(244,63,94,0.5)',
    button: 'from-rose-600 to-rose-700',
    backBg: 'from-rose-100 to-pink-50',
    backBorder: 'border-rose-400'
  }
} as const;

// Configuración de animaciones reutilizables
const ANIMATION_CONFIG = {
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  flip: { duration: 0.35, ease: "easeOut" as const },
  hover: { duration: 0.2 },
  particles: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
};

// Componente memoizado para items individuales
const VocabItemComponent = memo(({ item, schemeParticle }: { item: VocabItem; schemeParticle: string }) => (
  <motion.li
    className="flex items-center gap-3 text-base text-gray-800 bg-white/50 p-2.5 rounded-xl backdrop-blur-sm"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
    whileHover={{ 
      x: 10, 
      backgroundColor: 'rgba(255,255,255,0.8)',
      transition: { duration: 0.2 }
    }}
  >
    <motion.span
      className="text-xl"
      whileHover={{ scale: 1.3, rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {item.icon}
    </motion.span>
    {item.text}
  </motion.li>
));
VocabItemComponent.displayName = 'VocabItemComponent';

// Componente de tarjeta optimizado y memoizado
const InteractiveCard = memo(({ title, icon, items, color, delay }: CardProps) => {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Memoizar el esquema de color
  const scheme = useMemo(() => COLOR_SCHEMES[color], [color]);

  // Callbacks memoizados
  const handleFlip = useCallback(() => {
    requestAnimationFrame(() => setIsFlipped(prev => !prev));
  }, []);

  const handleStartExercises = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/list/lessons/levels/a2/exercises/${title.toLowerCase()}`);
  }, [router, title]);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  // Estilos calculados una vez
  const boxShadow = useMemo(() => 
    isHovered 
      ? `0px 0px 40px ${scheme.shadow}` 
      : '0px 10px 30px rgba(0,0,0,0.1)',
    [isHovered, scheme.shadow]
  );

  return (
    <motion.div
      className="relative w-full"
      style={{ perspective: '1000px' }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={ANIMATION_CONFIG.flip}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Frente de la tarjeta */}
        <motion.div
          className={`relative p-6 bg-gradient-to-br ${scheme.bg} shadow-2xl rounded-3xl border-2 ${scheme.border} cursor-pointer overflow-hidden`}
          style={{ backfaceVisibility: 'hidden', minHeight: '400px' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFlip}
          animate={{ boxShadow }}
        >
          {/* Efecto de brillo - solo cuando hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Partículas decorativas */}
          <motion.div
            className={`absolute top-4 right-4 w-20 h-20 ${scheme.particle} rounded-full opacity-30 blur-2xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={ANIMATION_CONFIG.particles}
          />

          <motion.h2 
            className={`text-2xl font-bold ${scheme.text} mb-4 flex items-center gap-3`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              {icon}
            </motion.span>
            {title}
          </motion.h2>

          <ul className="space-y-2 mb-6">
            {items.map((item, index) => (
              <VocabItemComponent 
                key={`${item.text}-${index}`} 
                item={item} 
                schemeParticle={scheme.particle}
              />
            ))}
          </ul>

          <motion.button
            onClick={handleStartExercises}
            className={`w-full text-center px-4 py-2 text-sm bg-gradient-to-r ${scheme.button} text-white rounded-2xl shadow-lg font-semibold relative overflow-hidden`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Exercises</span>
          </motion.button>

          <motion.p
            className="text-center mt-3 text-xs text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to flip 🔄
          </motion.p>
        </motion.div>

        {/* Reverso de la tarjeta */}
        <motion.div
          className={`absolute inset-0 p-6 bg-gradient-to-br ${scheme.backBg} shadow-2xl rounded-3xl border-2 ${scheme.backBorder} cursor-pointer`}
          style={{ 
            backfaceVisibility: 'hidden',
            rotateY: 180,
            minHeight: '400px'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFlip}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-full flex flex-col items-center justify-center text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              ⚡
            </motion.div>
            <h3 className={`text-xl font-bold ${scheme.text} mb-3`}>
              Level Up Your Skills!
            </h3>
            <p className="text-gray-700 mb-4 text-sm max-w-xs">
              Expand your knowledge with intermediate exercises!
            </p>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2.5 h-2.5 ${scheme.particle} rounded-full`}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
            <motion.p
              className="mt-4 text-xs text-gray-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to flip back 🔄
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});
InteractiveCard.displayName = 'InteractiveCard';

// Datos de tarjetas como constante
const CARDS_DATA: CardProps[] = [
  {
    title: 'Vocabulary',
    icon: '📚',
    color: 'teal',
    delay: 0,
    items: [
      { icon: '🏠', text: 'House & Furniture' },
      { icon: '💼', text: 'Jobs & Occupations' },
      { icon: '🌦️', text: 'Weather & Seasons' },
      { icon: '🍔', text: 'Food & Restaurants' },
      { icon: '✈️', text: 'Travel & Transport' }
    ]
  },
  {
    title: 'Grammar',
    icon: '📖',
    color: 'amber',
    delay: 0.1,
    items: [
      { icon: '⏰', text: 'Past Simple' },
      { icon: '🔮', text: 'Future (will/going to)' },
      { icon: '⚖️', text: 'Comparatives & Superlatives' },
      { icon: '🎯', text: 'Modal Verbs (can, could, should)' },
      { icon: '🔄', text: 'Present Continuous' }
    ]
  },
  {
    title: 'Listening',
    icon: '🎧',
    color: 'indigo',
    delay: 0.2,
    items: [
      { icon: '🗨️', text: 'Everyday Conversations' },
      { icon: '📺', text: 'Short Videos & Clips' },
      { icon: '📞', text: 'Phone Dialogues' },
      { icon: '🎙️', text: 'Interviews & Stories' },
      { icon: '🔊', text: 'Accent Recognition' }
    ]
  },
  {
    title: 'Speaking',
    icon: '🗣️',
    color: 'rose',
    delay: 0.3,
    items: [
      { icon: '🎭', text: 'Describe Experiences' },
      { icon: '💭', text: 'Express Opinions' },
      { icon: '📅', text: 'Make Plans & Appointments' },
      { icon: '🙏', text: 'Make Requests & Offers' },
      { icon: '📖', text: 'Tell Simple Stories' }
    ]
  }
];

export default function A2Page() {
  const progress = 45;

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-rose-50 flex flex-col items-center p-10">
      <motion.h1
        className="text-5xl font-bold text-indigo-700 mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Level A2 – Elementary
      </motion.h1>

      <div className="w-full max-w-2xl mb-10">
        <p className="text-gray-700 mb-2 font-semibold">Progress: {progress}%</p>
        <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <motion.p
        className="text-xl text-gray-700 max-w-2xl text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Build on your foundations and express yourself with more confidence!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full mb-16">
        {CARDS_DATA.map((card) => (
          <InteractiveCard
            key={card.title}
            title={card.title}
            icon={card.icon}
            items={card.items}
            color={card.color}
            delay={card.delay}
          />
        ))}
      </div>

      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-2xl shadow-lg hover:shadow-xl font-semibold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
      >
        ⬅ Back to Levels
      </motion.button>
    </div>
  );
}