import { useEffect, useRef, useCallback } from 'react';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Initialize audio context
  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
    };

    // Initialize on user interaction to comply with browser policies
    const handleUserInteraction = () => {
      initAudioContext();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const loadSound = useCallback((url: string, key: string, options: SoundOptions = {}) => {
    if (soundsRef.current.has(key)) {
      return soundsRef.current.get(key)!;
    }

    const audio = new Audio(url);
    audio.volume = options.volume ?? 0.5;
    audio.loop = options.loop ?? false;
    
    // Preload the audio
    audio.preload = 'auto';
    
    soundsRef.current.set(key, audio);
    return audio;
  }, []);

  const playSound = useCallback(async (key: string, options: SoundOptions = {}) => {
    const audio = soundsRef.current.get(key);
    if (!audio) return;

    try {
      // Reset audio to beginning
      audio.currentTime = 0;
      
      // Set volume if provided
      if (options.volume !== undefined) {
        audio.volume = options.volume;
      }
      
      await audio.play();
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }, []);

  const stopSound = useCallback((key: string) => {
    const audio = soundsRef.current.get(key);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const pauseSound = useCallback((key: string) => {
    const audio = soundsRef.current.get(key);
    if (audio) {
      audio.pause();
    }
  }, []);

  const setVolume = useCallback((key: string, volume: number) => {
    const audio = soundsRef.current.get(key);
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  // Cleanup function
  useEffect(() => {
    const sounds = soundsRef.current; // Store the current value in a variable
    const audioContext = audioContextRef.current; // Store the current value in a variable

    return () => {
      // Clean up all audio elements
      sounds.forEach(sound => {
        sound.pause();
        sound.src = '';
        sound.load();
      });
      sounds.clear();

      // Close audio context
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []);

  return {
    loadSound,
    playSound,
    stopSound,
    pauseSound,
    setVolume
  };
};

// Predefined sound URLs (using free sounds from online sources)
export const SOUND_URLS = {
  ambient: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Peaceful ambient sound
  click: 'https://www.soundjay.com/misc/sounds/click-01.wav', // Button click sound
  hover: 'https://www.soundjay.com/misc/sounds/click-02.wav', // Hover sound
  success: 'https://www.soundjay.com/misc/sounds/bell-ringing-01.wav', // Success sound
  // Alternative free sounds from freesound.org or similar
  ambientAlt: '/sounds/ambient-nature.mp3', // Local fallback
  clickAlt: '/sounds/click.mp3', // Local fallback
};
