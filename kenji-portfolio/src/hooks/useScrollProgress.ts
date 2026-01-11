import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Returns scroll progress as a value between 0 and 1
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(scrollHeight > 0 ? scrolled / scrollHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

/**
 * Returns a parallax offset value based on scroll position
 * @param speed - Parallax speed multiplier (default: 0.5)
 */
export function useParallax(speed: number = 0.5): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

/**
 * Tracks whether an element is in the viewport and adds reveal class
 * @param threshold - Visibility threshold (0-1)
 * @param once - Whether to only trigger once
 */
export function useReveal<T extends HTMLElement>(
  threshold: number = 0.1,
  once: boolean = true
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, isRevealed];
}

/**
 * Returns the scroll progress within a specific section
 * @param sectionRef - Reference to the section element
 */
export function useSectionProgress<T extends HTMLElement>(
  sectionRef: RefObject<T>
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate progress: 0 when section enters viewport, 1 when it leaves
      const rawProgress = (viewportHeight - sectionTop) / (viewportHeight + sectionHeight);
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  return progress;
}

/**
 * Returns scroll direction
 */
export function useScrollDirection(): 'up' | 'down' | null {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setDirection('up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return direction;
}
