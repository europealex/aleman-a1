"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  hover: { scale: 1.05 },
  tap: { scale: 0.97 },
};

const levels = [
  { level: "A1", path: "/list/lessons/levels/a1" },
  { level: "A2", path: "/list/lessons/levels/a2" },
  { level: "B1", path: "/list/lessons/levels/b1" },
  { level: "B2", path: "/list/lessons/levels/b2" },
];

export default function LessonsPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-6 sm:p-10"
      style={{ backgroundImage: "url('/fondo1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex w-full flex-col items-center">
       <motion.h1
  className="mb-12 text-center text-4xl font-extrabold text-white drop-shadow-lg sm:mb-16 sm:text-6xl"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  German Lessons 🇩🇪
</motion.h1>


        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-10 md:grid-cols-4">
          {levels.map((item) => (
            <Link
              key={item.level}
              href={item.path}
              prefetch={true}
              className="block"
            >
              <motion.div
                className="cursor-pointer rounded-3xl border border-gray-200 bg-white/90 p-8 text-center text-3xl font-bold shadow-xl transition hover:bg-white sm:p-10"
                variants={cardVariants}
                initial="initial"
                animate="enter"
                whileHover="hover"
                whileTap="tap"
              >
                Level {item.level}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}