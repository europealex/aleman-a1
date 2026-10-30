// En el archivo de StickyWrapper.tsx o FeedWrapper.tsx
import React from 'react';

type Props = {
  className?: string; // Asegúrate de que 'className' sea opcional
  children: React.ReactNode;
};

export const StickyWrapper = ({ className, children }: Props) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

export const FeedWrapper = ({ className, children }: Props) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};
