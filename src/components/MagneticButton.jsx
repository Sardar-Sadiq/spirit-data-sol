import { motion } from "framer-motion";
import { useRef, useState } from "react";

const STRENGTH = 1;
const MAX_DISTANCE = 200;

export default function MagneticButton({
  children,
  onClick,
  className = "",
  buttonClassName = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    let x = (clientX - (left + width / 2)) * STRENGTH;
    let y = (clientY - (top + height / 2)) * STRENGTH;

    const distance = Math.hypot(x, y);
    if (distance > MAX_DISTANCE) {
      const scale = MAX_DISTANCE / distance;
      x *= scale;
      y *= scale;
    }

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const hasMoved = position.x !== 0 || position.y !== 0;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className="rounded-lg border border-dashed transition-colors duration-500 [--show-color:var(--color-blue-500,#3b82f6)] dark:[--show-color:var(--color-blue-600,#2563eb)] p-0.5"
        style={{
          borderColor: hasMoved ? "var(--show-color)" : "transparent",
          backgroundColor: hasMoved
            ? "color-mix(in srgb, var(--show-color) 10%, transparent)"
            : "transparent",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={ref}
          animate={{ x: position.x, y: position.y }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
        >
          <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={
              buttonClassName ||
              "relative rounded-lg bg-gradient-to-b from-blue-500 to-blue-700 px-6 py-3 font-semibold text-white active:scale-98 transition duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            }
            {...props}
          >
            {children}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
