"use client";;
import React, { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// ============================================================================
// Constants - Earth Texture URLs (NASA Blue Marble)
// ============================================================================

const DEFAULT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert latitude/longitude to 3D cartesian coordinates
 */
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function Marker({
  marker,
  radius,
  defaultSize,
  onClick,
  onHover
}) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const groupRef = useRef(null);
  const imageGroupRef = useRef(null);
  const { camera } = useThree();

  // Surface position (where the line starts)
  const surfacePosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.001);
  }, [marker.lat, marker.lng, radius]);

  // Top of the line (where the image is) - positioned further out to prevent going inside globe
  const topPosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.18);
  }, [marker.lat, marker.lng, radius]);

  const lineHeight = topPosition.distanceTo(surfacePosition);

  // Check if marker is facing the camera
  useFrame(() => {
    if (!imageGroupRef.current) return;

    // Get the world position of the image (the positioned element)
    const worldPos = new THREE.Vector3();
    imageGroupRef.current.getWorldPosition(worldPos);

    // Direction from globe center (0,0,0) to marker
    const markerDirection = worldPos.clone().normalize();

    // Direction from globe center to camera
    const cameraDirection = camera.position.clone().normalize();

    // Dot product: positive means facing camera, negative means behind
    const dot = markerDirection.dot(cameraDirection);

    // Show marker only if it's facing the camera (stricter threshold)
    setIsVisible(dot > 0.1);
  });

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback(() => {
    onClick?.(marker);
  }, [marker, onClick]);

  // Calculate line center and orientation
  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);

    // Calculate rotation to align cylinder with the direction from surface to top
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);

  return (
    <group ref={groupRef} visible={isVisible}>
      {/* Pin line from surface to image - properly oriented */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 8]} />
        <meshBasicMaterial
          color={hovered ? "#ffffff" : "#94a3b8"}
          transparent
          opacity={hovered ? 0.9 : 0.6} />
      </mesh>
      {/* Pin point at the surface */}
      <mesh position={surfacePosition} quaternion={lineQuaternion}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshBasicMaterial color={hovered ? "#f97316" : "#ef4444"} />
      </mesh>
      {/* Circular image at the top */}
      <group ref={imageGroupRef} position={topPosition}>
        <Html
          transform
          center
          sprite
          distanceFactor={10}
          style={{
            pointerEvents: isVisible ? "auto" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.15s ease-out",
          }}>
          <div
            className={cn(
              "cursor-pointer overflow-hidden rounded-full bg-neutral-900 shadow-lg transition-transform duration-200",
              hovered && "scale-125 shadow-xl ring-1 ring-white/50"
            )}
            style={{
              width: "8px",
              height: "8px",
            }}
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
            onClick={handleClick}>
            <img
              src={marker.src}
              alt={marker.label || "Marker"}
              className="h-full w-full object-cover"
              draggable={false} />
          </div>
        </Html>
      </group>
    </group>
  );
}

