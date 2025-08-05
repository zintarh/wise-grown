"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AnimatedImageCard from "./AnimatedImageCard";
import WoodButton from "./WoodButton";

interface HeroSlide {
  id: number;
  phrase: string;
  backgroundColor: string;
  textSide: "left" | "right";
  imageUrl: string;
  imageAlt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    phrase: "NOURISH YOUR ROOTS",
    backgroundColor: "from-orange-500 via-red-500 to-pink-600",
    textSide: "right",
    imageUrl: "/images/roots.png",
    imageAlt: "Nutritious ancestral roots",
  },
  {
    id: 2,
    phrase: "NATURE'S HEALING ",
    backgroundColor: "from-purple-600 via-indigo-600 to-blue-700",
    textSide: "left",
    imageUrl: "/images/plant.png",
    imageAlt: "Nutritious healing plant",
  },
  {
    id: 3,
    phrase: "WHOLESOME NOURISHMENT",
    backgroundColor: "from-amber-500 via-orange-600 to-red-600",
    textSide: "right",
    imageUrl: "/images/calabash.png",
    imageAlt: "Traditional food vessel",
  },
  {
    id: 4,
    phrase: "ANCESTRAL SUPERFOODS",
    backgroundColor: "from-rose-500 via-pink-600 to-purple-700",
    textSide: "left",
    imageUrl: "/images/herbs.png",
    imageAlt: "Nutritious herbs and spices",
  },
  {
    id: 5,
    phrase: "WISDOM OF THE ANCESTORS",
    backgroundColor: "from-green-500 via-teal-600 to-blue-600",
    textSide: "right",
    imageUrl: "/images/powder.png",
    imageAlt: "Ancient healing powders",
  },
  {
    id: 6,
    phrase: "SACRED NOURISHMENT",
    backgroundColor: "from-yellow-500 via-orange-500 to-red-500",
    textSide: "left",
    imageUrl: "/images/rice.png",
    imageAlt: "Sacred grains and seeds",
  },
];

interface StationedArtifact {
  id: number;
  imageUrl: string;
  imageAlt: string;
  position: string;
  rotation: number;
  size: {
    width: number;
    height: number;
  };
  delay: number;
  opacity: number;
}

const stationedArtifacts: StationedArtifact[] = [
  {
    id: 1,
    imageUrl: "/images/powder.png",
    imageAlt: "Ancestral Roots",
    position: "top-20 left-8 sm:left-16",
    rotation: -10,
    size: { width: 80, height: 80 },
    delay: 0.5,
    opacity: 0.2,
  },
  {
    id: 2,
    imageUrl: "/images/arti1.png",
    imageAlt: "Healing Plant",
    position: "top-32 right-8 sm:right-16",
    rotation: 15,
    size: { width: 90, height: 90 },
    delay: 0.8,
    opacity: 0.2,
  },
  {
    id: 3,
    imageUrl: "/images/calabash.png",
    imageAlt: "Traditional Vessel",
    position: "bottom-32 left-12 sm:left-20",
    rotation: 20,
    size: { width: 85, height: 85 },
    delay: 1.1,
    opacity: 0.2,
  },
  {
    id: 4,
    imageUrl: "/images/arti2.png",
    imageAlt: "Ancestral Herbs",
    position: "bottom-20 right-12 sm:right-20",
    rotation: -15,
    size: { width: 75, height: 75 },
    delay: 1.4,
    opacity: 0.4,
  },
  {
    id: 5,
    imageUrl: "/images/drum.png",
    imageAlt: "Ancestral Powder",
    position: "top-1/2 left-4 sm:left-8 transform -translate-y-1/2",
    rotation: 8,
    size: { width: 70, height: 70 },
    delay: 1.7,
    opacity: 0.2,
  },
  {
    id: 6,
    imageUrl: "/images/african-mask.png",
    imageAlt: "Ancestral Grains",
    position: "top-1/2 right-4 sm:right-8 transform -translate-y-1/2",
    rotation: -10,
    size: { width: 70, height: 70 },
    delay: 2.0,
    opacity: 0.2,
  },
];

export default function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const slide = useMemo(() => heroSlides[phraseIndex], [phraseIndex]);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = stationedArtifacts.slice(0, 4).map((artifact) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = artifact.imageUrl;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn("Some images failed to preload:", error);
        setImagesLoaded(true); // Still show the component
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FDF6EC] to-[#F8E5D0]">
      
      {/* Stationed Artifact Images */}
      {stationedArtifacts.map((artifact, index) => (
        <motion.div
          key={artifact.id}
          className={`absolute ${
            artifact.position
          } pointer-events-none z-0 hidden ${
            artifact.id <= 4 ? "sm:block" : "lg:block"
          }`}
          initial={{ opacity: 0, scale: 0.8, rotate: artifact.rotation - 5 }}
          animate={{
            opacity: imagesLoaded ? artifact.opacity : 0,
            scale: imagesLoaded ? 1 : 0.8,
            rotate: artifact.rotation,
          }}
          transition={{
            duration: 1.2,
            delay: imagesLoaded ? artifact.delay : 0,
          }}
        >
          <Image
            src={artifact.imageUrl}
            alt={artifact.imageAlt}
            width={artifact.size.width}
            height={artifact.size.height}
            className="object-contain drop-shadow-lg md:w-[110px] md:h-[90px] lg:w-[80px] lg:h-[80px]"
            loading={index < 4 ? "eager" : "lazy"}
            priority={index < 2}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 110px, 80px"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 min-h-screen flex items-center py-8 sm:py-12 pt-36">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 ">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-40 items-center `}
          >
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="  w-full flex flex-col items-start justify-center"
            >
             <div className="max-w-2xl">
             <motion.h1
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  type: "spring",
                  bounce: 0.3,
                }}
                className=" inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl mb-8 text-orange-950 font-black"
                style={{
                  fontFamily: "Urbanist, sans-serif",
                  background:
                    "linear-gradient(45deg, #FFD700, #FF4500, #FF6347, #FFD700)",
                  backgroundClip: "text",
                  textTransform: "capitalize",
                }}
              >
                <span className=" transform hover:scale-105 transition-transform duration-300">
                  {heroSlides[phraseIndex].phrase
                    .split(",")
                    .map((word, index) => (
                      <motion.span
                        key={index}
                        
                        className=" inline-block hover:scale-110 transition-transform duration-200"
                        style={{
                          filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.4))",
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                </span>
              </motion.h1>
             </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <WoodButton
                  size="lg"
                  className="text-lg font-semibold px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                  aria-label="Start your wellness journey with Wisegrown"
                >
                  Begin Your Journey
                </WoodButton>
              </motion.div>
            </motion.div>

            <AnimatedImageCard textSide={slide.textSide} />
          </div>
        </div>
      </div>
    </section>
  );
}
