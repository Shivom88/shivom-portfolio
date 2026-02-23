import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-orbitron text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            SM
          </span>
          <span className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Shivom Mishra
          </span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm">
          Built with <Heart className="w-3.5 h-3.5 text-pink-500 mx-1 fill-pink-500" /> and lots of coffee
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: 'https://github.com/' },
            { icon: Linkedin, href: 'https://linkedin.com/' },
            { icon: Mail, href: 'mailto:shivom.mishra@gmail.com' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 text-gray-500 hover:text-cyan-400"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}