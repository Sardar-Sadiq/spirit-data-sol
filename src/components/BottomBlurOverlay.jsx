import React from 'react';

const BottomBlurOverlay = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-24 md:h-32 pointer-events-none z-40">
      <div className='' style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '22px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backdropFilter: 'blur(0.1796875px)',
            WebkitBackdropFilter: 'blur(0.1796875px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            backdropFilter: 'blur(0.359375px)',
            WebkitBackdropFilter: 'blur(0.359375px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            backdropFilter: 'blur(0.71875px)',
            WebkitBackdropFilter: 'blur(0.71875px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            backdropFilter: 'blur(1.4375px)',
            WebkitBackdropFilter: 'blur(1.4375px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            backdropFilter: 'blur(2.875px)',
            WebkitBackdropFilter: 'blur(2.875px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 6,
            backdropFilter: 'blur(5.75px)',
            WebkitBackdropFilter: 'blur(5.75px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 7,
            backdropFilter: 'blur(11.5px)',
            WebkitBackdropFilter: 'blur(11.5px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 8,
            backdropFilter: 'blur(23px)',
            WebkitBackdropFilter: 'blur(23px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)',
            borderRadius: '22px',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default BottomBlurOverlay;
