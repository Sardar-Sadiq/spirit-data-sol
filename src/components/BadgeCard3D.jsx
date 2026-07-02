import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider, useSphericalJoint } from '@react-three/rapier';
import { animate, useMotionValue } from 'framer-motion';
import * as THREE from 'three';

const GLB = '/IDmodal.glb';
useGLTF.preload(GLB);

const GRAVITY = -25;
const LIN_DAMP = 1.8;
const ANG_DAMP = 3.5;
const HOVER_STR = 0.45;
const SCALE = 0.72;        // Bigger card
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

function CardBody({ anchorRef, cardRef, halfW, halfH, halfD, spawnX, spawnY, spawnZ }) {
  useSphericalJoint(anchorRef, cardRef, [
    [0, 0, 0],
    [0, halfH, 0],
  ]);

  const initQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.7, 0, 0.25));

  return (
    <RigidBody
      ref={cardRef}
      type="dynamic"
      position={[spawnX, spawnY, spawnZ]}
      rotation={[initQ.x, initQ.y, initQ.z, initQ.w]}
      linearDamping={LIN_DAMP}
      angularDamping={ANG_DAMP}
      colliders={false}
    >
      <CuboidCollider args={[halfW, halfH, halfD]} />
    </RigidBody>
  );
}

function CameraAim({ y }) {
  useFrame((state) => {
    state.camera.lookAt(0, y + 0.3, 0); // Focus slightly higher to keep strap visible
  });
  return null;
}

function Scene({ strapMotionY, motionY, started, onLoad, cardImage, isHovered }) {
  const { scene } = useGLTF(GLB);
  const { camera } = useThree();
  const anchorRef = useRef();
  const cardRef = useRef();
  const meshRef = useRef();
  const [dims, setDims] = useState(null);
  const opacityRef = useRef(0);
  const hoverY = useRef(0);
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

      const strapPivot = scene.getObjectByName('strap_pivot');
      const cardPivot = scene.getObjectByName('card_pivot');

      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Get dimensions of only the card sub-component if possible
      let cardH = 1.2122; // default fallback matching the ID card
      let cardW = size.x;
      let cardD = size.z;

      if (cardPivot) {
        const cardBox = new THREE.Box3().setFromObject(cardPivot);
        const cardSize = cardBox.getSize(new THREE.Vector3());
        cardH = cardSize.y;
        cardW = cardSize.x;
        cardD = cardSize.z;
      }

      const unscaledStrapTopY = strapPivot ? strapPivot.position.y : 3.2384;
      const unscaledCardPivotY = cardPivot
        ? (strapPivot ? strapPivot.position.y + cardPivot.position.y : cardPivot.position.y)
        : 2.4676;

      const unscaledCardCenterY = unscaledCardPivotY - cardH / 2;
      const Y_OFFSET = -0.5; // Centers card vertically in viewport

      // Offsets to center the visual system correctly
      const offsetY = Y_OFFSET - unscaledCardCenterY * SCALE;
      const offsetX = -(strapPivot ? strapPivot.position.x : 0.1636) * SCALE;

      // Anchor in physics represents the card attachment point
      const anchorY = Y_OFFSET + (cardH / 2) * SCALE;
      const cardCenterY = Y_OFFSET;

      // Calculate mathematically correct spawn position for tilted card body
      const halfH = (cardH / 2) * SCALE;
      const initQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.7, 0, 0.25));
      const jointOffset = new THREE.Vector3(0, halfH, 0).applyQuaternion(initQ);
      const spawnX = -jointOffset.x;
      const spawnY = anchorY - jointOffset.y;
      const spawnZ = -jointOffset.z;

      const computedDims = {
        offsetX,
        offsetY,
        halfW: (cardW / 2) * SCALE,
        halfH,
        halfD: Math.max((cardD / 2) * SCALE, 0.04),
        anchorY,
        cardCenterY,
        unscaledCardPivotY,
        spawnX,
        spawnY,
        spawnZ,
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

  useFrame((state, delta) => {
    if (!dims) return;
    const dt = Math.min(delta, 0.05);

    // 1. Position the scene group: slides down during intro, stays static afterwards
    if (meshRef.current) {
      const currentY = started ? motionY.get() : strapMotionY.get();
      meshRef.current.position.set(dims.offsetX, currentY - dims.unscaledCardPivotY * SCALE, 0);
      meshRef.current.scale.set(SCALE, SCALE, SCALE);
    }

    // 2. Fade in opacity
    if (opacityRef.current < 1) {
      opacityRef.current = Math.min(1, opacityRef.current + dt * 5);
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacityRef.current;
        }
      });
    }

    // 3. Update the card_pivot's rotation from physics rigid body + mouse hover
    const cardPivot = scene.getObjectByName('card_pivot');
    if (cardPivot) {
      const initQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.7, 0, 0.25));
      if (started && cardRef.current) {
        const r = cardRef.current.rotation();

        // Hover tilt: only on mouse X-axis (pointer.x), reset to 0 if not hovered
        const targetY = isHovered ? state.pointer.x * HOVER_STR : 0;

        hoverY.current = THREE.MathUtils.lerp(hoverY.current, targetY, 6 * dt);

        const pq = new THREE.Quaternion(r.x, r.y, r.z, r.w);
        const ey = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, hoverY.current, 0));
        cardPivot.quaternion.copy(pq).multiply(ey);
      } else {
        cardPivot.quaternion.copy(initQ);
      }
    }
  });

  if (!dims) return null;

  return (
    <>
      <CameraAim y={dims.cardCenterY} />

      {dims && (
        <group ref={meshRef}>
          <primitive object={scene} />
        </group>
      )}

      <Physics gravity={[0, GRAVITY, 0]}>
        <Anchor
          anchorRef={anchorRef}
          motionY={motionY}
        />
        {started && dims && (
          <CardBody
            anchorRef={anchorRef}
            cardRef={cardRef}
            halfW={dims.halfW}
            halfH={dims.halfH}
            halfD={dims.halfD}
            spawnX={dims.spawnX}
            spawnY={dims.spawnY}
            spawnZ={dims.spawnZ}
          />
        )}
      </Physics>
    </>
  );
}

export default function BadgeCard3D({ cardImage }) {
  const [dims, setDims] = useState(null);
  const [started, setStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const strapMotionY = useMotionValue(-10);
  const motionY = useMotionValue(-10);

  const handleLoad = (computedDims) => {
    if (started) return;
    setDims(computedDims);

    strapMotionY.set(computedDims.anchorY + DROP_HEIGHT);
    motionY.set(computedDims.anchorY + DROP_HEIGHT);

    animate(strapMotionY, computedDims.anchorY, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // ease-out
      onComplete: () => {
        motionY.set(computedDims.anchorY);
        setStarted(true);
      },
    });
  };

  return (
    <div
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4], fov: 38 }}
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
            isHovered={isHovered}
          />

          <ContactShadows position={[0, -1.8, 0]} opacity={0.18} scale={5} blur={2} far={4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}