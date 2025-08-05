'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AfricanDawnIntro from './AfricanDawnIntro';

interface IntroWrapperProps {
  children: React.ReactNode;
}

const IntroWrapper = ({ children }: IntroWrapperProps) => {
  const [showIntro, setShowIntro] = useState(true);

  const handleEnter = () => {
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <AfricanDawnIntro key="intro" onEnter={handleEnter} />
        ) : (
          <div key="main">{children}</div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntroWrapper;
