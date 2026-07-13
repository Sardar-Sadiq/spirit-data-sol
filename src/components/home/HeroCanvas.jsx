import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function LogoModel() {
  const { scene } = useGLTF('/3Dlogo.glb');
  const groupRef = useRef();

  // Clone the scene to avoid shared-state issues with other instances
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={2.5} />
    </group>
  );
}

useGLTF.preload('/3Dlogo.glb');

export default function HeroCanvas() {
  const handleCreated = useCallback(({ gl }) => {
    // Handle WebGL context loss/restore gracefully
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
    });
    canvas.addEventListener('webglcontextrestored', () => {
      gl.resetState();
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
      onCreated={handleCreated}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 3, 4]} intensity={0.5} />
      <pointLight position={[0, -3, 3]} intensity={0.3} color="#aaccff" />
      <LogoModel />
    </Canvas>
  );
}
