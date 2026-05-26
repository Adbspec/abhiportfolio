import { motion } from 'framer-motion';
import { Mail, Code, User, FileText } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const ContactSection = () => {
  const { email, github, linkedin, resumeDownloadUrl } = portfolioData.personalDetails;

  return (
    <section id="contact" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.125rem' }}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href={`mailto:${email}`} className="btn-primary">
              <Mail size={20} />
              Say Hello
            </a>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
              <a href={github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex' }}>
                <Code size={24} />
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex' }}>
                <User size={24} />
              </a>
              <a href={resumeDownloadUrl} target="_blank" rel="noreferrer" title="Resume" style={{ color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex' }}>
                <FileText size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default ContactSection;
