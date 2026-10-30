"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

interface CardProps {
  title: string;
  description: string;
  unlocked: boolean;
  onComplete?: () => void;
  gradient: string;
  link: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  unlocked,
  gradient,
  link,
  onComplete,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (unlocked) {
      router.push(link);
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div
      className={`w-72 h-48 px-4 py-3 flex flex-col justify-between items-center 
      border-4 border-black shadow-[4px_4px_0_#333] 
      font-minecraft transition-all duration-300 text-white text-center cursor-pointer
      ${unlocked ? `bg-gradient-to-br ${gradient}` : "bg-gray-700 opacity-70 cursor-not-allowed"}
      `}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-1">{title}</h2>
        <p className="text-sm leading-tight">{description}</p>
      </div>

      {unlocked ? (
        <button
          className="mt-3 px-3 py-1 bg-yellow-300 text-black border-2 border-black shadow-[2px_2px_0_#222] text-sm flex items-center"
        >
          Complete
          <CheckCircleIcon className="w-5 h-5 ml-2 text-green-600" />
        </button>
      ) : (
        <div
          className="mt-3 px-3 py-1 bg-gray-500 border-2 border-black text-sm flex items-center"
        >
          Locked
          <LockClosedIcon className="w-5 h-5 ml-2 text-red-500" />
        </div>
      )}
    </div>
  );
};

export default Card;
