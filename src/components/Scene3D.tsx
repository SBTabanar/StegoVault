import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, OrbitControls, MeshWobbleMaterial, Trail, Stars } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingSphere({ position, color, speed = 1, size = 1 }: { position: [number, number, number]; color: string; speed?: number; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

function GlowingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <Trail
      width={2}
      length={6}
      color={color}
      attenuation={(t) => t * t}
    >
      <Sphere ref={meshRef} args={[0.3, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Sphere>
    </Trail>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[1.2, 0.4, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
}

function WobblyCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.6}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1.5, 1]} position={position}>
        <meshStandardMaterial
          color={color}
          wireframe
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Icosahedron>
    </Float>
  );
}

function HexGrid() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -8]} rotation={[0, 0, 0]}>
      <planeGeometry args={[30, 30, 20, 20]} />
      <meshBasicMaterial
        color="#22d3ee"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 400;
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      // Alternate between cyan and purple
      if (Math.random() > 0.5) {
        colors[i * 3] = 0.133; // cyan
        colors[i * 3 + 1] = 0.827;
        colors[i * 3 + 2] = 0.933;
      } else {
        colors[i * 3] = 0.659; // purple
        colors[i * 3 + 1] = 0.333;
        colors[i * 3 + 2] = 0.969;
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
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
        size={0.08}
        transparent
        opacity={0.8}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

function FloatingRing({ position, color, size = 2 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, 0.05, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
          <pointLight position={[0, 10, 5]} intensity={0.8} color="#06b6d4" />
          <spotLight
            position={[0, 15, 0]}
            angle={0.4}
            penumbra={1}
            intensity={0.8}
            color="#22d3ee"
          />

          {/* Stars Background */}
          <Stars
            radius={50}
            depth={50}
            count={1000}
            factor={3}
            saturation={0.5}
            fade
            speed={1}
          />

          {/* Main Objects */}
          <FloatingSphere position={[-4, 2, -2]} color="#22d3ee" speed={0.8} size={1.2} />
          <FloatingSphere position={[5, -1, -3]} color="#a855f7" speed={1.2} size={0.8} />
          <FloatingTorus position={[4, 2, -2]} color="#a855f7" />
          <FloatingIcosahedron position={[0, -3, -4]} color="#22d3ee" />
          <WobblyCube position={[-5, -2, -3]} color="#06b6d4" />
          
          {/* Glowing Orbs with Trails */}
          <GlowingSphere position={[3, 3, -1]} color="#22d3ee" />
          <GlowingSphere position={[-3, -1, 0]} color="#a855f7" />
          
          {/* Floating Rings */}
          <FloatingRing position={[0, 0, -5]} color="#22d3ee" size={3} />
          <FloatingRing position={[2, 2, -6]} color="#a855f7" size={1.5} />
          
          {/* Background Grid */}
          <HexGrid />
          
          {/* Particles */}
          <Particles />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
