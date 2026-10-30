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
  color: 'emerald' | 'violet' | 'sky' | 'fuchsia';
  delay: number;
}

// Constantes movidas fuera del componente
const COLOR_SCHEMES = {
  emerald: {
    bg: 'from-emerald-100 to-emerald-50',
    border: 'border-emerald-400',
    text: 'text-emerald-700',
    particle: 'bg-emerald-200',
    shadow: 'rgba(16,185,129,0.5)',
    button: 'from-emerald-600 to-emerald-700',
    backBg: 'from-emerald-100 to-green-50',
    backBorder: 'border-emerald-400'
  },
  violet: {
    bg: 'from-violet-100 to-violet-50',
    border: 'border-violet-400',
    text: 'text-violet-700',
    particle: 'bg-violet-200',
    shadow: 'rgba(139,92,246,0.5)',
    button: 'from-violet-600 to-violet-700',
    backBg: 'from-violet-100 to-purple-50',
    backBorder: 'border-violet-400'
  },
  sky: {
    bg: 'from-sky-100 to-sky-50',
    border: 'border-sky-400',
    text: 'text-sky-700',
    particle: 'bg-sky-200',
    shadow: 'rgba(14,165,233,0.5)',
    button: 'from-sky-600 to-sky-700',
    backBg: 'from-sky-100 to-blue-50',
    backBorder: 'border-sky-400'
  },
  fuchsia: {
    bg: 'from-fuchsia-100 to-fuchsia-50',
    border: 'border-fuchsia-400',
    text: 'text-fuchsia-700',
    particle: 'bg-fuchsia-200',
    shadow: 'rgba(217,70,239,0.5)',
    button: 'from-fuchsia-600 to-fuchsia-700',
    backBg: 'from-fuchsia-100 to-pink-50',
    backBorder: 'border-fuchsia-400'
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
    router.push(`/list/lessons/levels/b1/exercises/${title.toLowerCase()}`);
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
              🎯
            </motion.div>
            <h3 className={`text-xl font-bold ${scheme.text} mb-3`}>
              Master Intermediate English!
            </h3>
            <p className="text-gray-700 mb-4 text-sm max-w-xs">
              Challenge yourself with complex topics and real-world situations!
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
    icon: '🌟',
    color: 'emerald',
    delay: 0,
    items: [
      { icon: '🏥', text: 'Health & Medicine' },
      { icon: '💻', text: 'Technology & Innovation' },
      { icon: '🌍', text: 'Environment & Nature' },
      { icon: '🎓', text: 'Education & Learning' },
      { icon: '🎬', text: 'Entertainment & Media' }
    ]
  },
  {
    title: 'Grammar',
    icon: '⚙️',
    color: 'violet',
    delay: 0.1,
    items: [
      { icon: '⏳', text: 'Present Perfect' },
      { icon: '🔀', text: 'Passive Voice' },
      { icon: '💭', text: 'Conditional Sentences (1st & 2nd)' },
      { icon: '📢', text: 'Reported Speech' },
      { icon: '🔗', text: 'Relative Clauses' }
    ]
  },
  {
    title: 'Listening',
    icon: '🎵',
    color: 'sky',
    delay: 0.2,
    items: [
      { icon: '🎙️', text: 'Podcasts & Radio' },
      { icon: '📺', text: 'News & Documentaries' },
      { icon: '🗣️', text: 'Interviews & Debates' },
      { icon: '🎭', text: 'Movie & TV Dialogues' },
      { icon: '🌐', text: 'Different Accents' }
    ]
  },
  {
    title: 'Speaking',
    icon: '💡',
    color: 'fuchsia',
    delay: 0.3,
    items: [
      { icon: '🎤', text: 'Give Presentations' },
      { icon: '💬', text: 'Argue & Persuade' },
      { icon: '📖', text: 'Narrate Events & Stories' },
      { icon: '🤝', text: 'Negotiate & Discuss' },
      { icon: '❓', text: 'Ask Complex Questions' }
    ]
  }
];

export default function B1Page() {
  const progress = 30;

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-fuchsia-50 flex flex-col items-center p-10">
      <motion.h1
        className="text-5xl font-bold text-violet-700 mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Level B1 – Intermediate
      </motion.h1>

      <div className="w-full max-w-2xl mb-10">
        <p className="text-gray-700 mb-2 font-semibold">Progress: {progress}%</p>
        <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-600"
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
        Navigate real-world situations and express complex ideas with confidence!
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
        className="px-8 py-4 bg-gradient-to-r from-violet-700 to-violet-800 text-white rounded-2xl shadow-lg hover:shadow-xl font-semibold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
      >
        ⬅ Back to Levels
      </motion.button>
    </div>
  );
}