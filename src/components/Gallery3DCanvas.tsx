import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing';

function EngineeringModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  const { position } = useSpring({
    from: { position: [0, -0.2, 0] },
    to: async (next) => {
      while (true) {
        await next({ position: [0, 0.2, 0] });
        await next({ position: [0, -0.2, 0] });
      }
    },
    config: { mass: 1, tension: 50, friction: 10 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;

      const material = (meshRef.current as any).material;
      const targetIntensity = hovered ? 0.8 + Math.sin(state.clock.getElapsedTime() * 5) * 0.2 : 0;
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.1);
    }
  });

  return (
    <a.group position-y={position as any}>
      <Torus
        ref={meshRef}
        args={[1, 0.4, 16, 32]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial
          color="#0056b3"
          wireframe
          emissive="#00ffff"
        />
      </Torus>
    </a.group>
  );
}

export function Gallery3DCanvas() {
  
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <EffectComposer>
          <DepthOfField focusDistance={0.01} focalLength={0.2} bokehScale={3} height={480} />
          <Bloom luminanceThreshold={0.5} intensity={0.5} />
        </EffectComposer>
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <EngineeringModel />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
