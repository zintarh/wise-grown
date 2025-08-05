import React from "react";
import { motion, MotionProps } from "framer-motion";

interface WoodCardProps extends MotionProps {
  positionClass: string; // e.g. "top-0 left-0"
  bgColor: string; // e.g. "bg-yellow-100"
  rotate?: number;
  delay?: number;
  children: React.ReactNode;
  widthClass?: string; // e.g. "w-32"
}

const WoodCard: React.FC<WoodCardProps> = ({
  positionClass,
  bgColor,
  rotate = 0,
  delay = 0,
  children,
  widthClass = "w-22",
  ...motionProps
}) => (
  <motion.div
    className={`absolute ${positionClass} ${bgColor} ${widthClass} px-4 py-2 rounded-xl shadow-xl flex items-center justify-center select-none`}
    style={{ rotate }}
    initial={{ opacity: 0, rotate }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ delay, duration: 0.8 }}
    {...motionProps}
  >
    {children}
  </motion.div>
);

export default WoodCard;
