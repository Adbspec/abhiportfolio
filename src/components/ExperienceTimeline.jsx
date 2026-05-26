import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const ExperienceTimeline = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container">
        <h2 className="section-title">Experience</h2>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'var(--accent-light)',
            zIndex: 0
          }} />

          {experience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ 
                position: 'relative', 
                paddingLeft: '60px',
                marginBottom: index === experience.length - 1 ? 0 : '3rem',
                zIndex: 1
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '8px',
                top: '0',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
                border: '4px solid var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Briefcase size={12} />
              </div>

              <div className="card">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.25rem' }}>
                      {exp.role}
                    </h3>
                    <div style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: '0.25rem' }}>
                      {exp.company}
                    </div>
                  </div>
                  <div className="pill" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>

                <ul style={{ 
                  margin: 0, 
                  paddingLeft: '1.5rem', 
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} style={{ lineHeight: 1.6 }}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
