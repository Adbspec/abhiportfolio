import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import portfolioData from '../../data/portfolio.json';
import ArchitectureFlow from './ArchitectureFlow';

const ProjectsSection = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
                    {project.description}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {project.sourceLink && project.sourceLink !== '#' && (
                    <a href={project.sourceLink} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                      <Code size={18} /> Code
                    </a>
                  )}
                  {project.liveLink && project.liveLink !== '#' && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tech Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techStack.map(tech => (
                    <span key={tech} className="pill" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Temporarily hidden System Architecture
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  System Architecture
                </h4>
                {project.flowVisualization && (
                  <ArchitectureFlow flowData={project.flowVisualization} />
                )}
              </div>
              */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
