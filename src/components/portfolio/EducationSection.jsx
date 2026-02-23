import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="// EDUCATION"
          title="Academic Journey"
          subtitle="The foundation of my technical knowledge"
        />

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

          {/* Education card */}
          <div className="relative ml-16 md:ml-0 md:w-1/2 md:ml-auto md:pl-12">
            {/* Timeline dot */}
            <div className="absolute left-[-2.55rem] md:left-[-1.55rem] top-8 w-5 h-5 rounded-full border-2 border-cyan-400 bg-[#0a0a0f] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <div className="glass-card glow-border rounded-2xl p-8 group hover:border-cyan-400/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Bachelor of Science</h3>
                  <p className="text-cyan-400 font-medium">in Information Technology</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <span>Currently Pursuing</span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                Focused on software development, data structures & algorithms, database management, 
                networking, and web technologies. Building a strong foundation in both theory and 
                practical application of IT concepts.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Data Structures', 'Algorithms', 'Databases', 'Networking', 'Web Dev', 'OS'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}