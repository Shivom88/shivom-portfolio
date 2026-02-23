import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Palette, Rocket } from 'lucide-react';
import SectionHeader from './SectionHeader';
import GlassCard from './GlassCard';

const highlights = [
  { icon: Code2, label: 'Clean Code', desc: 'Writing elegant, maintainable solutions' },
  { icon: Cpu, label: 'Tech Savvy', desc: 'Passionate about emerging technologies' },
  { icon: Palette, label: 'Creative Eye', desc: 'Blending design with functionality' },
  { icon: Rocket, label: 'Fast Learner', desc: 'Always exploring new frameworks & tools' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="// ABOUT"
          title="About Me"
          subtitle="A glimpse into who I am and what drives me"
        />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm <span className="text-cyan-400 font-semibold">Shivom Mishra</span>, an Information Technology student 
                with a deep passion for building digital experiences that are both beautiful and functional.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                My journey in tech started with curiosity about how software shapes the world around us. 
                Today, I channel that curiosity into creating applications, exploring new technologies, 
                and pushing the boundaries of what's possible with code.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I'm not coding, you'll find me exploring the latest in AI, contributing to open-source 
                projects, or experimenting with creative design.
              </p>
            </GlassCard>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <GlassCard key={item.label} delay={i * 0.1} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.label}</h3>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}