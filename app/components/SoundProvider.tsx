"use client";

import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { useSound } from '../hooks/useSound';

interface SoundContextType {
  playClickSound: () => void;
  playHoverSound: () => void;
  playSuccessSound: () => void;
  playAmbientSound: () => void;
  stopAmbientSound: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    // Return dummy functions if context is not available
    console.warn('useSoundContext used outside of SoundProvider, returning dummy functions');
    return {
      playClickSound: () => {},
      playHoverSound: () => {},
      playSuccessSound: () => {},
      playAmbientSound: () => {},
      stopAmbientSound: () => {},
      isMuted: false,
      toggleMute: () => {},
    };
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const { loadSound, playSound, stopSound } = useSound();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load all sounds on component mount
    const initializeSounds = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') {
          console.warn('SoundProvider: Not in browser environment, skipping sound initialization');
          return;
        }

        // Load actual sound files from the public directory
        console.log('SoundProvider: Loading sound files from public directory');
        
        // Load the main sound file for different purposes
        // You can add more specific sound files later
        loadSound('/sound/sound.mp3', 'ambient', { volume: 0.3, loop: true });
        loadSound('/sound/sound.mp3', 'click', { volume: 0.5 });
        loadSound('/sound/sound.mp3', 'hover', { volume: 0.2 });
        loadSound('/sound/sound.mp3', 'success', { volume: 0.6 });
        
        // Alternative path if the first doesn't work
        // loadSound('/images/sound/sound.mp3', 'ambient', { volume: 0.3, loop: true });
        
        console.log('SoundProvider: Sound files loaded successfully');
        
        // Start ambient sound after a short delay
        setTimeout(() => {
          console.log('Starting ambient sound...');
          playSound('ambient');
        }, 2000);
      } catch (error) {
        console.warn('Could not initialize sounds:', error);
      }
    };

    initializeSounds();
  }, [loadSound, playSound]);

  const contextValue: SoundContextType = {
    playClickSound: () => {
      if (isMuted) return;
      try {
        console.log('Playing click sound');
        playSound('click');
      } catch (error) {
        console.warn('Could not play click sound:', error);
      }
    },
    playHoverSound: () => {
      if (isMuted) return;
      try {
        console.log('Playing hover sound');
        playSound('hover');
      } catch (error) {
        console.warn('Could not play hover sound:', error);
      }
    },
    playSuccessSound: () => {
      if (isMuted) return;
      try {
        console.log('Playing success sound');
        playSound('success');
      } catch (error) {
        console.warn('Could not play success sound:', error);
      }
    },
    playAmbientSound: () => {
      if (isMuted) return;
      try {
        console.log('Playing ambient sound');
        playSound('ambient');
      } catch (error) {
        console.warn('Could not play ambient sound:', error);
      }
    },
    stopAmbientSound: () => {
      try {
        console.log('Stopping ambient sound');
        stopSound('ambient');
      } catch (error) {
        console.warn('Could not stop ambient sound:', error);
      }
    },
    isMuted,
    toggleMute: () => {
      setIsMuted(prev => {
        const newMuted = !prev;
        console.log(newMuted ? 'Sounds muted' : 'Sounds unmuted');
        if (newMuted) {
          // Stop all sounds when muting
          try {
            stopSound('ambient');
          } catch (error) {
            console.warn('Could not stop ambient sound:', error);
          }
        }
        return newMuted;
      });
    },
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};
