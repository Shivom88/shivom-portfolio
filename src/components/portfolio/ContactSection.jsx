import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, Send } from 'lucide-react';
import SectionHeader from './SectionHeader';

function ContactIcon3D({ color, iconType }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(80, 80);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const threeColor = new THREE.Color(color);

    let geo;
    if (iconType === 'mail') {
      geo = new THREE.BoxGeometry(1.2, 0.8, 0.1);
    } else if (iconType === 'github') {
      geo = new THREE.OctahedronGeometry(0.7, 1);
    } else {
      geo = new THREE.DodecahedronGeometry(0.7, 0);
    }

    const mat = new THREE.MeshPhongMaterial({
      color: threeColor,
      emissive: threeColor,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Glow ring
    const ringGeo = new THREE.TorusGeometry(1, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: threeColor, transparent: true, opacity: 0.3 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    scene.add(new THREE.AmbientLight(0x222244, 0.5));
    const light = new THREE.PointLight(threeColor, 1.5, 10);
    light.position.set(2, 2, 3);
    scene.add(light);

    let time = 0;
    let animId;
    const animate = () => {
      time += 0.01;
      mesh.rotation.y = time;
      mesh.rotation.x = Math.sin(time * 0.5) * 0.3;
      ring.rotation.x = time * 0.5;
      ring.rotation.z = time * 0.3;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [color, iconType]);

  return <canvas ref={canvasRef} width={80} height={80} className="w-20 h-20" />;
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'shivom.mishra@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contacts = [
    {
      icon: Mail,
      iconType: 'mail',
      label: 'Gmail',
      value: email,
      color: '#ea4335',
      href: `mailto:${email}`,
      action: 'Open Mail',
    },
    {
      icon: Github,
      iconType: 'github',
      label: 'GitHub',
      value: 'github.com/shivom-mishra',
      color: '#ffffff',
      href: 'https://github.com/',
      action: 'Visit Profile',
    },
    {
      icon: Linkedin,
      iconType: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/shivom-mishra',
      color: '#0a66c2',
      href: 'https://linkedin.com/',
      action: 'Connect',
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="// CONTACT"
          title="Let's Connect"
          subtitle="Ready to collaborate? Let's build something amazing together."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.label !== 'Gmail' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="glass-card glow-border rounded-2xl p-6 text-center group hover:border-white/20 transition-all duration-500 block"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <div className="flex justify-center mb-4">
                <ContactIcon3D color={contact.color} iconType={contact.iconType} />
              </div>
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ background: `${contact.color}15` }}>
                <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">{contact.label}</h3>
              <p className="text-gray-500 text-xs mb-4 truncate">{contact.value}</p>
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 group-hover:scale-105"
                style={{
                  borderColor: `${contact.color}40`,
                  color: contact.color,
                  background: `${contact.color}10`,
                }}
              >
                <Send className="w-3 h-3" />
                {contact.action}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Copy email */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            )}
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              {copied ? 'Copied to clipboard!' : email}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}