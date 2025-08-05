"use client";
import { motion } from "framer-motion";

interface StackedBackgroundsProps {
  colors: string[]; // e.g. ['#FFD700', '#EFAF42', '#D46A6A']
  visible: boolean;
}

export default function StackedBackgrounds({ colors, visible }: StackedBackgroundsProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
      {colors.map((color, i) => (
        <motion.div
          key={color}
          initial={{ y: 80 * (colors.length - i), opacity: 0 }}
          animate={visible ? { y: 0, opacity: 0.95 - i * 0.2 } : { y: 80 * (colors.length - i), opacity: 0 }}
          transition={{ delay: 0.2 + i * 0.18, duration: 0.7, type: "spring", bounce: 0.28 }}
          className="absolute left-0 right-0 mx-auto rounded-3xl shadow-2xl"
          style={{
            top: `${i * 18}px`,
            bottom: `${i * 18}px`,
            background: color,
            zIndex: i,
            width: '90%',
            filter: `blur(${i * 2}px)`
          }}
        />
      ))}
    </div>
  );
}
