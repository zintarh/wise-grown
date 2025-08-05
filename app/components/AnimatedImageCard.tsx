import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import WoodCard from "./WoodCard";

// Import heroSlides from HeroSection or define here for image stacking
const heroSlides = [
  {
    imageUrl: "/images/powder.png",
    imageAlt: "Nutritious ancestral roots",
  },
  {
    imageUrl: "/images/rice.png",
    imageAlt: "Nutritious healing plant",
  },
  {
    imageUrl: "/images/roots.png",
    imageAlt: "Traditional food vessel",
  },

  {
    imageUrl: "/images/herbs.png",
    imageAlt: "Traditional food vessel",
  },
];

export type AnimatedImageCardProps = {
  imageUrl?: string;
  imageAlt?: string;
  textSide?: "left" | "right";
  currentSlide?: number | string;
};

const AnimatedImageCard: React.FC<AnimatedImageCardProps> = ({
  textSide = "right",
  currentSlide,
}) => (
  <motion.div
    key={`image-${currentSlide}`}
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      duration: 1.2,
      delay: 0.6,
      type: "spring",
      bounce: 0.3,
    }}
    className={`${
      textSide === "left" ? "lg:col-start-2" : ""
    } flex items-center justify-center relative`}
  >
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px]">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{
          opacity: 0,
          scale: 0.6,
          rotate: 1,
          x: 4,
          y: -4,
          zIndex: 20,
        }}
        animate={{
          opacity: 0.95,
          scale: 1.9,
          rotate: 1,

          zIndex: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: "easeOut",
        }}
        style={{
          mixBlendMode: "normal",
        }}
      >
        <Image
          src="/images/hero.png"
          alt={"roots"}
          fill
          className="object-contain drop-shadow-lg"
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 500px"
        />
      </motion.div>

     

     
    </div>
  </motion.div>
);

export default AnimatedImageCard;
