import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Orb 1 */}
      <motion.div
        animate={{
          x: ['0vw', '10vw', '-10vw', '0vw'],
          y: ['0vh', '10vh', '-5vh', '0vh'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, var(--orb-1, var(--accent-primary)) 0%, transparent 60%)',
          opacity: 0.08,
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      />
      
      {/* Orb 2 */}
      <motion.div
        animate={{
          x: ['0vw', '-10vw', '15vw', '0vw'],
          y: ['0vh', '-10vh', '10vh', '0vh'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(circle, var(--orb-2, var(--accent-primary)) 0%, transparent 60%)',
          opacity: 0.05,
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      />

      {/* Very faint dot grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(var(--text-tertiary) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.15,
        maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
      }} />
    </div>
  );
};

export default BackgroundAnimation;
