'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PostAnimations() {
  useEffect(() => {
    // 1. Entrance animation
    gsap.from('.post-header .post-meta', { y: 15, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.post-title', { y: 25, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.1 });
    gsap.from('.post-author-info', { y: 15, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.from('.post-main-image', { y: 35, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
    gsap.from('.post-article-body', { y: 20, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.5 });
    gsap.from('.post-navigation-section', { opacity: 0, y: 20, duration: 1, ease: 'power2.out', delay: 0.7 });

    // 2. Reading progress bar handler
    const updateProgress = () => {
      const progressBar = document.getElementById('readingProgressBar');
      if (!progressBar) return;

      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const trackLength = docHeight - windowHeight;
      const pct = trackLength > 0 ? (scrollTop / trackLength) * 100 : 0;

      progressBar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return null;
}
