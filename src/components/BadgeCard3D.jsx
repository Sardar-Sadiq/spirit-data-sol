import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider, useSphericalJoint } from '@react-three/rapier';
import { animate, useMotionValue } from 'framer-motion';
import * as THREE from 'three';

const GLB = '/3Dcard.glb';
useGLTF.preload(GLB);

const GRAVITY = -25;
const LIN_DAMP = 1.8;
const ANG_DAMP = 3.5;
const HOVER_STR = 0.45;
const STRAP_FRAC = 0.0;
const SCALE = 0.72;        // ✅ was 0.52 — bigger card
const DROP_HEIGHT = 7.0;

function Anchor({ anchorRef, motionY }) {
  useFrame(() => {
    if (!anchorRef.current) return;
    anchorRef.current.setNextKinematicTranslation({ x: 0, y: motionY.get(), z: 0 });
  });
  return (
    <RigidBody ref={anchorRef} type="kinematicPosition" position={[0, motionY.get(), 0]}>
      <CuboidCollider args={[0.01, 0.01, 0.01]} sensor />
    </RigidBody>
  );
}

function CardBody({ anchorRef, cardRef, meshRef, halfW, halfH, halfD, cardStartY, opacityRef }) {
  const hoverY = useRef(0);

  useSphericalJoint(anchorRef, cardRef, [
    [0, 0, 0],
    [0, halfH, 0],
  ]);

  useEffect(() => {
    const t = setTimeout(() => {
      cardRef.current?.applyImpulse({ x: 0.28, y: 0, z: 0 }, true);
    }, 80);
    return () => clearTimeout(t);
  }, []);

  useFrame((state, delta) => {
    if (!cardRef.current || !meshRef.current) return;
    const dt = Math.min(delta, 0.05);
    const t = cardRef.current.translation();
    const r = cardRef.current.rotation();

    meshRef.current.position.set(t.x, t.y, t.z);

    if (opacityRef.current < 1) {
      opacityRef.current = Math.min(1, opacityRef.current + dt * 5);
      meshRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacityRef.current;
        }
      });
    }

    const target = state.pointer.x * HOVER_STR;
    hoverY.current = THREE.MathUtils.lerp(hoverY.current, target, 6 * dt);
    const pq = new THREE.Quaternion(r.x, r.y, r.z, r.w);
    const ey = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, hoverY.current, 0));
    meshRef.current.quaternion.copy(pq).multiply(ey);
  });

  return (
    <RigidBody
      ref={cardRef}
      type="dynamic"
      position={[0, cardStartY, 0]}
      linearDamping={LIN_DAMP}
      angularDamping={ANG_DAMP}
      colliders={false}
    >
      <CuboidCollider args={[halfW, halfH, halfD]} />
    </RigidBody>
  );
}

// ✅ removed the -1.25 offset — was pushing camera aim too low
function CameraAim({ y }) {
  useFrame((state) => {
    state.camera.lookAt(0, y - 0.5, 0);
  });
  return null;
}

