import React, { useRef, useEffect } from 'react';

/**
 * Logo3D — uses Google's <model-viewer> web component.
 * Animation: subtle camera-orbit oscillation (gentle tilt sway) via rAF.
 * No auto-rotate, no Three.js, no Clock warnings, no context loss.
 */
export default function Logo3D() {
  const mvRef = useRef(null);

  useEffect(() => {
    let rafId;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const t = (timestamp - startTime) / 1000; // elapsed seconds

      // Gentle horizontal sway: 0deg ± 10deg (slow period ~8s)
      const theta = Math.sin(t * 0.78) * 10;

      // Subtle vertical nod: 90deg ± 4deg — 90deg = center/front view
      const phi = 90 + Math.sin(t * 0.52) * 4;

      if (mvRef.current) {
        mvRef.current.setAttribute('camera-orbit', `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg auto`);
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line react/no-unknown-property */}
      <model-viewer
        ref={mvRef}
        src="/3Dlogo.glb"
        alt="Spirit Data Solutions 3D logo"

        camera-orbit="0deg 90deg auto"
        field-of-view="30deg"

        environment-image="neutral"
        shadow-intensity="0"

        disable-zoom
        disable-tap
        interaction-prompt="none"

        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          '--progress-bar-height': '0px',
        }}
      />
    </div>
  );
}
