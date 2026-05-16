'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeAnimations() {
  useEffect(() => {
    // Section scroll reveals
    gsap.from('.thesis-section', {
      opacity: 0, y: 40, duration: 0.8,
      scrollTrigger: { trigger: '.thesis-section', start: 'top 85%', toggleActions: 'play none none none' },
    });
    gsap.from('.pillars-section .section-header', {
      opacity: 0, y: 40, duration: 0.8,
      scrollTrigger: { trigger: '.pillars-section', start: 'top 80%', toggleActions: 'play none none none' },
    });
    gsap.from('.pillar-card', {
      opacity: 0, y: 40, scale: 0.95, stagger: 0.15, duration: 0.8, ease: 'power3.out', clearProps: 'all',
      scrollTrigger: { trigger: '.pillars-grid', start: 'top 85%', toggleActions: 'play none none none' },
    });
    gsap.from('.newsletter-glass', {
      opacity: 0, y: 40, scale: 0.98, duration: 1,
      scrollTrigger: { trigger: '.newsletter-section', start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Pillar card 3D tilt
    const cards = document.querySelectorAll('.pillar-card');
    cards.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(card, { rotateX: ((y - rect.height / 2) / rect.height) * -5, rotateY: ((x - rect.width / 2) / rect.width) * 5, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
      };
      const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });

    // Refresh ScrollTrigger after dynamic content loads
    setTimeout(() => ScrollTrigger.refresh(), 2000);
    setTimeout(() => ScrollTrigger.refresh(), 5000);
  }, []);

  return null; // This component only applies side effects
}
