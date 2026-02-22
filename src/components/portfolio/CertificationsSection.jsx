import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Star } from 'lucide-react';

export default function CertificationsSection() {
  const certifications = [
    {
      title: 'Python Development',
      issuer: 'Codveda',
      date: '2025',
      icon: Award,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI internship Program',
      issuer: 'Agnirva',
      date: '2025',
      icon: Medal,
      color: 'from-red-500 to-orange-500',
    },
    {
      title: 'Web Development Bootcamp',
      issuer: 'Udemy',
      date: '2023',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Git & GitHub Mastery',
      issuer: 'LinkedIn Learning',
      date: '2023',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const achievements = [
    { title: 'Dean\'s List', desc: 'Academic Excellence 2023-24' },
    { title: 'Hackathon Winner', desc: '1st Place - TechFest 2024' },
    { title: 'Best Project Award', desc: 'Smart Attendance System' },
    { title: 'Open Source Contributor', desc: '50+ Contributions' },
  ];

  return (
    <section id="certifications" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Recognition</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Certifications & Achievements</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-4 bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                      <cert.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{cert.title}</h4>
                    <p className="text-slate-500 text-sm">{cert.issuer}</p>
                  </div>
                  <span className="text-slate-600 text-sm">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-800/50 hover:border-yellow-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                  <p className="text-slate-500 text-xs mt-1">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}