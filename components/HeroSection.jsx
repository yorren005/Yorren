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
    let dots = [];
    const mouse = { x: -9999, y: -9999 };
    let rafId;
    const DOT_COUNT = 120;
    const MOUSE_RADIUS = 200;

    class Dot {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseRadius = Math.random() * 1.5 + 0.5;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.baseOpacity = this.opacity;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const ratio = 1 - dist / MOUSE_RADIUS;
          this.radius = this.baseRadius + ratio * 2.5;
          this.opacity = this.baseOpacity + ratio * 0.5;
          // Gentle repulsion
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * ratio * 0.15;
          this.vy += Math.sin(angle) * ratio * 0.15;
        } else {
          this.radius += (this.baseRadius - this.radius) * 0.05;
          this.opacity += (this.baseOpacity - this.opacity) * 0.05;
        }
        // Damping
        this.vx *= 0.995;
        this.vy *= 0.995;
      }
    }

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      dots = [];
      for (let i = 0; i < DOT_COUNT; i++) dots.push(new Dot());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      for (let i = 0; i < dots.length; i++) {
        dots[i].update();
        const d = dots[i];
        const color = isLight ? `rgba(0,0,0,${d.opacity})` : `rgba(255,255,255,${d.opacity})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < dots.length; j++) {
          const dx = d.x - dots[j].x;
          const dy = d.y - dots[j].y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 160;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.08;
            ctx.strokeStyle = isLight ? `rgba(0,0,0,${lineAlpha})` : `rgba(255,255,255,${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle gradient orb near cursor
      const dx = mouse.x, dy = mouse.y;
      if (dx > 0 && dy > 0) {
        const grad = ctx.createRadialGradient(dx, dy, 0, dx, dy, 180);
        if (isLight) {
          grad.addColorStop(0, 'rgba(100, 120, 200, 0.06)');
          grad.addColorStop(1, 'rgba(100, 120, 200, 0)');
        } else {
          grad.addColorStop(0, 'rgba(59, 130, 246, 0.06)');
          grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

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

      gsap.from('.status-pill', { x: -30, opacity: 0, duration: 1, delay: 2, ease: 'power3.out' });
      gsap.from('.proof-label', { y: 15, opacity: 0, duration: 0.8, delay: 2.2, ease: 'power3.out' });
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

    // Status clock
    function updateStatusTime() {
      const timeEl = document.getElementById('status-time');
      if (timeEl) {
        timeEl.textContent = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
    }
    const clockInterval = setInterval(updateStatusTime, 1000);
    updateStatusTime();

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(clockInterval);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="hero-section">
      <canvas id="neural-canvas" ref={canvasRef} />
      <div className="hero-overlay" />
      <div className="status-pill" id="status-pill">
        <span className="status-dot" />
        <span className="status-text">SYSTEM ACTIVE // <span id="status-time">00:00:00</span></span>
      </div>
      <div className="container">
        <div className="hero-monolith">
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
