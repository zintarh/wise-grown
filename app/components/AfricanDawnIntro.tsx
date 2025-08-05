'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AfricanDawnIntroProps {
  onEnter: () => void;
}

const AfricanDawnIntro = ({ onEnter }: AfricanDawnIntroProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ambient audio control
  const handleAudioToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioEnabled) {
      audio.pause();
      audio.volume = 0;
    } else {
      audio.volume = 0.3;
      audio.play().catch(console.log);
    }
    setAudioEnabled(!audioEnabled);
  };

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer"
      onClick={onEnter}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Audio */}
      <audio
        ref={audioRef}
        loop
        preload="none"
      >
        {/* Placeholder for ambient sounds - would need actual audio files */}
      </audio>

      {/* Animated Background - African Dawn Scene */}
      <div className="absolute inset-0">
        {/* Sky Gradient - Dawn Colors */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(to bottom, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #e94560 85%, #f39c12 100%)',
              'linear-gradient(to bottom, #2c3e50 0%, #3498db 20%, #e67e22 60%, #f39c12 80%, #f1c40f 100%)',
              'linear-gradient(to bottom, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #e94560 85%, #f39c12 100%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Animated Sun */}
        <motion.div
          className="absolute"
          style={{
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, #f1c40f 0%, #e67e22 50%, #d35400 100%)',
            borderRadius: '50%',
            right: '15%',
            top: '20%',
            boxShadow: '0 0 100px rgba(241, 196, 15, 0.6), 0 0 200px rgba(230, 126, 34, 0.4)'
          }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 100px rgba(241, 196, 15, 0.6), 0 0 200px rgba(230, 126, 34, 0.4)',
              '0 0 120px rgba(241, 196, 15, 0.8), 0 0 240px rgba(230, 126, 34, 0.6)',
              '0 0 100px rgba(241, 196, 15, 0.6), 0 0 200px rgba(230, 126, 34, 0.4)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Baobab Trees Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          {/* Tree 1 */}
          <motion.div
            className="absolute bottom-0 left-1/4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <svg width="150" height="300" viewBox="0 0 150 300" className="fill-black opacity-80">
              <path d="M75 300 L75 200 Q75 180 85 170 Q95 160 105 165 Q115 170 120 180 Q125 190 120 200 Q115 210 105 215 Q95 220 85 215 Q75 210 75 200 Z" />
              <path d="M75 200 Q65 190 55 185 Q45 180 35 185 Q25 190 30 200 Q35 210 45 215 Q55 220 65 215 Q75 210 75 200" />
              <path d="M75 200 Q85 190 95 185 Q105 180 115 185 Q125 190 120 200 Q115 210 105 215 Q95 220 85 215 Q75 210 75 200" />
              <rect x="70" y="200" width="10" height="100" />
            </svg>
          </motion.div>

          {/* Tree 2 */}
          <motion.div
            className="absolute bottom-0 right-1/3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <svg width="120" height="250" viewBox="0 0 120 250" className="fill-black opacity-70">
              <path d="M60 250 L60 170 Q60 150 70 140 Q80 130 90 135 Q100 140 105 150 Q110 160 105 170 Q100 180 90 185 Q80 190 70 185 Q60 180 60 170 Z" />
              <path d="M60 170 Q50 160 40 155 Q30 150 20 155 Q10 160 15 170 Q20 180 30 185 Q40 190 50 185 Q60 180 60 170" />
              <rect x="55" y="170" width="10" height="80" />
            </svg>
          </motion.div>

          {/* Tree 3 */}
          <motion.div
            className="absolute bottom-0 left-1/6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <svg width="100" height="200" viewBox="0 0 100 200" className="fill-black opacity-60">
              <path d="M50 200 L50 140 Q50 120 60 110 Q70 100 80 105 Q90 110 95 120 Q100 130 95 140 Q90 150 80 155 Q70 160 60 155 Q50 150 50 140 Z" />
              <rect x="45" y="140" width="10" height="60" />
            </svg>
          </motion.div>
        </div>

        {/* Animated Smoke from Cooking Fires */}
        <div className="absolute bottom-20 left-1/3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-60"
              style={{ left: `${i * 10}px` }}
              animate={{
                y: [0, -100, -200],
                x: [0, Math.sin(i) * 20, Math.sin(i + 1) * 30],
                opacity: [0.6, 0.3, 0],
                scale: [0.5, 1, 1.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>

        {/* Animated Drums (subtle pulsing) */}
        <motion.div
          className="absolute bottom-32 right-1/4 w-8 h-12 bg-amber-900 rounded-lg opacity-70"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Logo with Morphing Effect */}
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="relative"
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          {/* Main Logo */}
          <motion.div
            className="text-6xl font-black text-white"
            style={{
              fontFamily: 'Urbanist, sans-serif',
              textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
              filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))'
            }}
            animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            WISEGROWN
          </motion.div>

          {/* Tribal Symbols (appear on hover) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex space-x-4 text-4xl text-yellow-300">
                  {/* Adinkra Symbols */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    ⚡
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌿
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    ☀️
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🥥
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Interactive Greeting */}
      <motion.div
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{
            fontFamily: ',Urbanist sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          Tap to Enter
        </motion.h2>
        
        <motion.p
          className="text-lg text-yellow-300 opacity-80"
          animate={{
            y: [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          Slide to Feel the Rhythm
        </motion.p>

        {/* Animated Arrow */}
        <motion.div
          className="mt-6 text-2xl text-white"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Audio Toggle Button */}
      <motion.button
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          handleAudioToggle();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {audioEnabled ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </motion.button>

      {/* Ripple Effect on Click */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: [0, 2],
          opacity: [0.3, 0]
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)'
        }}
      />
    </motion.div>
  );
};

export default AfricanDawnIntro;
