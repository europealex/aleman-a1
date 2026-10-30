"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.05 },
  tap: { scale: 0.97 }
};

export default function LessonsPage() {
  const levels = [
    { level: "A1", path: "/list/lessons/levels/a1" },
    { level: "A2", path: "/list/lessons/levels/a2" },
    { level: "B1", path: "/list/lessons/levels/b1" },
    { level: "B2", path: "/list/lessons/levels/b2" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-10 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/fondo1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-6xl font-extrabold mb-16 text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          English Lessons
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl w-full px-4">
          {levels.map((item) => (
            <Link key={item.level} href={item.path} prefetch={true}>
              <motion.div
                className="p-10 text-center bg-white/90 rounded-3xl shadow-xl 
                           font-bold text-3xl border border-gray-200 cursor-pointer 
                           hover:bg-white transition"
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
