import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function CinematicScene() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111133, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x00d4ff, 2, 50);
    mainLight.position.set(0, 5, 10);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0x7c3aed, 1.5, 40);
    accentLight.position.set(-10, 0, 5);
    scene.add(accentLight);

    const highlightLight = new THREE.PointLight(0xec4899, 1, 30);
    highlightLight.position.set(10, -5, 0);
    scene.add(highlightLight);

    // Particle system with dynamic density
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 100;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Hero shapes (floating geometric objects)
    const heroShapes = [];
    const createHeroShape = (geo, color, pos, scale) => {
      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.4,
        shininess: 100,
        wireframe: Math.random() > 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.scale.setScalar(scale);
      mesh.userData = {
        basePos: new THREE.Vector3(...pos),
        rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      heroShapes.push(mesh);
    };

    createHeroShape(new THREE.IcosahedronGeometry(1, 0), 0x00d4ff, [-8, 3, -5], 1.5);
    createHeroShape(new THREE.OctahedronGeometry(1, 0), 0x7c3aed, [7, -2, -8], 1.8);
    createHeroShape(new THREE.TorusGeometry(1, 0.3, 16, 32), 0x00d4ff, [9, 4, -10], 1.2);
    createHeroShape(new THREE.TetrahedronGeometry(1, 0), 0xec4899, [-10, -3, -7], 1);
    createHeroShape(new THREE.DodecahedronGeometry(0.8, 0), 0x00d4ff, [5, 5, -6], 1.1);
    createHeroShape(new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8), 0x7c3aed, [-6, -4, -9], 1.3);

    // Grid floor
    const gridGeo = new THREE.PlaneGeometry(100, 100, 50, 50);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -15;
    scene.add(grid);

    // Camera path keyframes for each section
    const cameraPath = [
      { pos: [0, 0, 12], target: [0, 0, 0], section: 'hero' }, // Hero
      { pos: [3, 2, 10], target: [0, 0, -5], section: 'about' }, // About
      { pos: [-4, 4, 8], target: [-2, 1, -8], section: 'education' }, // Education
      { pos: [5, -2, 12], target: [3, 0, -5], section: 'skills' }, // Skills
      { pos: [-3, 3, 9], target: [-1, 1, -6], section: 'projects' }, // Projects
      { pos: [0, 1, 11], target: [0, 0, -3], section: 'contact' }, // Contact
    ];

    // Section-specific lighting configurations
    const lightingConfigs = {
      hero: { mainColor: 0x00d4ff, accentColor: 0x7c3aed, highlightColor: 0xec4899, ambientIntensity: 0.5 },
      about: { mainColor: 0x7c3aed, accentColor: 0x00d4ff, highlightColor: 0xec4899, ambientIntensity: 0.6 },
      education: { mainColor: 0xec4899, accentColor: 0x7c3aed, highlightColor: 0x00d4ff, ambientIntensity: 0.5 },
      skills: { mainColor: 0x00d4ff, accentColor: 0xec4899, highlightColor: 0x7c3aed, ambientIntensity: 0.7 },
      projects: { mainColor: 0x7c3aed, accentColor: 0x00d4ff, highlightColor: 0xec4899, ambientIntensity: 0.6 },
      contact: { mainColor: 0x00d4ff, accentColor: 0x7c3aed, highlightColor: 0xec4899, ambientIntensity: 0.5 },
    };

    let time = 0;
    let currentCameraIndex = 0;
    let targetCameraIndex = 0;
    let transitionProgress = 1;
    const cameraTarget = new THREE.Vector3();
    const mousePos = { x: 0, y: 0 };

    // Smooth interpolation
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Handle scroll-based section detection
    const getSectionProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrolled / scrollHeight;
      
      // Calculate which section we're in
      const sectionIndex = Math.min(Math.floor(progress * cameraPath.length), cameraPath.length - 1);
      const sectionProgress = (progress * cameraPath.length) % 1;
      
      return { sectionIndex, sectionProgress, totalProgress: progress };
    };

    const updateCameraAndLighting = () => {
      const { sectionIndex, sectionProgress } = getSectionProgress();
      
      if (sectionIndex !== targetCameraIndex) {
        targetCameraIndex = sectionIndex;
        currentCameraIndex = Math.max(0, sectionIndex - 1);
        transitionProgress = 0;
      }

      // Smooth camera transition
      transitionProgress = Math.min(transitionProgress + 0.015, 1);
      const t = easeInOutCubic(transitionProgress);
      
      const nextIndex = Math.min(sectionIndex + 1, cameraPath.length - 1);
      const fromPath = cameraPath[sectionIndex];
      const toPath = cameraPath[nextIndex];
      
      const blendT = sectionIndex === cameraPath.length - 1 ? 0 : sectionProgress;
      
      camera.position.x = lerp(fromPath.pos[0], toPath.pos[0], blendT) + mousePos.x * 0.5;
      camera.position.y = lerp(fromPath.pos[1], toPath.pos[1], blendT) + mousePos.y * 0.3;
      camera.position.z = lerp(fromPath.pos[2], toPath.pos[2], blendT);
      
      cameraTarget.x = lerp(fromPath.target[0], toPath.target[0], blendT);
      cameraTarget.y = lerp(fromPath.target[1], toPath.target[1], blendT);
      cameraTarget.z = lerp(fromPath.target[2], toPath.target[2], blendT);
      
      camera.lookAt(cameraTarget);

      // Dynamic lighting based on section
      const currentSection = cameraPath[sectionIndex].section;
      const config = lightingConfigs[currentSection];
      
      mainLight.color.setHex(config.mainColor);
      accentLight.color.setHex(config.accentColor);
      highlightLight.color.setHex(config.highlightColor);
      ambientLight.intensity = config.ambientIntensity;

      // Particle density and color shift
      const densityFactor = 0.3 + sectionProgress * 0.7;
      particleMat.opacity = 0.4 + Math.sin(time * 0.5) * 0.2;
      particleMat.size = 0.08 + sectionProgress * 0.04;
      particleMat.color.setHex(config.mainColor);

      // Hero shapes visibility based on scroll (fade out after hero)
      const heroOpacity = Math.max(0, 1 - getSectionProgress().totalProgress * 3);
      heroShapes.forEach(shape => {
        shape.material.opacity = heroOpacity * 0.4;
      });
    };

    // Animation loop
    let animId;
    const animate = () => {
      time += 0.01;

      updateCameraAndLighting();

      // Animate particles with flow
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i * 3];
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        positions[i * 3 + 2] += particleVelocities[i * 3 + 2];
        
        // Boundary check
        if (Math.abs(positions[i * 3]) > 50) particleVelocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 50) particleVelocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 50) particleVelocities[i * 3 + 2] *= -1;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Rotate particles
      particles.rotation.y = time * 0.05;

      // Animate hero shapes
      heroShapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotSpeed.x;
        shape.rotation.y += shape.userData.rotSpeed.y;
        shape.position.y = shape.userData.basePos.y + Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.8;
      });

      // Grid animation
      grid.position.z = (time * 3) % 2 - 1;

      // Dynamic light positions
      mainLight.position.x = Math.sin(time * 0.5) * 8;
      mainLight.position.z = Math.cos(time * 0.5) * 8 + 10;
      accentLight.position.x = Math.cos(time * 0.3) * 10 - 5;
      accentLight.position.y = Math.sin(time * 0.4) * 5;
      highlightLight.position.x = Math.sin(time * 0.6) * 10;
      highlightLight.position.z = Math.cos(time * 0.6) * 8;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Event listeners
    const onMouseMove = (e) => {
      mousePos.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}