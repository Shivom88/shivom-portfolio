import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Smart Attendance System',
      description: 'ML-based facial recognition system for automated attendance tracking with real-time notifications and analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      tech: ['Python', 'OpenCV', 'Flask', 'MySQL'],
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack web application with user authentication, product management, shopping cart, and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, kanban boards, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      tech: ['Python', 'Django', 'JavaScript', 'SQLite'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather application with location-based forecasts, historical data visualization, and alerts.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      tech: ['JavaScript', 'API', 'HTML/CSS', 'Chart.js'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Student Portal System',
      description: 'Comprehensive academic management system with course registration, grade tracking, and communication tools.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
      tech: ['Java', 'MySQL', 'JSP', 'Bootstrap'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Chat Application',
      description: 'Real-time messaging platform with group chats, file sharing, and end-to-end encryption.',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop',
      tech: ['Python', 'WebSocket', 'Redis', 'MongoDB'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Featured Projects</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in software development, web design, and problem-solving.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-800/50 hover:border-indigo-500/50 transition-all duration-500 ${
                project.featured ? 'md:col-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <a
                    href={project.github}
                    className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-indigo-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demo}
                    className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-indigo-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {project.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-xs font-medium text-white">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded-md text-xs text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          
        </motion.div>
      </div>
    </section>
  );
}