import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

const AboutSection = () => {
  const { summary } = portfolioData.about;

  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              textAlign: 'center'
            }}>
              {summary}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
