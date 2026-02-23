import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download } from 'lucide-react';

export default function HireMeFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <a
            href="#contact"
            onClick={handleSmoothScroll}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Hire Me
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}