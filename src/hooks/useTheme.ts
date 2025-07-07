import { useEffect, useState } from 'react';

export function useTheme() {
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme === 'dark') {
        setResolvedTheme('dark');
      } else if (storedTheme === 'light') {
        setResolvedTheme('light');
      } else {
        // Auto mode - check if dark class is present or use media query
        const isDark = document.documentElement.classList.contains('dark') || 
                      window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(isDark ? 'dark' : 'light');
      }
    };

    // Initial theme
    updateTheme();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    // Listen for storage changes (theme changes from other tabs)
    window.addEventListener('storage', updateTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', updateTheme);
      window.removeEventListener('storage', updateTheme);
    };
  }, []);

  return resolvedTheme;
}