function RotatingGlobe({
  config,
  markers,
  onMarkerClick,
  onMarkerHover
}) {
  const groupRef = useRef(null);

  // Load Earth textures
  const [earthTexture, bumpTexture] = useTexture([
    config.textureUrl,
    config.bumpMapUrl,
  ]);

  // Configure textures
  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.anisotropy = 16;
    }
    if (bumpTexture) {
      bumpTexture.anisotropy = 8;
    }
  }, [earthTexture, bumpTexture]);

  // Create geometries
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius, 64, 64);
  }, [config.radius]);

  const wireframeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius * 1.002, 32, 16);
  }, [config.radius]);

  return (
    <group ref={groupRef}>
      {/* Main globe mesh with Earth texture */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.05}
          roughness={0.7}
          metalness={0.0} />
      </mesh>
      {/* Wireframe overlay */}
      {config.showWireframe && (
        <mesh geometry={wireframeGeometry}>
          <meshBasicMaterial color={config.wireframeColor} wireframe transparent opacity={0.08} />
        </mesh>
      )}
      {/* Markers - now inside the rotating group */}
      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}-${marker.lat}-${marker.lng}`}
          marker={marker}
          radius={config.radius}
          defaultSize={config.markerSize}
          onClick={onMarkerClick}
          onHover={onMarkerHover} />
      ))}
    </group>
  );
}

function Atmosphere({
  radius,
  color,
  intensity,
  blur
}) {
  // blur controls the fresnel exponent: lower = more diffuse, higher = sharper edge
  // We invert it so higher blur value = more diffuse (lower exponent)
  const fresnelPower = Math.max(0.5, 5 - blur);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, [color, intensity, fresnelPower]);

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 64, 32]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}

function Satellite({ radius, speed, tilt, phase, color }) {
  const groupRef = useRef(null);
  const satRef = useRef(null);

  // Create the orbital ring geometry (trail)
  const ringGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 256; i++) {
      const angle = (i / 256) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  useFrame(({ clock }) => {
    if (!satRef.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    satRef.current.position.x = Math.cos(t) * radius;
    satRef.current.position.z = Math.sin(t) * radius;
    satRef.current.position.y = 0;
    // Spin the satellite slowly on its own axis
    satRef.current.rotation.y = t * 2;
    satRef.current.rotation.z = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, phase * 0.5]}>
      {/* Satellite model */}
      <group ref={satRef}>
        {/* Main body */}
        <mesh>
          <boxGeometry args={[0.06, 0.04, 0.04]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Left solar panel */}
        <mesh position={[-0.09, 0, 0]}>
          <boxGeometry args={[0.08, 0.002, 0.06]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        {/* Right solar panel */}
        <mesh position={[0.09, 0, 0]}>
          <boxGeometry args={[0.08, 0.002, 0.06]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.05, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Antenna tip */}
        <mesh position={[0, 0.065, 0]}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

function Starfield({ count = 800, radius = 30 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius + Math.random() * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, radius]);

  return (
    <points geometry={points}>
      <pointsMaterial color="#ffffff" size={0.06} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

function Scene({
  markers,
  config,
  onMarkerClick,
  onMarkerHover
}) {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);

  const orbitRadius = config.radius * 1.4;

  return (
    <>
      {/* Star field */}
      <Starfield />
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={[config.radius * 5, config.radius * 2, config.radius * 5]}
        intensity={config.pointLightIntensity}
        color="#ffffff" />
      <directionalLight
        position={[-config.radius * 3, config.radius, -config.radius * 2]}
        intensity={config.pointLightIntensity * 0.3}
        color="#88ccff" />
      {/* Rotating Globe with Markers */}
      <RotatingGlobe
        config={config}
        markers={markers}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover} />
      {/* Atmosphere (static) */}
      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
          blur={config.atmosphereBlur} />
      )}
      {/* Orbiting Satellites */}
      {config.showSatellites && (
        <>
          <Satellite radius={orbitRadius} speed={0.4} tilt={0.5} phase={0} color="#60a5fa" />
          <Satellite radius={orbitRadius * 1.1} speed={0.3} tilt={-0.7} phase={2.1} color="#818cf8" />
          <Satellite radius={orbitRadius * 0.95} speed={0.5} tilt={1.2} phase={4.2} color="#38bdf8" />
          <Satellite radius={orbitRadius * 1.15} speed={0.25} tilt={0.3} phase={5.5} color="#a78bfa" />
        </>
      )}
      {/* Controls */}
      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.4}
        autoRotate={config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.1} />
    </>
  );
}


// ============================================================================
// Loading Fallback
// ============================================================================

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex shrink-0 flex-col items-center gap-3">
        <span className="inline-block shrink-0 text-sm text-neutral-400">
          Loading globe...
        </span>
      </div>
    </Html>
  );
}

// ============================================================================
// Main Globe3D Component
// ============================================================================

const defaultConfig = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
  showSatellites: false,
};

export function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover
}) {
  const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  return (
    <div className={cn("relative h-[500px] w-full", className)} style={{ overflow: 'visible' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, mergedConfig.radius * 3.5],
        }}
        style={{
          background: mergedConfig.backgroundColor || "transparent",
        }}>
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            markers={markers}
            config={mergedConfig}
            onMarkerClick={onMarkerClick}
            onMarkerHover={onMarkerHover} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Globe3D;
