import { CategoryExercises } from "@/components/ExercisesPage";

export const B2Categories: CategoryExercises[] = [
  {
    title: "Passive Voice",
    icon: "🛠️",
    color: "blue",
    exercises: [
      {
        question: "Choose the correct passive sentence.",
        options: [
          "They built the bridge in 1998.",
          "The bridge was built in 1998.",
          "The bridge is build in 1998."
        ],
        correctAnswer: 1,
        emoji: "🌉",
      },
      {
        question: "Which passive form is correct?",
        options: [
          "The project will be finished tomorrow.",
          "The project will finished tomorrow.",
          "The project is finishing tomorrow."
        ],
        correctAnswer: 0,
        emoji: "📁",
      },
    ],
  },

  {
    title: "Third Conditional",
    icon: "⛓️",
    color: "purple",
    exercises: [
      {
        question: "Choose the correct third conditional sentence.",
        options: [
          "If I had studied, I will pass.",
          "If I studied, I would had passed.",
          "If I had studied, I would have passed."
        ],
        correctAnswer: 2,
        emoji: "📘",
      },
      {
        question: "Select the correct option.",
        options: [
          "If she had left earlier, she wouldn’t have missed the train.",
          "If she leaves earlier, she wouldn’t have missed the train.",
          "If she had left earlier, she won’t miss the train."
        ],
        correctAnswer: 0,
        emoji: "🚆",
      },
    ],
  },

  {
    title: "Relative Clauses",
    icon: "🔗",
    color: "green",
    exercises: [
      {
        question: "Choose the correct relative pronoun.",
        options: [
          "The man which lives next door is a doctor.",
          "The man who lives next door is a doctor.",
          "The man where lives next door is a doctor."
        ],
        correctAnswer: 1,
        emoji: "👨‍⚕️",
      },
      {
        question: "Choose the best sentence.",
        options: [
          "The book, which I bought yesterday, is amazing.",
          "The book who I bought yesterday is amazing.",
          "The book where I bought yesterday is amazing."
        ],
        correctAnswer: 0,
        emoji: "📖",
      },
    ],
  },

  {
    title: "Causatives (Have/Get Something Done)",
    icon: "⚙️",
    color: "orange",
    exercises: [
      {
        question: "Choose the correct causative sentence.",
        options: [
          "I had my car fixed yesterday.",
          "I fixed my car yesterday by someone.",
          "I had fixed my car yesterday."
        ],
        correctAnswer: 0,
        emoji: "🚗",
      },
      {
        question: "Which sentence is correct?",
        options: [
          "She got her hair cut.",
          "She got cut her hair.",
          "She cut her hair by a stylist."
        ],
        correctAnswer: 0,
        emoji: "💇‍♀️",
      },
    ],
  },

  {
    title: "Advanced Modals",
    icon: "🎯",
    color: "purple",
    exercises: [
      {
        question: "Choose the modal of deduction.",
        options: [
          "She must be tired.",
          "She might to be tired.",
          "She can tired."
        ],
        correctAnswer: 0,
        emoji: "😴",
      },
      {
        question: "Choose the correct sentence.",
        options: [
          "He can't have forgotten the meeting.",
          "He must haven't forgotten the meeting.",
          "He might hasn't forgotten the meeting."
        ],
        correctAnswer: 0,
        emoji: "📅",
      },
    ],
  },
];
