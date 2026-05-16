'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function GlobeSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(600, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const earthMapUrl = 'https://unpkg.com/three-globe@2.33.0/example/img/earth-blue-marble.jpg';
    const earthBumpUrl = 'https://unpkg.com/three-globe@2.33.0/example/img/earth-topology.png';
    const earthSpecularUrl = 'https://unpkg.com/three-globe@2.33.0/example/img/earth-water-mask.png';

    const earthGroup = new THREE.Group();

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1.0, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(earthMapUrl),
      bumpMap: textureLoader.load(earthBumpUrl),
      bumpScale: 0.015,
      specularMap: textureLoader.load(earthSpecularUrl),
      specular: new THREE.Color(0x333333),
      shininess: 15,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.03, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 vNormal; void main() { float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0); gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity; }`,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.5,
    });
    earthGroup.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));

    // Satellites
    const satellites = [];
    const satGeometry = new THREE.SphereGeometry(0.015, 16, 16);
    const satMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 5; i++) {
      const pivot = new THREE.Group();
      pivot.rotation.x = Math.random() * Math.PI;
      pivot.rotation.y = Math.random() * Math.PI;
      const sat = new THREE.Mesh(satGeometry, satMaterial);
      sat.position.set(1.15 + Math.random() * 0.15, 0, 0);
      pivot.add(sat);
      earthGroup.add(pivot);
      satellites.push({ pivot, speed: 0.002 + Math.random() * 0.003 });
    }

    // Stars
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({ map: null, side: THREE.BackSide, transparent: true, opacity: 0.7 });
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starMesh);
    textureLoader.load('https://unpkg.com/three-globe@2.33.0/example/img/night-sky.png', (t) => {
      starMaterial.map = t;
      starMaterial.needsUpdate = true;
    });

    earthGroup.rotation.x = 0.3;
    scene.add(earthGroup);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let autoRotateSpeed = 0.0015;

    const handleDown = (x, y) => { isDragging = true; previousMousePosition = { x, y }; autoRotateSpeed = 0; };
    const handleUp = () => {
      isDragging = false;
      gsap.to({ s: 0 }, { s: 0.0015, duration: 2, onUpdate: function () { autoRotateSpeed = this.targets()[0].s; } });
    };
    const handleMove = (x, y) => {
      if (isDragging) {
        earthGroup.rotation.y += (x - previousMousePosition.x) * 0.005;
        earthGroup.rotation.x += (y - previousMousePosition.y) * 0.005;
        earthGroup.rotation.x = Math.max(-0.8, Math.min(0.8, earthGroup.rotation.x));
        previousMousePosition = { x, y };
      }
    };

    container.addEventListener('pointerdown', (e) => handleDown(e.clientX, e.clientY));
    window.addEventListener('pointerup', handleUp);
    container.addEventListener('pointermove', (e) => handleMove(e.clientX, e.clientY));
    container.addEventListener('touchstart', (e) => { if (e.touches.length === 1) handleDown(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    container.addEventListener('touchmove', (e) => { if (isDragging && e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    container.addEventListener('touchend', handleUp);

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      earthMesh.rotation.y += autoRotateSpeed;
      starMesh.rotation.y -= 0.0001;
      satellites.forEach((s) => { s.pivot.rotation.z += s.speed; });
      renderer.render(scene, camera);
    }
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('pointerup', handleUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="globe-section" id="globe-section">
      <div className="container globe-grid">
        <div className="globe-text">
          <span className="globe-tag">21ST CENTURY DYNAMICS</span>
          <h2>Adapting to Rapid Change</h2>
          <p>As technological progress accelerates and society reshapes itself, adaptation is our most critical skill. We build frameworks to thrive amidst continuous evolution and unprecedented global change.</p>
        </div>
        <div className="globe-canvas-wrapper">
          <div id="globe-container" ref={containerRef} />
          <div className="globe-glow-ring" />
        </div>
      </div>
    </section>
  );
}
