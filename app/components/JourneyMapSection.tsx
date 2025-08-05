"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    label: "Discover Your Rhythm",
    desc: "Start your journey by tuning into your unique wellness rhythm.",
    icon: "/images/foot-bare.png",
  },
  {
    label: "Decode Your Plate",
    desc: "Understand your meals and their ancestral roots.",
    icon: "/images/foot-maasai.png",
  },
  {
    label: "Visit the WisePantry",
    desc: "Explore nourishing ingredients and recipes.",
    icon: "/images/foot-slipper.png",
  },
  {
    label: "Nourish Your Lineage",
    desc: "Share and celebrate wellness with your community.",
    icon: "/images/foot-bare.png",
  },
];

export default function JourneyMapSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const trailProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-36 bg-[#F8E5D0] overflow-x-hidden"
      id="journey-map"
    >
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2F1B0C] mb-6 sm:mb-8 text-center"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          Journey Map{" "}
          <span className="text-xl font-bold text-[#EFAF42]">
            – How to Start
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#7C4D1E] mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto text-center">
          Follow the path to your first steps with WiseGrown. Each step is a
          signpost on your journey.
        </p>
        <div className="relative flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto mt-12 sm:mt-20 lg:mt-40">
          {/* Left side cards (first 2 steps) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-0 lg:mr-8 xl:mr-16">
            {steps.slice(0, 2).map((step, i) => {
              const cardColors = [
                'from-[#FFE4E1] to-[#FFC0CB]', // Light pink
                'from-[#E0F6FF] to-[#87CEEB]'  // Light blue
              ];
              const borderColors = [
                'border-[#FF69B4]', // Hot pink
                'border-[#4682B4]'  // Steel blue
              ];
              
              return (
                <motion.div
                  key={step.label}
                  initial={{ 
                    opacity: 0, 
                    x: 0, 
                    y: 0,
                    scale: 0.3,
                    rotate: 0 
                  }}
                  whileInView={{
                    opacity: 1,
                    x: -50,
                    y: 0,
                    scale: 1,
                    rotate: i % 2 === 0 ? -3 : 3,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1 + i * 0.2,
                    type: "spring",
                    bounce: 0.4
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="relative z-10"
                >
                  {/* Sticky Note */}
                  <div className={`bg-gradient-to-br ${cardColors[i]} p-4 sm:p-6 rounded-lg shadow-lg border-l-4 ${borderColors[i]} relative w-full max-w-xs transform rotate-1`}
                       style={{
                         boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1)',
                         transform: 'perspective(600px) rotateX(5deg)',
                       }}>
                    {/* Sticky note tape effect */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#F5DEB3] opacity-60 rounded-sm"></div>
                    
                    {/* Sticky note lift effect at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/10 to-transparent rounded-b-lg"></div>
                    
                    {/* Text content */}
                    <div className="text-center relative z-10">
                      <h3
                        className="text-xl font-bold text-[#2F1B0C] mb-4"
                        style={{
                          fontFamily: "Urbanist, sans-serif",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                        }}
                      >
                        {step.label}
                      </h3>
                      <p
                        className="text-[#5D4E37] text-base leading-relaxed"
                        style={{
                          fontFamily: "Urbanist, sans-serif",
                          lineHeight: "1.6",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tree in Center */}
          <motion.div
            className="mx-4 sm:mx-6 lg:mx-8 flex-shrink-0 z-20 mb-8 lg:mb-0"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1.0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/tree.png"
              alt="Wellness Tree"
              width={300}
              height={375}
              className="object-contain drop-shadow-xl sm:w-[350px] sm:h-[437px] lg:w-[400px] lg:h-[500px]"
            />
          </motion.div>

          {/* Right side cards (last 2 steps) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-8 lg:ml-8 xl:ml-16">
            {steps.slice(2, 4).map((step, i) => {
              const cardColors = [
                'from-[#F0FFF0] to-[#98FB98]', // Light green
                'from-[#FFF8DC] to-[#F0E68C]'  // Light yellow
              ];
              const borderColors = [
                'border-[#32CD32]', // Lime green
                'border-[#DAA520]'  // Goldenrod
              ];
              
              return (
                <motion.div
                  key={step.label}
                  initial={{ 
                    opacity: 0, 
                    x: 0, 
                    y: 0,
                    scale: 0.3,
                    rotate: 0 
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 50,
                    y: 0,
                    scale: 1,
                    rotate: i % 2 === 0 ? -3 : 3,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.4 + i * 0.2,
                    type: "spring",
                    bounce: 0.4
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="relative z-10"
                >
                  {/* Sticky Note */}
                  <div className={`bg-gradient-to-br ${cardColors[i]} p-4 sm:p-6 rounded-lg shadow-lg border-l-4 ${borderColors[i]} relative w-full max-w-xs transform -rotate-1`}
                       style={{
                         boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1)',
                         transform: 'perspective(600px) rotateX(5deg)',
                       }}>
                    {/* Sticky note tape effect */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#F5DEB3] opacity-60 rounded-sm"></div>
                    
                    {/* Sticky note lift effect at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/10 to-transparent rounded-b-lg"></div>
                    
                    {/* Text content */}
                    <div className="text-center relative z-10">
                      <h3
                        className="text-xl font-bold text-[#2F1B0C] mb-4"
                        style={{
                          fontFamily: "Urbanist, sans-serif",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                        }}
                      >
                        {step.label}
                      </h3>
                      <p
                        className="text-[#5D4E37] text-base leading-relaxed"
                        style={{
                          fontFamily: "Urbanist, sans-serif",
                          lineHeight: "1.6",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
