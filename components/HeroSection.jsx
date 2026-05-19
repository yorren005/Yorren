'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const mouse = { x: -9999, y: -9999 };
    let rafId;

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function animate() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.fillStyle = isLight ? 'rgba(250, 250, 250, 1)' : 'rgba(10, 10, 12, 1)';
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() * 0.0005;

      const drawOrb = (x, y, radius, color) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      // Blend mode for ambient glowing
      ctx.globalCompositeOperation = isLight ? 'multiply' : 'screen';

      // Amber and Gold hues, softened opacity for a subtle glow
      const color1 = isLight ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.3)'; // Amber
      const color2 = isLight ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.3)'; // Gold

      // Slow moving massive orbs
      drawOrb(width * 0.3 + Math.sin(time) * 200, height * 0.4 + Math.cos(time * 0.8) * 150, width * 0.6, color1);
      drawOrb(width * 0.7 + Math.cos(time * 1.2) * 200, height * 0.6 + Math.sin(time * 0.9) * 150, width * 0.5, color2);
      
      // Cursor aura (Warm Orange)
      if (mouse.x > 0 && mouse.y > 0) {
        drawOrb(mouse.x, mouse.y, width * 0.4, isLight ? 'rgba(251, 146, 60, 0.15)' : 'rgba(251, 146, 60, 0.25)');
      }

      ctx.globalCompositeOperation = 'source-over';
      rafId = requestAnimationFrame(animate);
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    init();
    animate();

    // Typewriter
    const headline = document.getElementById('hero-headline');
    const typewriterText = "Unlock Your True Potential.";
    if (headline) {
      headline.innerHTML = '<span class="typewriter-content"></span><span class="typewriter-cursor"></span>';
      const content = headline.querySelector('.typewriter-content');
      let i = 0;
      function type() {
        if (i < typewriterText.length) {
          content.textContent += typewriterText.charAt(i);
          i++;
          setTimeout(type, Math.random() * 50 + 50);
        }
      }

      const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 }, onComplete: () => ScrollTrigger.refresh() });
      heroTl
        .from('.navbar', { y: -100, opacity: 0 })
        .from('.hero-monolith', { y: 40, opacity: 0, scale: 0.98, duration: 1.5, ease: 'power3.out' }, '-=0.8')
        .from('.tagline', { y: 20, opacity: 0 }, '-=1.0')
        .call(type, null, '-=0.5')
        .from('.hero-subtext', { y: 20, opacity: 0 }, '+=1.8')
        .from('.hero-actions', { y: 20, opacity: 0 }, '-=0.8');

      gsap.from('.proof-label', { y: 15, opacity: 0, duration: 0.8, delay: 2.2, ease: 'power3.out' });
      gsap.from('.proof-logo', { y: 15, opacity: 0, stagger: 0.1, duration: 0.8, delay: 2.3, ease: 'power3.out' });
    }

    // Scroll indicator
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
      let scrollHidden = false;
      const onScroll = () => {
        if (window.scrollY > 80 && !scrollHidden) { scrollHidden = true; scrollIndicator.classList.add('hidden'); }
        else if (window.scrollY <= 80 && scrollHidden) { scrollHidden = false; scrollIndicator.classList.remove('hidden'); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }



    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="hero-section">
      <canvas id="neural-canvas" ref={canvasRef} />
      <div className="hero-overlay" />
      <div className="container">
        <div 
          className="hero-monolith"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          }}
        >
          <h1 className="hero-headline" id="hero-headline">Unlock Your True Potential.</h1>
          <p className="hero-subtext">An initiative to rethink human capability in the age of artificial intelligence.</p>
          <div className="hero-actions">
            <button className="pill-btn white" onClick={() => document.querySelector('.home-blog-section')?.scrollIntoView({ behavior: 'smooth' })}>
              EXPLORE INSIGHTS <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14l-7 7-7-7M12 21V3" /></svg>
            </button>
          </div>
        </div>
        <div className="proof-strip">
          <span className="proof-label">RESEARCH SYNTHESIS FROM PIONEERS AT</span>
          <div className="proof-logos">
            <svg className="proof-logo" viewBox="0 0 110 30" fill="currentColor"><text x="5" y="22" fontFamily="Georgia, serif" fontWeight="400" fontSize="20" letterSpacing="-0.02em">Stanford</text></svg>
            <svg className="proof-logo" viewBox="0 0 60 30" fill="currentColor"><text x="5" y="22" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="22" letterSpacing="0.05em">MIT</text></svg>
            <svg className="proof-logo" viewBox="0 0 110 30" fill="currentColor"><text x="5" y="22" fontFamily="'Times New Roman', serif" fontWeight="400" fontSize="20" letterSpacing="0.02em">HARVARD</text></svg>
            <svg className="proof-logo" viewBox="0 0 100 30" fill="currentColor">
              <circle cx="15" cy="15" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="15" cy="15" r="2" fill="currentColor" />
              <text x="32" y="20" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="16" letterSpacing="-0.03em">OpenAI</text>
            </svg>
          </div>
        </div>
      </div>
      <div className="scroll-indicator" id="scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span className="scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
