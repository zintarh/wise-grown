"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import WoodButton from "./WoodButton";
import { useSoundContext } from "./SoundProvider";

const samplePlates = [
  {
    name: "Fulani Millet Bowl",
    img: "/images/food1.png",
    desc: "This dish has Fulani origins with grounding millet and high-fiber greens.",
    roots: [
      { glyph: "/images/glyph-millet.png", label: "Grounding Millet", info: "Rich in fiber, supports digestion." },
      { glyph: "/images/glyph-greens.png", label: "High-Fiber Greens", info: "Boosts immunity and gut health." },
    ],
  },
  {
    name: "Yoruba Egusi Plate",
    img: "/images/food.png",
    desc: "Yoruba-inspired: energizing egusi seeds, plantain, and okra for balance.",
    roots: [
      { glyph: "/images/glyph-egusi.png", label: "Egusi Seeds", info: "Protein-rich, supports energy." },
      { glyph: "/images/glyph-plantain.png", label: "Plantain", info: "Potassium and fiber for heart health." },
      { glyph: "/images/glyph-okra.png", label: "Okra", info: "Antioxidants, supports digestion." },
    ],
  },
];

export default function AncestralPlateDecoderSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [beads, setBeads] = useState(0);
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedRoots, setDecodedRoots] = useState<any[]>([]);
  const { playClickSound, playHoverSound, playSuccessSound } = useSoundContext();

  function handleDecode(idx: number) {
    playClickSound();
    setSelected(idx);
    setIsDecoding(true);
    
    setTimeout(() => {
      setDecodedRoots(samplePlates[idx].roots);
      setIsDecoding(false);
      playSuccessSound(); // Play success sound when decoding completes
    }, 3000);
  }

  const handleCardHover = () => {
    playHoverSound();
  };

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploaded(url);
      setSelected(null);
      setBeads(beads + 1);
    }
  }

  const uploadedRoots = [
    { glyph: "/images/glyph-millet.png", label: "Millet", info: "Grounding, rich in fiber." },
    { glyph: "/images/glyph-greens.png", label: "Greens", info: "High in nutrients." },
    { glyph: "/images/glyph-egusi.png", label: "Egusi", info: "Energizing seeds." },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#F8E5D0] to-[#FDF6EC] overflow-x-hidden" id="plate-decoder">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
        <Image src="/images/african-frame.png" alt="African Frame" fill className="object-cover" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-5xl  text-orange-950 font-black mb-8 text-center"
          style={{ fontFamily: "Urbanist, sans-serif" }} >
           Ancestral Plate Decoder™️
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#7C4D1E] mb-8 sm:mb-10 max-w-2xl mx-auto">
          Upload or select a plate to discover its ancestral roots and nutritional wisdom.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-1 items-center py-8 sm:py-12 lg:py-20">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1.4 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative animate"
            >
              <Image 
                src="/images/drum.png" 
                alt="Ancestral Wood Texture" 
                width={300} 
                height={225} 
                className="object-contain sm:w-[350px] sm:h-[262px] lg:w-[450px] lg:h-[450px]"
              />
            </motion.div>
          </div>
          
          <div className=" col-span-2 flex flex-col justify-start items-center gap-y-6 sm:gap-8">
            <WoodButton>Upload Your Plate</WoodButton>
            <span className="text-[#B99B6B] font-bold">or</span>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {samplePlates.map((plate, i) => (
                <motion.div
                  key={plate.name}
                  initial={{ opacity: 0, y: 20, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(239, 175, 66, 0.3), 0 0 0 2px rgba(239, 175, 66, 0.5)",
                    y: -10
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex flex-col justify-center items-center rounded-3xl overflow-hidden w-[150px] h-[200px] sm:w-[180px] sm:h-[240px] lg:w-[280px] lg:h-[350px] cursor-pointer transform-gpu perspective-1000 ${
                    selected === i ? 'ring-4 ring-[#EFAF42] ring-opacity-70' : ''
                  }`}
                  onClick={() => handleDecode(i)}
                  onMouseEnter={handleCardHover}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,229,208,0.9) 50%, rgba(239,175,66,0.1) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                  }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EFAF42]/10 via-transparent to-[#7C4D1E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-[#EFAF42]/30 rounded-full animate-pulse" />
                    <div className="absolute top-8 right-6 w-1 h-1 bg-[#7C4D1E]/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#EFAF42]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>

                  {/* Image container with enhanced styling */}
                  <div className="relative z-10 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="relative">
                      <Image 
                        src={plate.img} 
                        alt={plate.name} 
                        width={200} 
                        height={200} 
                        className="rounded-2xl sm:w-[140px] sm:h-[140px] lg:w-[200px] lg:h-[200px] object-contain" 
                      />
                      {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                    </div>
                  </div>

                  {/* Enhanced text styling */}
                  <div className="relative z-10 text-center px-3">
                    <div 
                      className="font-black text-orange-950 text-sm sm:text-base lg:text-lg mb-1 group-hover:text-[#EFAF42] transition-colors duration-300" 
                      style={{fontFamily: 'Urbanist, sans-serif'}}
                    >
                      {plate.name}
                    </div>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#EFAF42] to-[#7C4D1E] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Selection indicator */}
                  {selected === i && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 bg-[#EFAF42] rounded-full flex items-center justify-center shadow-lg"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
       
        {/* <AnimatePresence mode="wait">
          {(selected !== null || uploaded) && (
            <motion.div
              key={selected ?? uploaded}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative mx-auto mt-8 mb-10 max-w-lg bg-white/95 rounded-3xl shadow-2xl px-8 py-10 border-4 border-[#FFD700]"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <Image
                    src={uploaded || (selected !== null ? samplePlates[selected].img : "")}
                    alt="Decoded Plate"
                    width={180}
                    height={180}
                    className="rounded-2xl border-4 border-[#EFAF42]"
                  />
                  <div className="absolute inset-0 pointer-events-none">
                    {(uploaded ? uploadedRoots : samplePlates[selected!].roots).map((root, i) => (
                      <motion.div
                        key={root.label}
                        animate={{
                          x: 70 * Math.cos((i / (uploaded ? uploadedRoots.length : samplePlates[selected!].roots.length)) * 2 * Math.PI),
                          y: 70 * Math.sin((i / (uploaded ? uploadedRoots.length : samplePlates[selected!].roots.length)) * 2 * Math.PI),
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 7 - i, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ zIndex: 2 }}
                      >
                        <Image src={root.glyph} alt={root.label} width={48} height={48} />
                        <div className="text-xs text-[#7C4D1E] font-semibold mt-1 text-center" style={{fontFamily: 'Urbanist, sans-serif'}}>{root.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="text-lg text-[#2F1B0C] font-bold mb-2" style={{fontFamily: 'Urbanist, sans-serif'}}>
                  {uploaded ? "Your uploaded plate" : samplePlates[selected!].name}
                </div>
                <div className="text-base text-[#7C4D1E] mb-4">
                  {uploaded ? "This plate is rich in ancestral grains and greens." : samplePlates[selected!].desc}
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {(uploaded ? uploadedRoots : samplePlates[selected!].roots).map((root, i) => (
                    <motion.div
                      key={root.label}
                      whileHover={{ scale: 1.1, background: "#FFD700" }}
                      className="rounded-xl bg-[#FDF6EC] border-2 border-[#FFD700] px-4 py-2 text-[#2F1B0C] font-medium text-sm shadow"
                    >
                      <div className="font-bold text-[#EFAF42]">{root.label}</div>
                      <div>{root.info}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-[#EFAF42] font-bold text-lg">
                  <span role="img" aria-label="bead">🧿</span> Digital Beads Earned: {beads}
                </div>
                <motion.a
                  href={uploaded || (selected !== null ? samplePlates[selected].img : "")}
                  download
                  whileHover={{ rotate: 2, scale: 1.08, background: "linear-gradient(90deg,#FFD700,#EFAF42)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-10 py-5 rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 bg-gradient-to-r from-[#FFD700] via-[#EFAF42] to-[#B99B6B] text-[#2F1B0C] border-4 border-[#FFD700] mt-6 tracking-wide relative"
                  style={{ fontFamily: 'Urbanist, sans-serif', letterSpacing: '0.03em', boxShadow: '0 6px 16px rgba(0,0,0,0.09)' }}
                >
                  <span className="absolute left-3 -top-3 rotate-[-12deg] text-2xl">🖼️</span>
                  Download or Share Your Plate
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </section>
  );
}
