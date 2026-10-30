// src/components/ui/button.tsx
'use client';
import { ButtonHTMLAttributes, FC } from 'react';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};
