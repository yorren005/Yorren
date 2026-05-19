"use client";
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function BrainParticles() {
  const pointsRef = useRef();
  const groupRef = useRef();
  const { camera } = useThree();

  const obj = useLoader(OBJLoader, '/assets/brain.obj');

  const [positions, initialPositions, scatterDirs] = useMemo(() => {
    const tempPositions = [];
    obj.traverse((child) => {
      if (child.isMesh) {
        const pos = child.geometry.attributes.position.array;
        for (let i = 0; i < pos.length; i += 3) {
          tempPositions.push(pos[i], pos[i+1], pos[i+2]);
        }
      }
    });

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    
    for (let i = 0; i < tempPositions.length; i += 3) {
      if (tempPositions[i] < minX) minX = tempPositions[i];
      if (tempPositions[i] > maxX) maxX = tempPositions[i];
      if (tempPositions[i+1] < minY) minY = tempPositions[i+1];
      if (tempPositions[i+1] > maxY) maxY = tempPositions[i+1];
      if (tempPositions[i+2] < minZ) minZ = tempPositions[i+2];
      if (tempPositions[i+2] > maxZ) maxZ = tempPositions[i+2];
    }
    
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const cz = (minZ + maxZ) / 2;
    
    const maxDim = Math.max(maxX - minX, Math.max(maxY - minY, maxZ - minZ));
    const scale = 4.5 / maxDim;

    const targetCount = 10000;
    const finalPos = new Float32Array(targetCount * 3);
    const initPos = new Float32Array(targetCount * 3);
    const scatterDirs = new Float32Array(targetCount * 3);
    const vertexCount = tempPositions.length / 3;
    
    for (let i = 0; i < targetCount; i++) {
      const idx = Math.floor(Math.random() * vertexCount) * 3;
      
      let x = (tempPositions[idx] - cx) * scale;
      let y = (tempPositions[idx+1] - cy) * scale;
      let z = (tempPositions[idx+2] - cz) * scale;
      
      // Jitter for volume
      x += (Math.random() - 0.5) * 0.08;
      y += (Math.random() - 0.5) * 0.08;
      z += (Math.random() - 0.5) * 0.08;
      
      finalPos[i * 3] = x;
      finalPos[i * 3 + 1] = y;
      finalPos[i * 3 + 2] = z;
      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Precompute random scatter direction for the dissolve effect
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      scatterDirs[i * 3] = Math.sin(phi) * Math.cos(theta);
      scatterDirs[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
      scatterDirs[i * 3 + 2] = Math.cos(phi);
    }
    return [finalPos, initPos, scatterDirs];
  }, [obj]);

  const [particleColor, setParticleColor] = useState('#ffffff');
  
  useEffect(() => {
    const updateColor = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      setParticleColor(isLight ? '#000000' : '#ffffff');
    };
    
    updateColor();
    
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    return () => observer.disconnect();
  }, []);

  const mouse = useRef(new THREE.Vector3(0,0,0));

  useFrame((state) => {
    // Track mouse
    const vector = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    vector.unproject(state.camera);
    const dir = vector.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / dir.z;
    const pos = state.camera.position.clone().add(dir.multiplyScalar(distance));
    mouse.current.lerp(pos, 0.1);

    // Apply repulsion to grains
    if (!pointsRef.current) return;
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    
    // transform mouse to local space of the points group which is rotating
    const localMouse = mouse.current.clone();
    pointsRef.current.worldToLocal(localMouse);

    for(let i=0; i<10000; i++) {
       const ix = initialPositions[i*3];
       const iy = initialPositions[i*3+1];
       const iz = initialPositions[i*3+2];
       
       const dx = localMouse.x - ix;
       const dy = localMouse.y - iy;
       const dz = localMouse.z - iz;
       const distSq = dx*dx + dy*dy + dz*dz;
       
       const maxDist = 2.5; // slightly larger interaction radius for dissolve
       if (distSq < maxDist * maxDist) {
          const force = (maxDist - Math.sqrt(distSq)) / maxDist;
          
          // Target scattered position
          const sx = scatterDirs[i*3];
          const sy = scatterDirs[i*3+1];
          const sz = scatterDirs[i*3+2];
          
          const targetX = ix + sx * force * 6.0;
          const targetY = iy + sy * force * 6.0;
          const targetZ = iz + sz * force * 6.0;

          // Smoothly drift towards the scattered position (organic dissolve)
          positionsArray[i*3] += (targetX - positionsArray[i*3]) * 0.15;
          positionsArray[i*3+1] += (targetY - positionsArray[i*3+1]) * 0.15;
          positionsArray[i*3+2] += (targetZ - positionsArray[i*3+2]) * 0.15;
       } else {
          // Smoothly pull back into the exact anatomical shape like gravity
          positionsArray[i*3] += (ix - positionsArray[i*3]) * 0.03;
          positionsArray[i*3+1] += (iy - positionsArray[i*3+1]) * 0.03;
          positionsArray[i*3+2] += (iz - positionsArray[i*3+2]) * 0.03;
       }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  // rotation={[-Math.PI / 2, 0, 0]} fixes the upside-down Z-up OBJ coordinate mismatch
  return (
    <group ref={groupRef}>
      <points ref={pointsRef} rotation={[-Math.PI / 2, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial transparent color={particleColor} size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
      </points>
    </group>
  );
}

export default function YorrenGlobeSection() {
  return (
    <section className="globe-section" id="globe-section">
      <div className="container globe-grid">
        <div className="globe-text">
          <span className="globe-tag">THE SYSTEM</span>
          <h2>Master Your Mind</h2>
          <p>
            Everything starts here. Reprogram your neural pathways, enhance your focus, and build unbreakable resilience.
          </p>
        </div>
        <div className="globe-canvas-wrapper h-[500px] w-full relative">
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, var(--bg-color) 100%)', pointerEvents: 'none', zIndex: 10 }} />
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <Suspense fallback={null}>
              <BrainParticles />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
