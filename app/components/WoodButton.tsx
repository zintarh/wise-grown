import React from "react";
import { motion, MotionProps } from "framer-motion";
import { useSoundContext } from "./SoundProvider";

interface WoodButtonProps extends MotionProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const WoodButton: React.FC<WoodButtonProps> = ({
  children,
  onClick,
  className = "",
  size = "md",
  disabled = false,
  ...motionProps
}) => {
  const { playClickSound, playHoverSound } = useSoundContext();

  const handleClick = () => {
    if (!disabled && onClick) {
      playClickSound();
      onClick();
    }
  };

  const handleHover = () => {
    if (!disabled) {
      playHoverSound();
    }
  };
  const sizeClasses = {
    sm: "px-6 py-3 text-sm lg:text-base",
    md: "px-12 py-6 text-xl lg:text-2xl",
    lg: "px-16 py-8 text-2xl lg:text-3xl",
  };

  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.1,
        boxShadow: disabled 
          ? "0 10px 30px rgba(139,69,19,0.2)" 
          : "0 20px 40px rgba(139,69,19,0.5)",
        y: disabled ? 0 : -5,
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={`
        text-white rounded-full font-bold transition-all duration-300 shadow-2xl 
        hover:shadow-amber-500/30 border-2 border-amber-600
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      style={{
        fontFamily: "Urbanist, sans-serif",
        backgroundImage: `url('/images/wood.png'), linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)`,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply, normal',
        boxShadow: "0 10px 30px rgba(139,69,19,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
      }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};

export default WoodButton;
