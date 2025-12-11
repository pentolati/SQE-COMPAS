import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Color schemes for dark and light modes
export const themes = {
  dark: {
    name: 'dark',
    bg: {
      primary: '#0F0F1A',
      secondary: 'rgba(255,255,255,0.03)',
      tertiary: 'rgba(255,255,255,0.05)',
      sidebar: 'linear(to-b, #4A148C, #6B21A8, #4338CA)',
      card: 'rgba(255,255,255,0.03)',
      cardHover: 'rgba(255,255,255,0.06)',
      input: 'rgba(255,255,255,0.05)',
      modal: '#1A1A2E',
    },
    text: {
      primary: 'white',
      secondary: 'whiteAlpha.800',
      tertiary: 'whiteAlpha.600',
      muted: 'whiteAlpha.500',
    },
    border: {
      primary: 'rgba(255,255,255,0.08)',
      secondary: 'rgba(255,255,255,0.05)',
      hover: 'rgba(255,255,255,0.15)',
    },
    accent: {
      primary: '#8B5CF6',
      secondary: '#6366F1',
      pink: '#FF6B9D',
      cyan: '#22D3EE',
      green: '#6EE7B7',
    },
    gradient: {
      primary: 'linear(135deg, #6366F1, #8B5CF6)',
      pink: 'linear(135deg, #FF6B9D, #C850C0)',
      cyan: 'linear(135deg, #22D3EE, #6EE7B7)',
    },
  },
  light: {
    name: 'light',
    bg: {
      primary: '#F8FAFC',
      secondary: 'white',
      tertiary: '#F1F5F9',
      sidebar: 'linear(to-b, #6366F1, #8B5CF6, #A855F7)',
      card: 'white',
      cardHover: '#F8FAFC',
      input: 'white',
      modal: 'white',
    },
    text: {
      primary: 'gray.800',
      secondary: 'gray.700',
      tertiary: 'gray.600',
      muted: 'gray.500',
    },
    border: {
      primary: 'gray.200',
      secondary: 'gray.100',
      hover: 'gray.300',
    },
    accent: {
      primary: '#7C3AED',
      secondary: '#4F46E5',
      pink: '#EC4899',
      cyan: '#0891B2',
      green: '#059669',
    },
    gradient: {
      primary: 'linear(135deg, #4F46E5, #7C3AED)',
      pink: 'linear(135deg, #EC4899, #DB2777)',
      cyan: 'linear(135deg, #0891B2, #059669)',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('compas-theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  const theme = isDark ? themes.dark : themes.light;

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('compas-theme', isDark ? 'dark' : 'light');
    // Update body background
    document.body.style.backgroundColor = isDark ? '#0F0F1A' : '#F8FAFC';
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
