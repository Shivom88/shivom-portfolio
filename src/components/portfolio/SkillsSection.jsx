import React from 'react';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 90, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Java', level: 85, color: 'from-red-400 to-orange-500' },
        { name: 'JavaScript', level: 80, color: 'from-yellow-300 to-yellow-500' },
        { name: 'SQL', level: 75, color: 'from-blue-400 to-blue-600' },
      ],
    },
    {
      title: 'Web Technologies',
      skills: [
        { name: 'HTML5', level: 95, color: 'from-orange-400 to-red-500' },
        { name: 'CSS3', level: 90, color: 'from-blue-400 to-indigo-500' },
        { name: 'React', level: 75, color: 'from-cyan-400 to-blue-500' },
        { name: 'Tailwind CSS', level: 85, color: 'from-teal-400 to-cyan-500' },
      ],
    },
    {
      title: 'Backend & Databases',
      skills: [
        { name: 'Flask', level: 80, color: 'from-slate-400 to-slate-600' },
        { name: 'Django', level: 70, color: 'from-green-400 to-emerald-600' },
        { name: 'MySQL', level: 85, color: 'from-blue-500 to-blue-700' },
        { name: 'REST APIs', level: 80, color: 'from-purple-400 to-purple-600' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/50 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Technical Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-500"
            >
              <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: catIndex * 0.2 + skillIndex * 0.1 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}