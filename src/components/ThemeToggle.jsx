import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Palette, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    localStorage.setItem('portfolio-theme', newTheme);
    setIsOpen(false);
  };

  const themes = [
    { id: 'light', name: 'Light', icon: <Sun size={16} /> },
    { id: 'dark', name: 'Dark', icon: <Moon size={16} /> },
    { id: 'warm', name: 'Warm', icon: <Palette size={16} /> }
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div 
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '99px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          color: 'var(--text-primary)',
          transition: 'all var(--transition-fast)',
          fontSize: '0.875rem',
          fontWeight: 500
        }}
      >
        {currentTheme.icon}
        {currentTheme.name}
        <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              width: '150px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => selectTheme(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: theme === t.id ? 'var(--bg-tertiary)' : 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  border: 'none',
                  borderBottom: t.id !== themes[themes.length - 1].id ? '1px solid var(--border-color)' : 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (theme !== t.id) e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  if (theme !== t.id) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.icon}
                {t.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
