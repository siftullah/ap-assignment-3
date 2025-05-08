import { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check if localStorage is available (to prevent SSR issues)
  const isBrowser = typeof window !== 'undefined';
  
  // Get stored theme preference or default to 'light'
  const [mode, setMode] = useState('light');
  
  // Effect to load stored theme on initial render
  useEffect(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem('theme-mode');
      if (savedTheme) {
        setMode(savedTheme);
      }
    }
  }, [isBrowser]);
  
  // Toggle theme function
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    
    // Save theme preference to localStorage
    if (isBrowser) {
      localStorage.setItem('theme-mode', newMode);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 