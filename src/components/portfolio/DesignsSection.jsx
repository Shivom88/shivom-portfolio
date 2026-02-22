import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Palette } from 'lucide-react';

export default function DesignsSection() {
  const designs = [
    {
      title: 'SaaS Dashboard',
      description: 'Modern analytics dashboard with dark theme and data visualization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      category: 'Web App',
    },
    {
      title: 'E-Learning Platform',
      description: 'Clean educational platform with intuitive course navigation',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
      category: 'Website',
    },
    {
      title: 'Finance Mobile App',
      description: 'Sleek banking interface with seamless transaction flows',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
      category: 'Mobile',
    },
    {
      title: 'Portfolio Template',
      description: 'Minimalist portfolio design for creative professionals',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop',
      category: 'Website',
    },
  ];

  const stats = [
    { icon: Monitor, value: '15+', label: 'Web Designs' },
    { icon: Smartphone, value: '8+', label: 'Mobile Designs' },
    { icon: Palette, value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="designs" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-950/30 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">UI/UX Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Design Showcase</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Beautiful, responsive interfaces crafted with attention to detail and user experience.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Design Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {designs.map((design, index) => (
            <motion.div
              key={design.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium mb-3">
                    {design.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">{design.title}</h3>
                  <p className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {design.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-2xl transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
