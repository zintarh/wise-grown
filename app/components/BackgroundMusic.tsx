"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false); // Start unmuted - we'll try to autoplay
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.volume = 0.1;
    audio.loop = true;
    audio.preload = "auto";

    // Event listeners for audio
    const handleLoadedData = () => {
      console.log("Audio loaded successfully");
      setIsLoaded(true);
      attemptAutoplay();
    };

    const handleCanPlay = () => {
      console.log("Audio can play");
      setIsLoaded(true);
      attemptAutoplay();
    };

    const attemptAutoplay = async () => {
      if (autoplayAttempted || !audio || isMuted) return;

      setAutoplayAttempted(true);
      try {
        console.log("Attempting autoplay...");
        await audio.play();
        console.log("Autoplay successful!");
        setIsPlaying(true);
      } catch (error) {
        console.log(
          "Autoplay blocked by browser, user interaction required:",
          error
        );
        // If autoplay fails, set to muted state so user can manually start
        setIsMuted(true);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      console.log("Audio started playing");
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log("Audio paused");
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsLoaded(false);
    };

    // Add event listeners
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    // Check if audio is already loaded (important for page reloads)
    const checkAudioReady = () => {
      if (audio.readyState >= 3) {
        setIsLoaded(true);
        attemptAutoplay();
      } else if (audio.readyState >= 2) {
        console.log("Audio has current data");
        setIsLoaded(true);
        attemptAutoplay();
      } else {
        console.log("Audio readyState:", audio.readyState);
        // Force load if not ready
        audio.load();
      }
    };

    // Check immediately and after a short delay
    checkAudioReady();
    const timeoutId = setTimeout(checkAudioReady, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const toggleMute = async () => {
    const audio = audioRef.current;

  

    if (!audio) {
      console.log("Audio element not found");
      return;
    }

    // Check if audio is ready, if not try to force load
    if (!isLoaded && audio.readyState < 2) {
      console.log("Audio not ready, trying to load...");
      try {
        audio.load();
        // Wait a bit for loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (audio.readyState < 2) {
          console.log("Audio still not ready after load attempt");
          return;
        }
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load audio:", error);
        return;
      }
    }

    if (isMuted) {
      try {
        setIsMuted(false);
        audio.volume = 0.1;

        if (audio.ended) {
          audio.currentTime = 0;
        }

        await audio.play();
        console.log("Audio unmuted and playing");
      } catch (error) {
        console.error("Playback failed:", error);
        // Reset mute state if play failed
        setIsMuted(true);
      }
    } else {
      // Mute
      setIsMuted(true);
      audio.pause();
      console.log("Audio muted");
    }
  };

  return (
    <>
      {/* Audio element with actual sound file */}
      <audio ref={audioRef} loop preload="auto" src="/sound/sound.mp3">
        <source src="/sound/sound.mp3" type="audio/mpeg" />
        <source src="/images/sound/sound.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Mute/Unmute Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="fixed top-40 right-6 z-50 bg-[#8B4513]/80 backdrop-blur-md rounded-full p-3 hover:bg-[#8B4513]/90 transition-all duration-300 border-2 border-[#CD853F] shadow-lg"
        title={isMuted ? "Play Music" : "Pause Music"}
      >
        {isMuted ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        )}
      </motion.button>

      {/* Music indicator */}
      {isPlaying && !isMuted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-32 right-6 z-40 bg-[#8B4513]/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs border border-[#CD853F] shadow-md"
        >
          ♪ African Vibes
        </motion.div>
      )}
    </>
  );
};

export default BackgroundMusic;
