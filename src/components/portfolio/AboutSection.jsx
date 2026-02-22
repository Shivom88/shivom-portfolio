import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Laptop, Lightbulb, Rocket } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    { icon: Code2, label: 'Clean Code', desc: 'Writing maintainable solutions' },
    { icon: Laptop, label: 'Web Dev', desc: 'Full-stack development' },
    { icon: Lightbulb, label: 'Innovation', desc: 'Creative problem solving' },
    { icon: Rocket, label: 'Growth', desc: 'Continuous learning' },
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Who I Am</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl rotate-6 opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl -rotate-3 opacity-30" />
              <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">SM</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {highlights.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30"
                      >
                        <item.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">{item.label}</p>
                        <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm a passionate <span className="text-indigo-400 font-semibold">Information Technology student</span> with 
              a strong foundation in software development and web technologies. My journey in tech started with curiosity 
              about how digital solutions can transform everyday problems into elegant solutions.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Specializing in <span className="text-purple-400">Python</span> and <span className="text-cyan-400">Java</span>, 
              I've developed a keen eye for writing clean, efficient code. My experience spans from building responsive 
              web applications to developing backend systems that scale.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Beyond coding, I'm fascinated by modern UI/UX design principles. I believe that great software isn't just 
              about functionality—it's about creating experiences that users love. This drives me to continuously learn 
              and stay updated with the latest industry trends.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              {['Problem Solver', 'Team Player', 'Quick Learner', 'Detail Oriented'].map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}