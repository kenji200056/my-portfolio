import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

// PKSHA Color Palette
const COLORS = {
  orange: '#EB805E',
  cyan: '#33B6DE',
  orangeLight: '#F4A58A',
  cyanLight: '#66C9E8',
};

// Floating Icosahedron with wireframe
function FloatingIcosahedron({ position, scale = 1, speed = 1, color = COLORS.orange }: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
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
          color={color}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

// Floating Torus
function FloatingTorus({ position, scale = 1, color = COLORS.cyan }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
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
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

// Floating Octahedron
function FloatingOctahedron({ position, scale = 1, color = COLORS.orangeLight }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
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
          color={color}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

// Gradient Particle Field - PKSHA Style
function ParticleField({ count = 150 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positionsArray = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);

    const colorOrange = new THREE.Color(COLORS.orange);
    const colorCyan = new THREE.Color(COLORS.cyan);

    for (let i = 0; i < count; i++) {
      // Position
      positionsArray[i * 3] = (Math.random() - 0.5) * 25;
      positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Gradient color based on position (left=orange, right=cyan)
      const t = (positionsArray[i * 3] + 12.5) / 25; // Normalize x position to 0-1
      const color = colorOrange.clone().lerp(colorCyan, t);
      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;
    }

    return { positions: positionsArray, colors: colorsArray };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
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

      {/* Floating Geometries - Orange accent */}
      <FloatingIcosahedron position={[-3, 1, -2]} scale={1.2} speed={0.8} color={COLORS.orange} />
      <FloatingIcosahedron position={[4, -1, -3]} scale={0.8} speed={1.2} color={COLORS.orangeLight} />

      {/* Floating Geometries - Cyan accent */}
      <FloatingTorus position={[3, 2, -4]} scale={0.6} color={COLORS.cyan} />
      <FloatingTorus position={[-4, 0, -5]} scale={0.5} color={COLORS.cyanLight} />

      {/* Mixed colors for depth */}
      <FloatingOctahedron position={[-4, -2, -2]} scale={0.7} color={COLORS.cyan} />
      <FloatingOctahedron position={[2, -2, -5]} scale={0.5} color={COLORS.orange} />

      {/* Gradient Particle Field */}
      <ParticleField count={120} />

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
          <FloatingIcosahedron position={[-2, 0, -2]} scale={1} speed={0.5} color={COLORS.orange} />
          <FloatingOctahedron position={[2, 0, -3]} scale={0.6} color={COLORS.cyan} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
