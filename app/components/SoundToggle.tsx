"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useSoundContext } from './SoundProvider';

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#EFAF42] to-[#7C4D1E] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.3)',
      }}
      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {/* Sound waves animation */}
      <div className="relative">
        {/* Speaker icon */}
        <motion.div
          className="w-6 h-6 text-white"
          animate={{ scale: isMuted ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </motion.div>

        {/* Mute slash overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: isMuted ? 1 : 0,
            rotate: isMuted ? 0 : -45,
            scale: isMuted ? 1 : 0.5
          }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
        >
          <div className="w-8 h-0.5 bg-red-500 rounded-full transform rotate-45" />
        </motion.div>

        {/* Sound waves (when not muted) */}
        {!isMuted && (
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
            <motion.div
              className="w-1 h-1 bg-white/60 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="w-1 h-1 bg-white/40 rounded-full mt-0.5"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.3,
              }}
            />
            <motion.div
              className="w-1 h-1 bg-white/30 rounded-full mt-0.5"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.6,
              }}
            />
          </div>
        )}
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
};