function Scene({ strapMotionY, motionY, started, onLoad, cardImage }) {
  const { scene } = useGLTF(GLB);
  const { camera } = useThree();
  const anchorRef = useRef();
  const cardRef = useRef();
  const meshRef = useRef();
  const [dims, setDims] = useState(null);
  const opacityRef = useRef(0);
  const [texture, setTexture] = useState(null);

  const onLoadRef = useRef(onLoad);
  useEffect(() => { onLoadRef.current = onLoad; }, [onLoad]);

  useEffect(() => {
    if (cardImage) {
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('anonymous');
      loader.load(
        cardImage,
        (tex) => {
          if (THREE.SRGBColorSpace) {
            tex.colorSpace = THREE.SRGBColorSpace;
          } else {
            tex.encoding = 3001; // sRGBEncoding
          }
          tex.flipY = false;
          tex.minFilter = THREE.LinearFilter;
          setTexture(tex);
        },
        undefined,
        (err) => {
          console.error('Scene: Failed to load card image texture:', err);
        }
      );
    } else {
      setTexture(null);
    }
  }, [cardImage]);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        const nameLower = child.name.toLowerCase();
        if (nameLower === "plane.002" || nameLower === "plane_002" || nameLower === "plane002") {
          if (texture) {
            if (!child.userData.originalMaterial) {
              child.userData.originalMaterial = child.material;
            }
            const newMaterial = child.userData.originalMaterial.clone();
            newMaterial.map = texture;
            if (newMaterial.color) {
              newMaterial.color.set('#ffffff');
            }
            newMaterial.transparent = true;
            newMaterial.opacity = opacityRef.current;
            newMaterial.needsUpdate = true;
            child.material = newMaterial;
          } else if (child.userData.originalMaterial) {
            child.material = child.userData.originalMaterial;
          }
        }
      }
    });
  }, [scene, texture]);

  useEffect(() => {
    try {
      scene.scale.set(1, 1, 1);
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const cardH = size.y * (1 - STRAP_FRAC);
      const Y_OFFSET = -0.5;   // ✅ was -0.6 — centers card vertically
      const anchorY = Y_OFFSET + (cardH / 2) * SCALE;
      const cardCenterY = Y_OFFSET;
      const startAnchorY = anchorY + DROP_HEIGHT;
      const cardStartY = startAnchorY - (cardH / 2) * SCALE;

      const unscaledCardCenter = -size.y / 2 + cardH / 2;
      const offsetY = (-center.y - unscaledCardCenter) * SCALE;
      const offsetX = -center.x * SCALE;

      const computedDims = {
        offsetX, offsetY,
        halfW: (size.x / 2) * SCALE,
        halfH: (cardH / 2) * SCALE,
        halfD: Math.max((size.z / 2) * SCALE, 0.04),
        anchorY, cardStartY, cardCenterY,
      };
      setDims(computedDims);
      if (onLoadRef.current) onLoadRef.current(computedDims);
    } catch (e) {
      console.error('Scene: Error in dims calculation:', e);
    }
  }, [scene, camera]);

  useEffect(() => {
    if (started) opacityRef.current = 0;
  }, [started]);

  if (!dims) return null;

  return (
    <>
      <CameraAim y={dims.cardCenterY} />

      {started && (
        <group ref={meshRef}>
          <group position={[dims.offsetX, dims.offsetY, 0]} scale={SCALE}>
            <primitive object={scene} />
          </group>
        </group>
      )}

      <Physics gravity={[0, GRAVITY, 0]}>
        <Anchor
          anchorRef={anchorRef}
          motionY={started ? motionY : strapMotionY}
        />
        {started && (
          <CardBody
            anchorRef={anchorRef}
            cardRef={cardRef}
            meshRef={meshRef}
            halfW={dims.halfW}
            halfH={dims.halfH}
            halfD={dims.halfD}
            cardStartY={dims.cardStartY}
            opacityRef={opacityRef}
          />
        )}
      </Physics>
    </>
  );
}

export default function BadgeCard3D({ cardImage }) {
  const [dims, setDims] = useState(null);
  const [started, setStarted] = useState(false);

  const strapMotionY = useMotionValue(-10);
  const motionY = useMotionValue(-10);

  const handleLoad = (computedDims) => {
    if (started) return;
    setDims(computedDims);

    // ✅ was anchorY + 4.0 — now uses DROP_HEIGHT to match Scene
    strapMotionY.set(computedDims.anchorY + DROP_HEIGHT);
    motionY.set(computedDims.anchorY + DROP_HEIGHT);

    animate(strapMotionY, computedDims.anchorY, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        motionY.set(computedDims.anchorY);
        setTimeout(() => setStarted(true), 32);
      },
    });
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4], fov: 38 }}  // ✅ was [0,0,4.5] fov:38
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
          <pointLight position={[-3, 2, 3]} intensity={0.5} color="#5599ff" />

          <Scene
            strapMotionY={strapMotionY}
            motionY={motionY}
            started={started}
            onLoad={handleLoad}
            cardImage={cardImage}
          />

          <ContactShadows position={[0, -1.8, 0]} opacity={0.18} scale={5} blur={2} far={4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}