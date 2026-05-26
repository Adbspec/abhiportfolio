import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const HeroSection = () => {
  const { name, title, shortIntro, resumeDownloadUrl, email } = portfolioData.personalDetails;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4rem'
      }}
    >
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <span className="pill">Welcome</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}
          >
            Hi, I'm {name}.
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
              fontWeight: 500,
              color: 'var(--accent-primary)',
              marginBottom: '2rem'
            }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem'
            }}
          >
            {shortIntro}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href={resumeDownloadUrl} className="btn-primary" target="_blank" rel="noreferrer" download="Abhishek_Tomar_Resume.pdf">
              <ArrowDown size={18} />
              Download Resume
            </a>
            <a href={`mailto:${email}`} className="btn-secondary">
              <Mail size={18} />
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
