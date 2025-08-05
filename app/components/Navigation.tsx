"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WoodButton from "./WoodButton";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Wisdom", href: "#wisdom" },
    { name: "Nutrition", href: "#nutrition" },
    { name: "Heritage", href: "#heritage" },
    { name: "Waitlist", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-100 bg-gradient-to-br from-white/95 to-[#F8E5D0]/90  border-b shadow-"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <h1 
              className="text-4xl font-black text-[#7C4D1E] drop-shadow-sm"
            >
              WiseGrown
            </h1>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  color: "#ffffff",
                }}
                className="text-[#7C4D1E] hover:text-[#EFAF42] text-lg font-semibold transition-all duration-300 relative group drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              >
                {item.name}
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EFAF42] to-[#7C4D1E] rounded-full group-hover:w-full transition-all duration-300 drop-shadow-[0_1px_3px_rgba(239,175,66,0.5)]"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <WoodButton 
              size="sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Start Journey
            </WoodButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gradient-to-br from-[#7C4D1E]/10 to-[#EFAF42]/10 backdrop-blur-md border border-[#7C4D1E]/20 shadow-md transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-6 h-6 text-[#7C4D1E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden rounded-lg mt-2 mb-4 bg-gradient-to-br from-white/95 to-[#F8E5D0]/90 backdrop-blur-2xl border border-[#7C4D1E]/20 shadow-2xl shadow-black/10"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-[#7C4D1E] hover:text-[#EFAF42] font-medium rounded-lg transition-all duration-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] hover:bg-gradient-to-br hover:from-[#EFAF42]/10 hover:to-[#7C4D1E]/5"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <WoodButton
                  size="sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  className="w-full mt-2"
                >
                  Start Journey
                </WoodButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
