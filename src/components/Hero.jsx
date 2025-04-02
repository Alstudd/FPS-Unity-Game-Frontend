import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // ThreeJS setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xff0000,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Handle mouse movement
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;

      // Follow mouse with slight lag
      particlesMesh.rotation.x +=
        (mouseRef.current.y * 0.5 - particlesMesh.rotation.x) * 0.05;
      particlesMesh.rotation.y +=
        (mouseRef.current.x * 0.5 - particlesMesh.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center"
      ref={containerRef}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black z-10"></div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-3xl fade-in">
          <h5 className="text-red-500 text-xl mb-4 font-rajdhani">
            WELCOME TO THE NEXT LEVEL
          </h5>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-orbitron">
            FPS BY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
              ALSTUDD
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-rajdhani">
            Hunt enemies through reality-bending environments with weapons that
            evolve based on your playstyle in this groundbreaking solo
            first-person shooter experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://alstudd.itch.io/fps"
              target="_blank"
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-xl px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 font-rajdhani"
            >
              PLAY NOW
            </a>
            <a
              href="https://drive.google.com/drive/folders/1LS3iE97tUtjvQQAC9W8kcM5-ioc0xQba?usp=sharing"
              target="_blank"
              className="cursor-pointer bg-transparent border-2 border-white text-white text-xl px-8 py-4 rounded-lg font-bold transition-all hover:bg-white/10 font-rajdhani"
            >
              DOWNLOAD
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white opacity-70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
