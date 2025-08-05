'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define background colors for each section
const sectionBackgrounds = {
  hero: 'linear-gradient(135deg, #FDF6EC 0%, #F8E5D0 50%, #E6D3B7 100%)',
  rhythm: 'linear-gradient(135deg, #E8F5E8 0%, #D4F1D4 50%, #C0E6C0 100%)',
  meal: 'linear-gradient(135deg, #FFF8DC 0%, #F5E6A3 50%, #E6D68A 100%)',
  decoder: 'linear-gradient(135deg, #F8E5D0 0%, #FDF6EC 50%, #E6D3B7 100%)',
  journey: 'linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 50%, #DDA0DD 100%)',
};

const DynamicBackground = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', element: document.querySelector('main > section:nth-child(1)') },
        { id: 'rhythm', element: document.querySelector('#rhythm-section') },
        { id: 'meal', element: document.querySelector('#meal-matrix') },
        { id: 'decoder', element: document.querySelector('#plate-decoder') },
        { id: 'journey', element: document.querySelector('#journey-map') },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{
        background: sectionBackgrounds[currentSection as keyof typeof sectionBackgrounds],
      }}
      animate={{
        background: sectionBackgrounds[currentSection as keyof typeof sectionBackgrounds],
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
    />
  );
};

export default DynamicBackground;
