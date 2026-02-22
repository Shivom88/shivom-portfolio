import React from 'react';
import { motion } from 'framer-motion';

export default function ToolsSection() {
  const tools = [
    { name: 'VS Code', icon: '💻', category: 'IDE' },
    { name: 'IntelliJ IDEA', icon: '🔧', category: 'IDE' },
    { name: 'PyCharm', icon: '🐍', category: 'IDE' },
    { name: 'Git', icon: '📂', category: 'Version Control' },
    { name: 'GitHub', icon: '🐙', category: 'Version Control' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'Linux', icon: '🐧', category: 'OS' },
    { name: 'Windows', icon: '🪟', category: 'OS' },
    { name: 'MySQL', icon: '🗄️', category: 'Database' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'Postman', icon: '📮', category: 'API' },
    { name: 'Figma', icon: '🎨', category: 'Design' },
    { name: 'Notion', icon: '📝', category: 'Productivity' },
    { name: 'Slack', icon: '💬', category: 'Communication' },
    { name: 'Jira', icon: '📊', category: 'Project Mgmt' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="tools" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Tools & Technologies</h2>
          <p className="text-slate-400 mt-4">The tools I use to bring ideas to life</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-4 bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 text-center cursor-pointer"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <p className="text-white text-xs font-medium truncate">{tool.name}</p>
              <p className="text-slate-600 text-[10px] mt-1">{tool.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}