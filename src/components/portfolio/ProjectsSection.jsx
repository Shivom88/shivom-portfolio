import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ NEW
import SectionHeader from './SectionHeader';

const projects = [
  {
    id: 'ai-chat-assistant', // ✅ NEW
    title: 'AI Chat Assistant',
    description:
      'An intelligent chatbot powered by machine learning, capable of natural language understanding and contextual responses.',
    tags: ['Python', 'NLP', 'Machine Learning'],
    color: '#00d4ff',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
  {
    id: 'e-commerce-platform', // ✅ NEW
    title: 'E-Commerce Platform',
    description:
      'A full-stack web application with modern UI, payment integration, and real-time inventory management.',
    tags: ['Java', 'Web Design', 'Database'],
    color: '#7c3aed',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    id: 'portfolio-dashboard', // ✅ NEW
    title: 'Portfolio Dashboard',
    description:
      'Interactive data visualization dashboard with real-time analytics and responsive design.',
    tags: ['Web Design', 'JavaScript', 'API'],
    color: '#ec4899',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  {
    id: 'mobile-fitness-app', // ✅ NEW
    title: 'Mobile Fitness App',
    description:
      'Cross-platform fitness tracking application with workout plans, progress tracking, and social features.',
    tags: ['App Design', 'Java', 'UI/UX'],
    color: '#10b981',
    image:
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&h=400&fit=crop',
  },
];

function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="glass-card glow-border rounded-2xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-[0_20px_60px_rgba(0,212,255,0.15)]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />

          {/* 👉 Arrow link (ONLY this is clickable) */}
          <Link
            to={`/projects/${project.id}`} // ✅ NEW
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center
                       bg-black/40 backdrop-blur-sm border border-white/10
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       translate-y-2 group-hover:translate-y-0 hover:scale-110"
            aria-label={`View ${project.title} details`}
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-300"
                style={{
                  borderColor: `${project.color}33`,
                  color: project.color,
                  background: `${project.color}10`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="// PROJECTS"
          title="Featured Work"
          subtitle="A selection of projects that showcase my skills and creativity"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}