'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STRAPI_URL, getImageUrl } from '@/lib/strapi';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

gsap.registerPlugin(ScrollTrigger);

function estimateReadingTime(text) {
  if (!text) return '3 min read';
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const [activeSection, setActiveSection] = useState('grand-picture');
  const [posts, setPosts] = useState({ 'grand-picture': [], 'syntax-mind': [] });
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const arrowRef = useRef(null);
  const gridRef = useRef(null);

  const sections = {
    'grand-picture': { label: 'The Grand Picture', number: '01', desc: 'A macro lens on civilization, systems, and the architecture of human progress.', endpoint: '/api/the-grand-pictures?populate=*&sort=Date:desc&publicationState=live' },
    'syntax-mind': { label: 'The Syntax of Mind', number: '02', desc: 'Deep dives into cognition, consciousness, and the operating system of the mind.', endpoint: '/api/the-syntax-of-minds?populate=*&sort=Date:desc&publicationState=live' },
  };

  useEffect(() => {
    async function fetchAll() {
      const results = {};
      for (const [key, sec] of Object.entries(sections)) {
        try {
          const res = await fetch(`${STRAPI_URL}${sec.endpoint}`);
          const json = await res.json();
          results[key] = json.data || [];
        } catch { results[key] = []; }
      }
      setPosts(results);
      setLoading(false);
    }
    fetchAll();

    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    heroTl
      .from('.blog-hero .tagline', { y: 20, opacity: 0 }, 0.2)
      .from('.blog-hero-title', { y: 40, opacity: 0, duration: 1 }, 0.3)
      .from('.blog-hero-sub', { y: 20, opacity: 0 }, 0.5)
      .from('.toggle-track', { y: 30, opacity: 0, duration: 0.8 }, 0.7)
      .from('.blog-section-header', { y: 30, opacity: 0, duration: 0.8 }, 0.9);
  }, []);

  const switchSection = (target) => {
    if (target === activeSection || transitioning) return;
    setTransitioning(true);

    gsap.to(arrowRef.current, { rotation: target === 'syntax-mind' ? 0 : 180, duration: 0.4, ease: 'power2.inOut' });

    // Crossfade transition
    const gridEl = gridRef.current;
    if (gridEl) {
      gsap.to(gridEl, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveSection(target);
          gsap.fromTo(gridEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', onComplete: () => setTransitioning(false) }
          );
        }
      });
    } else {
      setActiveSection(target);
      setTransitioning(false);
    }
  };

  const renderCard = (post, sectionKey, index) => {
    const attrs = post.attributes || post;
    const title = attrs.Title || 'Untitled';
    const imageUrl = getImageUrl(post);
    const docId = post.documentId || post.id;
    const date = formatDate(attrs.Date);
    const readTime = estimateReadingTime(attrs.Blog);
    const issueNum = String(index + 1).padStart(2, '0');
    const categoryLabel = sectionKey === 'grand-picture' ? 'THE GRAND PICTURE' : 'THE SYNTAX OF MIND';

    return (
      <article key={docId} className="blog-card" onClick={() => window.location.href = `/blog/${sectionKey}/${docId}`}>
        {imageUrl ? (
          <div className="blog-card-image">
            <img src={imageUrl} alt={title} loading="lazy" />
            <div className="blog-card-image-overlay" />
            <span className="blog-card-category-pill">{categoryLabel}</span>
            <span className="blog-card-issue">DISPATCH #{issueNum}</span>
          </div>
        ) : (
          <div className="blog-card-image blog-card-image-placeholder">
            <div className="placeholder-pattern"><div className="pattern-line" /><div className="pattern-line" /><div className="pattern-line" /></div>
            <span className="blog-card-category-pill">{categoryLabel}</span>
          </div>
        )}
        <div className="blog-card-body">
          <h3 className="blog-card-title">{title}</h3>
          {(date || readTime) && (
            <div className="blog-card-meta">
              {date && <span>{date}</span>}
              {date && readTime && <span className="meta-dot">&middot;</span>}
              {readTime && <span>{readTime}</span>}
            </div>
          )}
        </div>
      </article>
    );
  };

  const currentSection = sections[activeSection];
  const currentPosts = posts[activeSection];

  return (
    <main>
      <section className="blog-hero">
        <div className="blog-hero-grain" />
        <DottedGlowBackground
          className="pointer-events-none"
          opacity={0.8}
          gap={14}
          radius={1.2}
          colorLightVar="--color-neutral-400"
          glowColorLightVar="--color-neutral-500"
          colorDarkVar="--color-neutral-500"
          glowColorDarkVar="--color-sky-700"
          backgroundOpacity={0}
          speedMin={0.2}
          speedMax={1}
          speedScale={0.8}
        />
        <div className="container">
          <div className="hero-tagline-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <span className="tagline" style={{ position: 'relative', zIndex: 1 }}>DISPATCHES FROM THE FRONTIER</span>
          </div>
          <h1 className="blog-hero-title" id="blog-hero-title">The Blog</h1>
          <p className="blog-hero-sub">Exploring the intersection of cognition, physicality, and philosophy.</p>
        </div>
      </section>

      <section className="blog-toggle-nav">
        <div className="container">
          <div className="toggle-track" id="toggle-track">
            <button className={`toggle-section${activeSection === 'grand-picture' ? ' active' : ''}`} onClick={() => switchSection('grand-picture')}>
              <span className="toggle-label">The Grand Picture</span>
              <span className="toggle-count">{posts['grand-picture'].length}</span>
            </button>
            <div className="toggle-arrow-container" ref={arrowRef}>
              <button className="toggle-arrow-btn" onClick={() => switchSection(activeSection === 'grand-picture' ? 'syntax-mind' : 'grand-picture')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
              </button>
            </div>
            <button className={`toggle-section${activeSection === 'syntax-mind' ? ' active' : ''}`} onClick={() => switchSection('syntax-mind')}>
              <span className="toggle-label">The Syntax of Mind</span>
              <span className="toggle-count">{posts['syntax-mind'].length}</span>
            </button>
          </div>
        </div>
      </section>

      <section className="blog-content-area">
        <div className="container">
          <div className="blog-section active">
            <div className="blog-section-header">
              <div className="section-meta">
                <span className="section-number">{currentSection.number}</span>
                <h2>{currentSection.label}</h2>
              </div>
              <p className="section-description">{currentSection.desc}</p>
            </div>
            <div className="blog-grid" ref={gridRef}>
              {loading ? (
                <div className="blog-loading"><div className="loading-spinner" /><span>Loading articles...</span></div>
              ) : currentPosts.length ? (
                currentPosts.map((p, i) => renderCard(p, activeSection, i))
              ) : (
                <div className="blog-empty">
                  <div className="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg></div>
                  <p>No articles published yet.</p><span>Check back soon for insights.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
