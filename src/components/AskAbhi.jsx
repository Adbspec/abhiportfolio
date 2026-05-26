import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AskAbhi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi, I’m the AI projection of Abhishek. I’m here to answer your questions about my professional background, technical expertise, projects, and career potential. Feel free to ask me anything about my profile.", 
      sender: 'ai' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  const quickPrompts = [
    "Summarize Abhi's experience",
    "What are his strongest backend skills?",
    "Describe his AWS projects",
    "Why should we hire Abhi?",
    "Show technical expertise"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Note: We no longer initialize Gemini on the client.
    // The backend handles all AI logic and prompt injection securely.
  }, [isOpen]);

  const handleSend = async (text) => {
    const userText = typeof text === 'string' ? text : input;
    if (!userText.trim()) return;

    const userMsg = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-abhi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userText })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const aiResponse = { id: Date.now() + 1, text: data.response, sender: 'ai' };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: error.message.includes('Rate limit') 
          ? "**Rate Limit Exceeded:** You're asking questions too fast. Please wait a moment." 
          : "I encountered an error connecting to my secure backend. Please try again later.", 
        sender: 'ai',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 999,
          transition: 'transform var(--transition-fast)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Open Ask Abhi AI Assistant"
      >
        <Sparkles size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '400px',
              height: '600px',
              maxHeight: '80vh',
              maxWidth: 'calc(100vw - 4rem)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem',
              backgroundColor: 'var(--accent-primary)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  padding: '8px', 
                  borderRadius: '50%' 
                }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Ask Abhi</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>AI Recruiter Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ 
                  color: 'white', 
                  opacity: 0.8, 
                  transition: 'opacity 0.2s',
                  padding: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <div style={{
              flex: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              backgroundColor: 'var(--bg-primary)'
            }}>
              {messages.map(msg => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                    maxWidth: '85%'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: msg.sender === 'user' ? 'var(--bg-tertiary)' : 'var(--accent-light)',
                    color: msg.sender === 'user' ? 'var(--text-secondary)' : 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div style={{
                    padding: '0.875rem 1.125rem',
                    borderRadius: '16px',
                    borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                    borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    backgroundColor: msg.sender === 'user' ? 'var(--accent-primary)' : msg.isError ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-secondary)',
                    color: msg.sender === 'user' ? 'white' : msg.isError ? '#ef4444' : 'var(--text-primary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    border: msg.sender === 'ai' ? '1px solid var(--border-color)' : 'none',
                    boxShadow: 'var(--shadow-sm)',
                    wordBreak: 'break-word'
                  }}>
                    {msg.sender === 'user' ? (
                      msg.text
                    ) : (
                      <div className="ai-markdown">
                        {msg.isError && <AlertCircle size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />}
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', maxWidth: '85%' }}
                >
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Bot size={16} />
                  </div>
                  <div style={{
                    padding: '1rem 1.25rem', borderRadius: '16px', borderTopLeftRadius: '4px',
                    backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                    display: 'flex', gap: '6px'
                  }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-tertiary)', borderRadius: '50%' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions & Input Area */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
              
              {/* Quick Prompts Carousel */}
              <div style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                gap: '0.5rem', 
                padding: '0.75rem 1rem',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none'  // IE
              }}>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    disabled={isLoading}
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '0.5rem 0.875rem',
                      borderRadius: '99px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--accent-primary)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      cursor: isLoading ? 'default' : 'pointer',
                      opacity: isLoading ? 0.5 : 1,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; }}
                    onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = 'var(--bg-primary)'; }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Form Input */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
                style={{
                  padding: '0 1rem 1.25rem 1rem',
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask a question..."
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.25rem',
                    borderRadius: '99px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: (isLoading || !input.trim()) ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                    color: (isLoading || !input.trim()) ? 'var(--text-tertiary)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                    cursor: (isLoading || !input.trim()) ? 'default' : 'pointer'
                  }}
                >
                  <Send size={20} style={{ marginLeft: '-2px' }} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskAbhi;
