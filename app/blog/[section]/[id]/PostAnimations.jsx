'use client';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function PostAnimations() {
  useEffect(() => {
    gsap.from('.post-header h1', { y: 30, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.2 });
    gsap.from('.post-main-image', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 });
    gsap.from('.post-article-body', { y: 20, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.6 });
  }, []);

  return null;
}
