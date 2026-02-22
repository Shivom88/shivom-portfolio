import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

export default function EducationSection() {
  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Amity University',
      location: 'Mumbai, India',
      period: '2023 - 2026',
      status: 'Current',
      gpa: '6.48/10.0',
      highlights: [
        'Information Technology',
      ],
      courses: ['JavaScript', 'Python', 'Software Development', 'Web Development', 'Machine Learning'],
    },
    {
      degree: 'HSC',
      institution: 'KD College',
      location: 'Maharashtra, India',
      period: '2021 - 2023',
      status: 'Completed',
      gpa: '5.0/10.0',
      highlights: [
        'Computer Science Focus',
        'Science Fair Winner',
      ],
      courses: ['IT', 'Maths', 'Physics'],
    },
  ];

  return (
    <section id="education" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/30 via-transparent to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Background</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Education</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden md:block" />

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative md:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-5 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-slate-950 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 overflow-hidden hover:border-indigo-500/30 transition-all duration-500">
                  {/* Header */}
                  <div className="p-6 border-b border-slate-800/50">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-indigo-400" />
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-slate-300">{edu.institution}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {edu.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {edu.period}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          edu.status === 'Current' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-slate-700/50 text-slate-400'
                        }`}>
                          {edu.status}
                        </span>
                        <p className="text-indigo-400 font-semibold mt-2">GPA: {edu.gpa}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    {/* Highlights */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Highlights</h4>
                      <ul className="space-y-2">
                        {edu.highlights.map((highlight) => (
                          <li key={highlight} className="text-slate-300 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Relevant Courses */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Key Courses
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <span
                            key={course}
                            className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded-md text-xs text-slate-400"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
