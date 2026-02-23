import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111122, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x00d4ff, 2, 20);
    pointLight1.position.set(3, 3, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x7c3aed, 2, 20);
    pointLight2.position.set(-3, -3, 5);
    scene.add(pointLight2);

    // Grid floor
    const gridGeo = new THREE.PlaneGeometry(40, 40, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.05 });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -3;
    scene.add(grid);

    // Particles for background
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.05, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // "S" letter geometry using torus knots and boxes
    const letterGroup = new THREE.Group();
    
    // Create "S" using multiple small cubes
    const cubeMat = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.9,
      shininess: 100,
    });
    
    const sPositions = [
      [-1.5, 1.2, 0], [-1.0, 1.2, 0], [-0.5, 1.2, 0], [0, 1.2, 0],
      [-1.5, 0.6, 0],
      [-1.5, 0, 0], [-1.0, 0, 0], [-0.5, 0, 0], [0, 0, 0],
      [0, -0.6, 0],
      [-1.5, -1.2, 0], [-1.0, -1.2, 0], [-0.5, -1.2, 0], [0, -1.2, 0],
    ];

    const mPositions = [
      [0.8, 1.2, 0], [0.8, 0.6, 0], [0.8, 0, 0], [0.8, -0.6, 0], [0.8, -1.2, 0],
      [1.3, 0.6, 0], [1.8, 0, 0],
      [2.3, 0.6, 0],
      [2.8, 1.2, 0], [2.8, 0.6, 0], [2.8, 0, 0], [2.8, -0.6, 0], [2.8, -1.2, 0],
    ];

    const allPositions = [...sPositions, ...mPositions];
    const cubes = [];
    const cubeSize = 0.4;

    allPositions.forEach((pos, i) => {
      const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const mat = cubeMat.clone();
      mat.color = i < sPositions.length ? new THREE.Color(0x00d4ff) : new THREE.Color(0x7c3aed);
      mat.emissive = mat.color.clone();
      const cube = new THREE.Mesh(geo, mat);
      cube.position.set(pos[0], pos[1], pos[2]);
      cube.userData = {
        targetPos: new THREE.Vector3(pos[0], pos[1], pos[2]),
        startPos: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        delay: i * 0.04,
      };
      cube.position.copy(cube.userData.startPos);
      letterGroup.add(cube);
      cubes.push(cube);
    });

    // Center the letter group
    letterGroup.position.x = -0.65;
    scene.add(letterGroup);

    // Loading ring
    const ringGeo = new THREE.TorusGeometry(3, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(3.3, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    scene.add(ring2);

    let time = 0;
    let animProgress = 0;
    const startTime = Date.now();
    const totalDuration = 3500;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      animProgress = Math.min(elapsed / totalDuration, 1);
      setProgress(Math.floor(animProgress * 100));

      time += 0.01;

      // Camera orbit
      camera.position.x = Math.sin(time * 0.3) * 1.5;
      camera.position.y = Math.cos(time * 0.4) * 0.5;
      camera.lookAt(0, 0, 0);

      // Animate cubes assembling
      cubes.forEach((cube) => {
        const { targetPos, startPos, delay } = cube.userData;
        const cubeProgress = Math.max(0, Math.min((animProgress - delay) / (1 - delay), 1));
        const eased = 1 - Math.pow(1 - cubeProgress, 3);
        
        cube.position.lerpVectors(startPos, targetPos, eased);
        cube.rotation.x = (1 - eased) * Math.PI * 2;
        cube.rotation.y = (1 - eased) * Math.PI * 2;
        cube.material.opacity = eased;
      });

      // Rotate rings
      ring.rotation.x = time * 0.5;
      ring.rotation.y = time * 0.3;
      ring2.rotation.x = -time * 0.4;
      ring2.rotation.z = time * 0.2;

      // Rotate particles
      particles.rotation.y = time * 0.05;

      // Grid animation
      grid.position.z = (time * 2) % 1;

      pointLight1.position.x = Math.sin(time * 2) * 4;
      pointLight1.position.z = Math.cos(time * 2) * 4 + 3;
      pointLight2.position.x = Math.cos(time * 1.5) * 4;
      pointLight2.position.z = Math.sin(time * 1.5) * 4 + 3;

      renderer.render(scene, camera);

      if (animProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Hold for a moment then trigger exit
        setTimeout(() => {
          setExiting(true);
          // Explosion animation
          let explodeTime = 0;
          const explode = () => {
            explodeTime += 0.02;
            cubes.forEach((cube, i) => {
              const dir = cube.position.clone().normalize();
              cube.position.add(dir.multiplyScalar(explodeTime * 0.5));
              cube.material.opacity = Math.max(0, 1 - explodeTime * 2);
              cube.scale.multiplyScalar(0.98);
            });
            ring.material.opacity = Math.max(0, 0.4 - explodeTime);
            ring2.material.opacity = Math.max(0, 0.3 - explodeTime);
            renderer.render(scene, camera);
            if (explodeTime < 1) {
              requestAnimationFrame(explode);
            } else {
              setTimeout(() => onComplete(), 200);
            }
          };
          explode();
        }, 800);
      }
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0a0f]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="font-orbitron text-xs tracking-[0.3em] text-cyan-400/60">
              INITIALIZING {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}