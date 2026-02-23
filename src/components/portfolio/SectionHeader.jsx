import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, subtitle }) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
    >
      <p className="font-orbitron text-xs tracking-[0.4em] text-cyan-400/60 mb-3">{label}</p>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {subtitle && <p className="text-gray-500 max-w-lg mx-auto">{subtitle}</p>}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500/50" />
        <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500/50" />
      </div>
    </motion.div>
  );
}