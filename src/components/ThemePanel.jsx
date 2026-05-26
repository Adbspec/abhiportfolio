import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Palette, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemePanel = () => {
  const [theme, setTheme] = useState('blue-gray');
  const [mode, setMode] = useState('light');
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    // Load from local storage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'blue-gray';
    const savedMode = localStorage.getItem('portfolio-mode');
    
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (savedMode) {
      setMode(savedMode);
      if (savedMode === 'dark') {
        document.documentElement.setAttribute('data-mode', 'dark');
      } else {
        document.documentElement.removeAttribute('data-mode');
      }
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setMode('dark');
        document.documentElement.setAttribute('data-mode', 'dark');
      }
    }

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'blue-gray') {
      // Default theme, we can remove the attribute or keep it
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    if (newMode === 'dark') {
      document.documentElement.setAttribute('data-mode', 'dark');
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
    localStorage.setItem('portfolio-mode', newMode);
  };

  const themes = [
    { id: 'blue-gray', name: 'Blue-Gray', color: '#4F46E5', bg: '#F8FAFC' },
    { id: 'executive', name: 'Executive', color: '#2563EB', bg: '#FAF9F6' },
    { id: 'sage', name: 'Sage', color: '#0F766E', bg: '#F7FAF9' },
    { id: 'ocean-pearl', name: 'Ocean Pearl Delight', color: '#e29578', bg: '#edf6f9' },
    { id: 'monochrome-beach', name: 'Monochrome Beach', color: '#52796F', bg: '#F4F7F6' },
    { id: 'neutral-elegance', name: 'Neutral Elegance', color: '#E0AFA0', bg: '#F4F3EE' }
  ];

  return (
    <div 
      ref={panelRef}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Customize Theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          color: 'var(--text-primary)',
          transition: 'all var(--transition-fast)',
        }}
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.75rem',
              width: '280px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Appearance</h3>
              <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-tertiary)' }}>
                <X size={18} />
              </button>
            </div>

            {/* Mode Toggle */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Mode</label>
              <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
                <button
                  onClick={() => mode !== 'light' && toggleMode()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: mode === 'light' ? 'var(--bg-secondary)' : 'transparent',
                    color: mode === 'light' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: mode === 'light' ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Sun size={16} /> Light
                </button>
                <button
                  onClick={() => mode !== 'dark' && toggleMode()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: mode === 'dark' ? 'var(--bg-secondary)' : 'transparent',
                    color: mode === 'dark' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: mode === 'dark' ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Moon size={16} /> Dark
                </button>
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Color Palette</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => selectTheme(t.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      backgroundColor: theme === t.id ? 'var(--bg-tertiary)' : 'transparent',
                      transition: 'background-color 0.2s',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: t.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '2px solid var(--bg-secondary)',
                      boxShadow: '0 0 0 1px var(--border-color)'
                    }}>
                      {theme === t.id && <Check size={12} color="#ffffff" />}
                    </div>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: theme === t.id ? 600 : 500,
                      color: theme === t.id ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}>
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePanel;
