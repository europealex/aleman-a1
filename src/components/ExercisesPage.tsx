"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface Exercise {
  question: string;
  options: string[];
  correctAnswer: number;
  emoji: string;
}

export interface CategoryExercises {
  title: string;
  icon: string;
  color: string;
  exercises: Exercise[];
}

interface ExercisesPageProps {
  categories: CategoryExercises[];
  title?: string;
  backPath?: string;
}

export default function ExercisesPage({ categories, title, backPath }: ExercisesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories && categories.length > 0 ? categories[0].title : null
  );
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const colorSchemes: any = {
    green: { bg: "from-green-100 to-green-50", button: "from-green-600 to-green-700", text: "text-green-700", border: "border-green-300" },
    orange: { bg: "from-orange-100 to-orange-50", button: "from-orange-600 to-orange-700", text: "text-orange-700", border: "border-orange-300" },
    purple: { bg: "from-purple-100 to-purple-50", button: "from-purple-600 to-purple-700", text: "text-purple-700", border: "border-purple-300" },
    blue: { bg: "from-blue-100 to-blue-50", button: "from-blue-600 to-blue-700", text: "text-blue-700", border: "border-blue-300" },
  };

  const currentCategory = useMemo(
    () => categories.find((c) => c.title === selectedCategory) ?? categories[0],
    [categories, selectedCategory]
  );

  React.useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].title);
    }
  }, [categories, selectedCategory]);

  if (!currentCategory) return null;

  const scheme = colorSchemes[currentCategory.color] ?? colorSchemes.blue;
  const ex = currentCategory.exercises[currentExercise];

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === ex.correctAnswer) setScore((s) => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentExercise < currentCategory.exercises.length - 1) {
      setCurrentExercise((n) => n + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  // ==========================
  //   COMPLETED SCREEN
  // ==========================
  if (completed) {
    const percent = Math.round((score / currentCategory.exercises.length) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`p-8 rounded-3xl bg-gradient-to-br ${scheme.bg} border-2 ${scheme.border} shadow-xl text-center`}
        >
          <div className="text-6xl mb-4">{percent >= 80 ? "🎉" : percent >= 60 ? "👍" : "💪"}</div>
          <h2 className={`text-2xl font-bold ${scheme.text}`}>Completed</h2>
          <p className="my-4">
            Score: {score} / {currentCategory.exercises.length} — {percent}%
          </p>

          <div className="flex justify-center gap-4">
            <button
              className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${scheme.button} text-white`}
              onClick={handleRestart}
            >
              Choose another
            </button>

            {backPath && (
              <Link
                href={backPath}
                className="px-6 py-3 rounded-2xl bg-white border shadow hover:bg-gray-100 transition"
              >
                Back
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================
  //   MAIN EXERCISE SCREEN
  // ==========================
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex flex-col items-center">
      <div className="w-full max-w-3xl">

        <h1 className={`text-3xl font-bold ${scheme.text} mb-2`}>
          {title ?? currentCategory.icon + " " + currentCategory.title}
        </h1>

        <p className="text-gray-700 mb-4">
          Question {currentExercise + 1} / {currentCategory.exercises.length}
        </p>

        <div className={`p-6 rounded-3xl shadow-xl border-2 ${scheme.border} bg-gradient-to-br ${scheme.bg}`}>
          <div className="text-6xl text-center mb-4">{ex.emoji}</div>
          <h2 className="text-2xl font-bold text-center mb-6">{ex.question}</h2>

          <div className="space-y-3">
            {ex.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = ex.correctAnswer === idx;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  disabled={showResult}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full text-left p-3 rounded-2xl border-2 transition ${
                    showCorrect
                      ? "bg-green-100 border-green-500 text-green-800"
                      : showWrong
                      ? "bg-red-100 border-red-500 text-red-800"
                      : isSelected
                      ? "bg-white border-blue-500 shadow-md"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{opt}</span>
                    {showCorrect && <span>✓</span>}
                    {showWrong && <span>✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {!showResult ? (
              <button
                disabled={selectedAnswer === null}
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-2xl text-white bg-gradient-to-r ${scheme.button} disabled:opacity-60`}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`px-6 py-2 rounded-2xl text-white bg-gradient-to-r ${scheme.button}`}
              >
                Next
              </button>
            )}
          </div>

          <div className="text-center mt-4 text-gray-600">Score: {score}</div>
        </div>
      </div>
    </div>
  );
}