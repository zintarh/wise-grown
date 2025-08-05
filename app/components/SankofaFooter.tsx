"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WoodButton from './WoodButton';

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

// SVG for Sankofa bird (stylized, head turns on hover)
function SankofaBird({ hovered }: { hovered: boolean }) {
  return (
    <motion.svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline align-middle mr-2"
    >
      {/* Body */}
      <ellipse cx="26" cy="30" rx="16" ry="18" fill="#2F1B0C" />
      {/* Head (animated turn) */}
      <motion.ellipse
        cx={hovered ? 36 : 40}
        cy={hovered ? 12 : 10}
        rx="7"
        ry="7"
        fill="#FFD700"
        animate={{
          rotate: hovered ? -32 : 0,
          x: hovered ? -4 : 0,
          y: hovered ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      />
      {/* Beak */}
      <motion.polygon
        points={hovered ? "43,10 50,14 43,16" : "47,10 52,12 47,14"}
        fill="#EFAF42"
        animate={{
          x: hovered ? -4 : 0,
          y: hovered ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      />
      {/* Eye */}
      <circle cx={hovered ? 38 : 42} cy={hovered ? 13 : 11} r="1.5" fill="#2F1B0C" />
      {/* Tail */}
      <path d="M12 40 Q6 48 18 46" stroke="#FFD700" strokeWidth="3" fill="none" />
    </motion.svg>
  );
}

// SVG for a dancing figurine (simple animated)
function DancingFigurine({ delay }: { delay: number }) {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline mx-1"
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 1.2, delay, repeat: Infinity, repeatType: "loop" }}
    >
      <circle cx="16" cy="8" r="4" fill="#FFD700" />
      <rect x="14" y="12" width="4" height="10" rx="2" fill="#EFAF42" />
      <path d="M16 22 Q10 28 6 24" stroke="#FFD700" strokeWidth="2" fill="none" />
      <path d="M16 22 Q22 28 26 24" stroke="#FFD700" strokeWidth="2" fill="none" />
    </motion.svg>
  );
}

export default function SankofaFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 overflow-hidden" style={{ fontFamily: 'Urbanist, sans-serif' }}>
      {/* Natural wood and earth gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8E5D0] via-[#E6D3B7] to-[#D4B896]" />
        {/* Wood texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/images/wood.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Subtle organic patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" style={{ pointerEvents: 'none' }}>
            <defs>
              <pattern id="leaves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M20,20 Q30,10 40,20 Q30,30 20,20" fill="#8B4513" opacity="0.3" />
                <path d="M60,60 Q70,50 80,60 Q70,70 60,60" fill="#A0522D" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaves)" />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-start">
          
          {/* Brand section with Sankofa bird */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SankofaBird hovered={false} />
              <h3 className="text-xl sm:text-2xl font-bold text-[#2F1B0C] ml-2">WiseGrown</h3>
            </motion.div>
            <p className="text-[#7C4D1E] text-center md:text-left max-w-xs leading-relaxed">
              Reconnecting you with ancestral wisdom through modern wellness tools. 
              A digital sanctuary for holistic nourishment.
            </p>
          </div>
          
          {/* Navigation links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg sm:text-xl font-bold text-[#2F1B0C] mb-4 sm:mb-6">Explore</h4>
            <nav className="flex flex-col gap-3 items-center">
              {footerLinks.map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-[#7C4D1E] hover:text-[#2F1B0C] transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>
          
          {/* Newsletter signup */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg sm:text-xl font-bold text-[#2F1B0C] mb-4">Join Our Circle</h4>
            <p className="text-[#7C4D1E] text-center mb-6 text-sm">
              Get ancestral wisdom and wellness insights delivered to your inbox
            </p>
            <motion.form 
              className="flex flex-col gap-4 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-white/80 border-2 border-[#D4B896] text-[#2F1B0C] placeholder-[#7C4D1E] outline-none focus:border-[#EFAF42] transition-colors duration-200"
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              />
              <WoodButton
                onClick={() => setEmail("")}
                className="w-full"
              >
                Join the Circle
              </WoodButton>
            </motion.form>
          </div>
        </div>
        
        {/* Bottom section */}
        <motion.div 
          className="border-t border-[#D4B896] mt-16 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-[#7C4D1E] text-sm">
            &copy; {new Date().getFullYear()} WiseGrown – Sankofa Space. Honoring the past, nourishing the future.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
