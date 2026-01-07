import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Floating Icosahedron with wireframe
function FloatingIcosahedron({ position, scale = 1, speed = 1 }: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#C4A77D"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

// Floating Torus
function FloatingTorus({ position, scale = 1 }: {
  position: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshBasicMaterial
          color="#D4C4A8"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

// Floating Octahedron
function FloatingOctahedron({ position, scale = 1 }: {
  position: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1]} />
        <meshBasicMaterial
          color="#A68B5B"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

// Particle Field
function ParticleField({ count = 100 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C4A77D"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Main Scene Component
function SceneContent() {
  return (
    <>
      {/* Ambient light for subtle illumination */}
      <ambientLight intensity={0.5} />

      {/* Floating Geometries */}
      <FloatingIcosahedron position={[-3, 1, -2]} scale={1.2} speed={0.8} />
      <FloatingIcosahedron position={[4, -1, -3]} scale={0.8} speed={1.2} />
      <FloatingTorus position={[3, 2, -4]} scale={0.6} />
      <FloatingOctahedron position={[-4, -2, -2]} scale={0.7} />
      <FloatingOctahedron position={[2, -2, -5]} scale={0.5} />

      {/* Particle Field */}
      <ParticleField count={80} />

      {/* Environment for reflections */}
      <Environment preset="city" />
    </>
  );
}

// Exported Scene with Canvas
export default function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Lightweight version for lower-end devices
export function SceneLight() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <FloatingIcosahedron position={[-2, 0, -2]} scale={1} speed={0.5} />
          <FloatingOctahedron position={[2, 0, -3]} scale={0.6} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
