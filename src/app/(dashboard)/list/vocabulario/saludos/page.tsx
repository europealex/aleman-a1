
"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Props {
  title: string;
}

const StartExercisesButton = memo(({ title }: Props) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    router.push(`/list/lessons/levels/a1/exercises/${slug}`);
  }, [router, title]);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="w-full text-center px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-lg font-semibold relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">
        Start Exercises
      </span>
    </motion.button>
  );
});

StartExercisesButton.displayName = "StartExercisesButton";

export default StartExercisesButton;
