import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

const SkillsSection = () => {
  const { skills } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div 
              key={category}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {category}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
              >
                {items.map(skill => (
                  <motion.span 
                    key={skill} 
                    variants={itemVariants}
                    className="pill"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
