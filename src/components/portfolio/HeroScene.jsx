import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambient = new THREE.AmbientLight(0x111133, 0.8);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0x00d4ff, 0.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0x7c3aed, 1.5, 30);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);

    // Floating shapes
    const shapes = [];
    const createShape = (geo, color, pos, scale) => {
      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.35,
        shininess: 100,
        wireframe: Math.random() > 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.scale.setScalar(scale);
      mesh.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: pos[1],
      };
      scene.add(mesh);
      shapes.push(mesh);
    };

    createShape(new THREE.IcosahedronGeometry(1, 0), 0x00d4ff, [-6, 2, -3], 1.2);
    createShape(new THREE.OctahedronGeometry(1, 0), 0x7c3aed, [5, -1, -5], 1.5);
    createShape(new THREE.TorusGeometry(1, 0.3, 16, 32), 0x00d4ff, [7, 3, -8], 1);
    createShape(new THREE.TetrahedronGeometry(1, 0), 0xec4899, [-8, -2, -6], 0.8);
    createShape(new THREE.DodecahedronGeometry(0.8, 0), 0x00d4ff, [3, 4, -4], 0.9);
    createShape(new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8), 0x7c3aed, [-4, -3, -7], 1);
    createShape(new THREE.BoxGeometry(1, 1, 1), 0x00d4ff, [8, -3, -5], 0.7);
    createShape(new THREE.ConeGeometry(0.6, 1.2, 6), 0xec4899, [-3, 4, -6], 0.9);

    // Star particles
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let time = 0;
    let animId;

    const animate = () => {
      time += 0.005;

      // Parallax from mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 1 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      shapes.forEach((s) => {
        s.rotation.x += s.userData.rotSpeed.x;
        s.rotation.y += s.userData.rotSpeed.y;
        s.position.y = s.userData.baseY + Math.sin(time * s.userData.floatSpeed + s.userData.floatOffset) * 0.8;
      });

      stars.rotation.y = time * 0.02;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
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
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}