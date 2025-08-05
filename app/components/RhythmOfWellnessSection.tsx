"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import RhythmOfWellnessItem from "./RhythmOfWellnessItem";

const values = [
  {
    name: "Balance",
    icon: "/images/bead-balance.png",
    color: "#EFAF42",
  },
  {
    name: "Nourishment",
    icon: "/images/bead-nourishment.png",
    color: "#D46A6A",
  },
  {
    name: "Community",
    icon: "/images/bead-community.png",
    color: "#4DA167",
  },
  {
    name: "Ancestors",
    icon: "/images/bead-ancestors.png",
    color: "#7C4D1E",
  },
];

const timeline = [
  {
    label: "Ancestral Gathering",
    desc: "Stories, drumming, and shared meals under the baobab.",
    icon: "/images/arti2.png",
  },
  {
    label: "Herbal Wisdom",
    desc: "Healing with calabash, roots, and herbs.",
    icon: "/images/african-mask.png",
  },
  {
    label: "Modern Wellness",
    desc: "Digital tools, mindful eating, and community care.",
    icon: "/images/plant.png",
  },
];

export default function RhythmOfWellnessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setShowCards(true);
        controls.start((i) => ({
          y: 0,
          opacity: 1,
          transition: {
            delay: i * 0.3,
            duration: 0.7,
            type: "spring",
            bounce: 0.4,
          },
        }));
      }, 2000);
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-22 bg-gradient-to-b from-[#FDF6EC] to-[#F8E5D0] overflow-x-hidden"
      id="rhythm-section"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <Image
          src="/images/ink-texture.png"
          alt="Ink Texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto  mb-16">
          <h2
            className="text-3xl md:text-5xl  text-orange-950 font-black mb-8 text-center"
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            Rhythm of Wellness
          </h2>
          <p className="text-lg md:text-2xl text-[#7C4D1E] mb-12 max-w-2xl mx-auto text-center">
            Explore intuitive, African-inspired meal planning—guided by vibe,
            heritage, and time of day.
          </p>
        </div>

        <div className="relative  grid grid-cols-1  sm:grid-cols-3 max-w-6xl mx-auto h-[500px] py-5">
          {timeline.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{
                y: 0,
                x: 0,
                opacity: i === 1 ? 1 : 0,
                zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
                scale: 1.1,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: [0, (i - 1) * 100],
                      y: [0, 0],
                      rotate: [i === 0 ? -8 : i === 2 ? 8 : 0],
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                delay: 1.5 + i * 0.4,
                duration: 1,
                type: "spring",
                bounce: 0.3,
              }}
              className="group  flex flex-col items-center justify-center gap-y-8 bg-purple-50 rounded-3xl  h-[500px]"
            >
              <div className="w-60 h-60 relative ">
                <Image
                  src={item.icon}
                  alt={item.label}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="">
                <h4
                  className="font-bold text-3xl text-[#EFAF42] mb-2"
                  style={{ fontFamily: "Urbanist, sans-serif" }}
                >
                  {item.label}
                </h4>
                <p className="text-[#7C4D1E] text-2xl font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Field/Grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-full overflow-hidden">
        {/* <Image
          src="/images/wheat2.png"
          alt="Grass Field"
          fill
          className="object-cover object-bottom"
          style={{ objectPosition: 'bottom' }}
        /> 
        <div className="absolute inset-0 bg-black/20"></div>  */}
      </div>
    </section>
  );
}
