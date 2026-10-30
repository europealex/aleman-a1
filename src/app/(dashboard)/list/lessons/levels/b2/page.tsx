"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
import { A1Categories } from "@/data/a1";

// Tipos para las props
interface VocabItem {
  icon: string;
  text: string;
}

interface CardProps {
  title: string;
  icon: string;
  items: VocabItem[];
  color: 'green' | 'orange' | 'purple' | 'blue';
  delay: number;
}

// Componente de tarjeta interactiva reutilizable
function InteractiveCard({ title, icon, items, color, delay }: CardProps) {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const colorSchemes = {
    green: {
      bg: 'from-green-100 to-green-50',
      border: 'border-green-300',
      text: 'text-green-700',
      particle: 'bg-green-200',
      shadow: 'rgba(34,197,94,0.5)',
      button: 'from-green-600 to-green-700',
      backBg: 'from-green-100 to-teal-50',
      backBorder: 'border-green-300'
    },
    orange: {
      bg: 'from-orange-100 to-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-700',
      particle: 'bg-orange-200',
      shadow: 'rgba(249,115,22,0.5)',
      button: 'from-orange-600 to-orange-700',
      backBg: 'from-orange-100 to-yellow-50',
      backBorder: 'border-orange-300'
    },
    purple: {
      bg: 'from-purple-100 to-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-700',
      particle: 'bg-purple-200',
      shadow: 'rgba(168,85,247,0.5)',
      button: 'from-purple-600 to-purple-700',
      backBg: 'from-purple-100 to-pink-50',
      backBorder: 'border-purple-300'
    },
    blue: {
      bg: 'from-blue-100 to-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-700',
      particle: 'bg-blue-200',
      shadow: 'rgba(59,130,246,0.5)',
      button: 'from-blue-600 to-blue-700',
      backBg: 'from-blue-100 to-cyan-50',
      backBorder: 'border-blue-300'
    }
  };

  const scheme = colorSchemes[color];

  return (
    <motion.div
      className="relative w-full"
      style={{ perspective: '1000px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Frente de la tarjeta */}
        <motion.div
          className={`relative p-6 bg-gradient-to-br ${scheme.bg} shadow-2xl rounded-3xl border-2 ${scheme.border} cursor-pointer overflow-hidden`}
          style={{ backfaceVisibility: 'hidden', minHeight: '400px' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            requestAnimationFrame(() => setIsFlipped(prev => !prev));
          }}
          animate={{
            boxShadow: isHovered 
              ? `0px 0px 40px ${scheme.shadow}` 
              : '0px 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              x: isHovered ? ['-100%', '200%'] : '-100%'
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear'
            }}
          />

          {/* Partículas decorativas */}
          <motion.div
            className={`absolute top-4 right-4 w-20 h-20 ${scheme.particle} rounded-full opacity-30 blur-2xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
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
            <AnimatePresence>
              {items.map((item: VocabItem, index: number) => (
                <motion.li
                  key={index}
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
              ))}
            </AnimatePresence>
          </ul>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/list/lessons/levels/a1/exercises/${title.toLowerCase()}`);
            }}
            className={`w-full text-center px-4 py-2 text-sm bg-gradient-to-r ${scheme.button} text-white rounded-2xl shadow-lg font-semibold relative overflow-hidden`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Exercises</span>
          </motion.button>

          {/* Indicador de flip */}
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
          onClick={() => setIsFlipped(!isFlipped)}
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
              ✨
            </motion.div>
            <h3 className={`text-xl font-bold ${scheme.text} mb-3`}>
              Ready to Practice?
            </h3>
            <p className="text-gray-700 mb-4 text-sm max-w-xs">
              Click &quot;Start Exercises&quot; to begin your learning journey!
            </p>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
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
}

export default function A1Page() {
  const progress = 60;

  const cardsData: CardProps[] = [
    {
      title: 'Vocabulary',
      icon: '🟩',
      color: 'green' as const,
      delay: 0,
      items: [
        { icon: '👋', text: 'Greetings (Hello, Goodbye)' },
        { icon: '🔢', text: 'Numbers 1–100' },
        { icon: '🎨', text: 'Colors' },
        { icon: '👨‍👩‍👧‍👦', text: 'Family members' },
        { icon: '📅', text: 'Days of the week' }
      ]
    },
    {
      title: 'Grammar',
      icon: '📘',
      color: 'orange' as const,
      delay: 0.1,
      items: [
        { icon: '✅', text: 'Present Simple' },
        { icon: '❓', text: 'Basic Questions' },
        { icon: '🔤', text: 'Articles (a, an, the)' },
        { icon: '👤', text: 'Personal Pronouns' },
        { icon: '🏃', text: 'Action Verbs' }
      ]
    },
    {
      title: 'Listening',
      icon: '🎧',
      color: 'purple' as const,
      delay: 0.2,
      items: [
        { icon: '🗣️', text: 'Simple Conversations' },
        { icon: '🎵', text: 'Basic Audio Clips' },
        { icon: '📻', text: 'Short Dialogues' },
        { icon: '👂', text: 'Sound Recognition' },
        { icon: '🔊', text: 'Pronunciation Practice' }
      ]
    },
    {
      title: 'Speaking',
      icon: '💬',
      color: 'blue' as const,
      delay: 0.3,
      items: [
        { icon: '👋', text: 'Introduce Yourself' },
        { icon: '🛒', text: 'Shopping Phrases' },
        { icon: '🍽️', text: 'Ordering Food' },
        { icon: '🚕', text: 'Asking Directions' },
        { icon: '☎️', text: 'Phone Conversations' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex flex-col items-center p-10">
      {/* TITLE */}
      <motion.h1
        className="text-5xl font-bold text-blue-700 mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Level A1 – Beginner
      </motion.h1>

      {/* PROGRESS BAR */}
      <div className="w-full max-w-2xl mb-10">
        <p className="text-gray-700 mb-2 font-semibold">Progress: {progress}%</p>
        <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <motion.p
        className="text-xl text-gray-700 max-w-2xl text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to the A1 level! Start learning essential English.
      </motion.p>

      {/* CONTENT SECTIONS - 4 TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full mb-16">
        {cardsData.map((card, index: number) => (
          <InteractiveCard
            key={index}
            title={card.title}
            icon={card.icon}
            items={card.items}
            color={card.color}
            delay={card.delay}
          />
        ))}
      </div>

      {/* BACK BUTTON */}
      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-2xl shadow-lg hover:shadow-xl font-semibold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.history.back()}
      >
        ⬅ Back to Levels
      </motion.button>
    </div>
  );
}