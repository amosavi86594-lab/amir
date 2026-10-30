import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Detect software rendering for graceful fallback
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      currentMount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back:', e);
      return;
    }

    // 2. Futuristic Core - Group containing icosahedron, rings, inner sphere, particles
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Outer Icosahedron Wireframe
    const geom = new THREE.IcosahedronGeometry(2.0, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const icosahedron = new THREE.Mesh(geom, wireframeMat);
    rootGroup.add(icosahedron);

    // Inner glowing sphere
    const innerGeom = new THREE.SphereGeometry(1.15, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.25,
      metalness: 0.85,
      emissive: 0x2e0854,
      emissiveIntensity: 0.7,
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    rootGroup.add(innerSphere);

    // Kinetic Orbit Ring
    const torusGeom = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.6,
    });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    torus.rotation.x = Math.PI / 3;
    rootGroup.add(torus);

    const torus2Geom = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const torus2Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4,
    });
    const torus2 = new THREE.Mesh(torus2Geom, torus2Mat);
    torus2.rotation.y = Math.PI / 4;
    rootGroup.add(torus2);

    // Floating kinetic particles
    const particlesCount = 220;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 11;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 3.0, 50);
    cyanPointLight.position.set(5, 5, 5);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0x8b5cf6, 2.5, 50);
    violetPointLight.position.set(-5, -5, -2);
    scene.add(violetPointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Responsive Resize with ResizeObserver
    const handleResize = () => {
      if (!currentMount || !renderer) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentMount);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking with damping
      targetX += (mouseX * 0.45 - targetX) * 0.05;
      targetY += (mouseY * 0.45 - targetY) * 0.05;

      icosahedron.rotation.x = elapsedTime * 0.12 + targetY;
      icosahedron.rotation.y = elapsedTime * 0.18 + targetX;

      torus.rotation.z = elapsedTime * 0.2;
      torus2.rotation.x = -elapsedTime * 0.15;

      innerSphere.rotation.y = -elapsedTime * 0.25;
      innerSphere.rotation.x = elapsedTime * 0.1;

      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geom.dispose();
      wireframeMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      torus2Geom.dispose();
      torus2Mat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] md:min-h-[460px] cursor-grab active:cursor-grabbing relative flex items-center justify-center overflow-hidden"
      aria-label="نمایشگر سه بعدی شتاب‌سنج و هسته نورپلنر"
    />
  );
};
