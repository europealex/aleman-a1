import { CategoryExercises } from "@/components/ExercisesPage";

export const B1Categories: CategoryExercises[] = [
  {
    title: "Past Perfect",
    icon: "⏳",
    color: "purple",
    exercises: [
      {
        question: "Choose the correct sentence:",
        options: [
          "She had finished the exam before the bell rang.",
          "She finished the exam before the bell had rung.",
          "She has finished the exam before the bell rang."
        ],
        correctAnswer: 0,
        emoji: "📝",
      },
      {
        question: "Select the correct form:",
        options: [
          "They had already left when I arrived.",
          "They already left when I had arrived.",
          "They have already left when I arrived."
        ],
        correctAnswer: 0,
        emoji: "🚗",
      },
    ],
  },

  {
    title: "Conditionals",
    icon: "🔗",
    color: "blue",
    exercises: [
      {
        question: "Choose the correct B1 conditional sentence:",
        options: [
          "If I will study, I pass the test.",
          "If I studied more, I would pass the test.",
          "If I study hard, I will pass the test."
        ],
        correctAnswer: 2,
        emoji: "📘",
      },
      {
        question: "Complete: 'If it ____ tomorrow, we will stay home.'",
        options: ["rains", "rain", "rained"],
        correctAnswer: 0,
        emoji: "🌧️",
      },
    ],
  },

  {
    title: "Reading",
    icon: "📖",
    color: "green",
    exercises: [
      {
        question: "What is the main idea of a paragraph?",
        options: [
          "The most important point the author wants to communicate.",
          "A funny detail added to entertain the reader.",
          "A random sentence that appears at the end."
        ],
        correctAnswer: 0,
        emoji: "🧠",
      },
    ],
  },

  {
    title: "Vocabulary",
    icon: "🧩",
    color: "yellow",
    exercises: [
      {
        question: "Choose the correct synonym for 'improve':",
        options: ["worsen", "enhance", "hide"],
        correctAnswer: 1,
        emoji: "✨",
      },
      {
        question: "Choose the correct antonym for 'dangerous':",
        options: ["safe", "fast", "wet"],
        correctAnswer: 0,
        emoji: "🛡️",
      },
    ],
  },
];
