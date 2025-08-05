"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "../fonts/handwriting.css";

const ingredients = [
  {
    name: "Moringa",
    img: "/images/rice.png",
    vibe: "Energizing",
    ancestor: "Yoruba",
    times: ["Morning", "Afternoon"],
  },
  {
    name: "Plantain",
    img: "/images/wheat.png",
    vibe: "Grounding",
    ancestor: "Wolof",
    times: ["Afternoon", "Evening"],
  },
  {
    name: "Fonio",
    img: "/images/powder.png",
    vibe: "Grounding",
    ancestor: "Akan",
    times: ["Morning", "Afternoon"],
  },
  {
    name: "Egusi",
    img: "/images/roots.png",
    vibe: "Energizing",
    ancestor: "Yoruba",
    times: ["Afternoon", "Evening"],
  },
  {
    name: "Okra",
    img: "/images/rice.png",
    vibe: "Grounding",
    ancestor: "Zulu",
    times: ["Evening"],
  },
  {
    name: "Baobab",
    img: "/images/african-mask.png",
    vibe: "Energizing",
    ancestor: "Wolof",
    times: ["Morning"],
  },
];

const patterns = [
  "/images/ankara-pattern.png",
  "/images/kente-pattern.png",
  "/images/mudcloth-pattern.png",
];

export default function MealMatrixSection() {
  const [vibe, setVibe] = useState<string | null>(null);
  const [ancestor, setAncestor] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const filtered = ingredients.filter(
    (ing) =>
      (!vibe || ing.vibe === vibe) &&
      (!ancestor || ing.ancestor === ancestor) &&
      (!time || ing.times.includes(time))
  );

  return (
    <section
      id="meal-matrix"
      className="relative py-32 bg-[#FDF6EC] overflow-x-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl md:text-5xl  text-orange-950 font-black mb-8 text-center"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          Mix-and-Match Meal Matrix™️
        </h2>
        <p className="text-lg md:text-2xl text-[#7C4D1E] mb-12 max-w-2xl mx-auto text-center">
          Explore intuitive, African-inspired meal planning—guided by vibe,
          heritage, and time of day.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {filtered.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 20, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.2,
                delay: i * 0.5,
                type: "spring",
                bounce: 0.35,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 32px #EFAF42aa",
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative rounded-2xl h-[400px] overflow-hidden cursor-pointer"
            >
              <Image
                src={ing.img}
                alt={ing.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:-translate-1/8 group-hover:transform-3d "
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

              <motion.div
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg sr-only group-hover:not-sr-only group-hover:scale-3d group-hover:translate-y-2.5 group-hover:animate-pulse"
                 
                >
                  {ing.name}
                </motion.h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
