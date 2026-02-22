import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, pathLength: 0, fill: "rgba(6, 182, 212, 0)" },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(6, 182, 212, 1)",
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        fill: { duration: 1, delay: 1.5 },
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(to bottom right, #020617, #1e1b4b, #000000)",
            "linear-gradient(to bottom right, #000000, #020617, #1e1b4b)",
            "linear-gradient(to bottom right, #1e1b4b, #000000, #020617)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* SM SVG */}
      <div className="relative z-10 mb-12">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <defs>
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d="M 40 30 C 10 30 10 60 40 60 C 70 60 70 90 40 90"
            fill="transparent"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#neon-glow)"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
          />

          <motion.path
            d="M 90 90 L 90 30 L 120 70 L 150 30 L 150 90"
            fill="transparent"
            stroke="#a855f7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow)"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48 h-1 bg-slate-800/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative z-10 mt-4 font-mono text-cyan-400/80 text-sm">
        {progress}%
      </div>
    </motion.div>
  );
};

export default LoadingScreen;