import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const skills = [
  { name: 'Python', level: 85, color: '#00d4ff' },
  { name: 'Java', level: 80, color: '#7c3aed' },
  { name: 'Web Design', level: 90, color: '#ec4899' },
  { name: 'App Design', level: 75, color: '#10b981' },
];

function SkillOrb({ skill, index }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(160, 160);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const color = new THREE.Color(skill.color);

    // Main sphere
    const sphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Outer ring
    const ringGeo = new THREE.TorusGeometry(1.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    // Inner ring
    const ring2Geo = new THREE.TorusGeometry(0.95, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    const light = new THREE.PointLight(color, 1, 10);
    light.position.set(2, 2, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x222244, 0.5));

    let time = index * 1.5;
    let animId;
    const animate = () => {
      time += 0.008;
      sphere.rotation.y = time;
      sphere.rotation.x = time * 0.5;
      ring.rotation.z = time * 0.7;
      ring2.rotation.z = -time * 0.5;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [skill.color, index]);

  return (
    <motion.div
      className="flex flex-col items-center group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="relative mb-4">
        <canvas ref={canvasRef} width={160} height={160} className="w-40 h-40 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-orbitron text-xl font-bold" style={{ color: skill.color }}>
            {skill.level}%
          </span>
        </div>
      </div>
      <h3 className="font-semibold text-white text-lg mb-1">{skill.name}</h3>
      <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="// SKILLS"
          title="Tech Arsenal"
          subtitle="Technologies and tools I wield with confidence"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {skills.map((skill, i) => (
            <SkillOrb key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}