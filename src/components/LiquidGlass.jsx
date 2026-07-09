'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * LiquidGlass — from https://www.ui-layouts.com/components/liquid-glass
 *
 * Uses an SVG feTurbulence + feDisplacementMap filter to create a liquid
 * glass distortion on the backdrop. Layers:
 *   1. Bend Layer   — backdrop-blur + SVG distortion filter
 *   2. Face Layer   — outer glow / drop-shadow
 *   3. Edge Layer   — inset white highlight (glass rim)
 *   4. Content      — children sit on top, fully interactive
 */

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

const shadowStyles = {
  none: 'inset 0 0 0 0 rgba(255,255,255,0)',
  xs: 'inset 1px 1px 1px 0 rgba(255,255,255,0.30), inset -1px -1px 1px 0 rgba(255,255,255,0.30)',
  sm: 'inset 2px 2px 2px 0 rgba(255,255,255,0.35), inset -2px -2px 2px 0 rgba(255,255,255,0.35)',
  md: 'inset 3px 3px 3px 0 rgba(255,255,255,0.45), inset -3px -3px 3px 0 rgba(255,255,255,0.45)',
  lg: 'inset 4px 4px 4px 0 rgba(255,255,255,0.50), inset -4px -4px 4px 0 rgba(255,255,255,0.50)',
  xl: 'inset 6px 6px 6px 0 rgba(255,255,255,0.55), inset -6px -6px 6px 0 rgba(255,255,255,0.55)',
  '2xl': 'inset 8px 8px 8px 0 rgba(255,255,255,0.60), inset -8px -8px 8px 0 rgba(255,255,255,0.60)',
};

const glowStyles = {
  none: '0 4px 4px rgba(0,0,0,0.05), 0 0 12px rgba(0,0,0,0.05)',
  xs: '0 4px 4px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.08), 0 0 16px rgba(255,255,255,0.05)',
  sm: '0 4px 4px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.08), 0 0 24px rgba(255,255,255,0.10)',
  md: '0 4px 4px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.08), 0 0 32px rgba(255,255,255,0.15)',
  lg: '0 4px 4px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.08), 0 0 40px rgba(255,255,255,0.20)',
  xl: '0 4px 4px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.08), 0 0 48px rgba(255,255,255,0.25)',
  '2xl': '0 4px 4px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.08), 0 0 60px rgba(255,255,255,0.30)',
};

export const LiquidGlass = ({
  children,
  className = '',
  style = {},
  draggable = false,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'xl',
  borderRadius = '999px',
  glowIntensity = 'sm',
  shadowIntensity = 'md',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = (e) => {
    if (!expandable) return;
    if (e.target.closest('a, button, input, select, textarea')) return;
    setIsExpanded(!isExpanded);
  };

  const containerVariants = expandable
    ? {
      collapsed: {
        width: width || 'auto',
        height: height || 'auto',
        transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
      },
      expanded: {
        width: expandedWidth || 'auto',
        height: expandedHeight || 'auto',
        transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
      },
    }
    : {};

  const MotionComponent = draggable || expandable ? motion.div : 'div';

  const motionProps =
    draggable || expandable
      ? {
        variants: expandable ? containerVariants : undefined,
        animate: expandable ? (isExpanded ? 'expanded' : 'collapsed') : undefined,
        onClick: expandable ? handleToggleExpansion : undefined,
        drag: draggable,
        dragConstraints: draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined,
        dragElastic: draggable ? 0.3 : undefined,
        dragTransition: draggable ? { bounceStiffness: 300, bounceDamping: 10, power: 0.3 } : undefined,
        whileDrag: draggable ? { scale: 1.02 } : undefined,
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.98 },
      }
      : {};

  return (
    <>
      {/* Hidden SVG filter — feTurbulence drives feDisplacementMap
          to create the liquid glass distortion on the backdrop */}
      <svg className="liquid-glass-svg-filter" aria-hidden="true">
        <defs>
          <filter
            id="glass-blur"
            x="0" y="0"
            width="100%" height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.007"
              numOctaves="1"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <MotionComponent
        className={`liquid-glass-root ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${expandable ? 'cursor-pointer' : ''} ${className}`}
        style={{
          borderRadius,
          ...(width && !expandable && { width }),
          ...(height && !expandable && { height }),
          ...style,
        }}
        {...motionProps}
        {...props}
      >
        {/* 1. Bend Layer — backdrop blur + SVG liquid distortion */}
        <div
          className={`liquid-glass-bend ${blurClasses[blurIntensity]}`}
          style={{ borderRadius, filter: 'url(#glass-blur)' }}
        />

        {/* 2. Face Layer — outer glow */}
        <div
          className="liquid-glass-face"
          style={{ borderRadius, boxShadow: glowStyles[glowIntensity] }}
        />

        {/* 3. Edge Layer — inset white rim highlight */}
        <div
          className="liquid-glass-edge"
          style={{ borderRadius, boxShadow: shadowStyles[shadowIntensity] }}
        />

        {/* 4. Content */}
        <div className="liquid-glass-content">
          {children}
        </div>
      </MotionComponent>
    </>
  );
};

export default LiquidGlass;
