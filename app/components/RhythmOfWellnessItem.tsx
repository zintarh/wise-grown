import React from "react";
import { motion, AnimationControls } from "framer-motion";
import Image from "next/image";

interface RhythmOfWellnessItemProps {
  val: {
    name: string;
    color: string;
    icon: string;
  };
  i: number;
  controls: AnimationControls;
}

const RhythmOfWellnessItem: React.FC<RhythmOfWellnessItemProps> = ({ val, i, controls }) => (
  <motion.div
    key={val.name}
    custom={i}
    initial={{ y: -80, opacity: 0 }}
    animate={controls}
    className="relative flex flex-col items-center"
    style={{ zIndex: 2 }}
  >
 
    <span
      className="text-base font-semibold text-[#7C4D1E] tracking-wide"
      style={{ fontFamily: "Urbanist, sans-serif" }}
    >
      {val.name}
    </span>
  </motion.div>
);

export default RhythmOfWellnessItem;
