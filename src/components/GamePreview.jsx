import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export default function GamePreview() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const gunRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const movementRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    speed: 0.1,
  });

  const initThreeJS = () => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#111111");
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff5555, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x7b46ff, 1, 10);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new PointerLockControls(camera, renderer.domElement);
    controlsRef.current = controls;

    // Add click event to lock controls
    renderer.domElement.addEventListener('click', () => {
        if (!controls.isLocked) {
          // Add a try-catch block to handle potential errors
          try {
            controls.lock();
          } catch (error) {
            console.log('Pointer lock error:', error);
          }
        }
      });
      
      // Also add this event listener to handle lock errors
      controls.addEventListener('lock', () => {
        console.log('Pointer locked');
      });
      
      controls.addEventListener('unlock', () => {
        console.log('Pointer unlocked');
      });

    // Environment setup
    createEnvironment();
    createWeapon();

    // Add event listeners for movement
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Start animation loop
    animate();

    // Handle resize
    window.addEventListener("resize", handleResize);
  };

  const createEnvironment = () => {
    const scene = sceneRef.current;

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(50, 50, 50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.2,
      roughness: 0.8,
      wireframe: true,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Add some random objects to the scene
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.BoxGeometry(1, Math.random() * 3 + 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(
          Math.random() * 0.2 + 0.8,
          Math.random() * 0.2,
          Math.random() * 0.2 + 0.5
        ),
        metalness: 0.3,
        roughness: 0.7,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 40 - 20;
      mesh.position.y = geometry.parameters.height / 2;
      mesh.position.z = Math.random() * 40 - 20;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
    }

    // Add particle system for atmosphere
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xff3a5e,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
  };

  const createWeapon = () => {
    const camera = cameraRef.current;

    // Create a simple gun model
    const gunGroup = new THREE.Group();

    // Gun body
    const gunBodyGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.5);
    const gunMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 1,
      roughness: 0.5,
    });
    const gunBody = new THREE.Mesh(gunBodyGeometry, gunMaterial);
    gunBody.position.z = -0.25;
    gunGroup.add(gunBody);

    // Gun barrel
    const barrelGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
    const barrelMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 1,
      roughness: 0.2,
    });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.55;
    barrel.position.y = -0.03;
    gunGroup.add(barrel);

    // Gun handle
    const handleGeometry = new THREE.BoxGeometry(0.08, 0.2, 0.1);
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.5,
      roughness: 0.8,
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = -0.15;
    handle.position.z = -0.15;
    gunGroup.add(handle);

    // Gun sight
    const sightGeometry = new THREE.BoxGeometry(0.02, 0.04, 0.02);
    const sightMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3a5e,
      emissive: 0xff3a5e,
      emissiveIntensity: 0.5,
    });
    const sight = new THREE.Mesh(sightGeometry, sightMaterial);
    sight.position.y = 0.07;
    sight.position.z = -0.1;
    gunGroup.add(sight);

    // Position the gun in the camera view
    gunGroup.position.set(0.25, -0.25, -0.5);
    camera.add(gunGroup);
    gunRef.current = gunGroup;
  };

  const handleKeyDown = (event) => {
    switch (event.code) {
      case "KeyW":
        movementRef.current.forward = true;
        break;
      case "KeyS":
        movementRef.current.backward = true;
        break;
      case "KeyA":
        movementRef.current.left = true;
        break;
      case "KeyD":
        movementRef.current.right = true;
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.code) {
      case "KeyW":
        movementRef.current.forward = false;
        break;
      case "KeyS":
        movementRef.current.backward = false;
        break;
      case "KeyA":
        movementRef.current.left = false;
        break;
      case "KeyD":
        movementRef.current.right = false;
        break;
      default:
        break;
    }
  };

  const handleResize = () => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current)
      return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();

    rendererRef.current.setSize(width, height);
  };

  const animate = () => {
    const delta = clockRef.current.getDelta();

    // Handle movement
    if (controlsRef.current && controlsRef.current.isLocked) {
      const { forward, backward, left, right, speed } = movementRef.current;

      if (forward) {
        controlsRef.current.moveForward(speed);
      }
      if (backward) {
        controlsRef.current.moveForward(-speed);
      }
      if (left) {
        controlsRef.current.moveRight(-speed);
      }
      if (right) {
        controlsRef.current.moveRight(speed);
      }
    }

    // Gun bobbing effect
    if (gunRef.current) {
      const time = performance.now() * 0.002;
      gunRef.current.position.y = -0.25 + Math.sin(time * 2) * 0.01;
      gunRef.current.rotation.z = Math.sin(time) * 0.01;
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    initThreeJS();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Add state for controls lock status
const [isPlaying, setIsPlaying] = useState(false);

// Handle start button click
const handleStartGame = () => {
  setIsPlaying(true);
  // Request pointer lock after a short delay to ensure button animation completes
  setTimeout(() => {
    try {
      controlsRef.current.lock();
    } catch (error) {
      console.log('Pointer lock error:', error);
      setIsPlaying(false);
    }
  }, 100);
};

  return (
    <section id="gameplay" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center font-orbitron">
          GAMEPLAY <span className="text-red-500">PREVIEW</span>
        </h2>

        <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden" ref={containerRef}>
  {!isPlaying && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
      <button 
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105"
        onClick={handleStartGame}
      >
        START GAME
      </button>
    </div>
  )}
</div>

          <div className="mt-6 text-gray-400 text-center">
            <p>
              Experience the gameplay firsthand. Click on the preview and use
              WASD to move around.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
