'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STRAPI_URL, getImageUrl } from '@/lib/strapi';

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

export default function HomeBlogGrid() {
  const [grandPicture, setGrandPicture] = useState([]);
  const [syntaxMind, setSyntaxMind] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts(endpoint) {
      try {
        const res = await fetch(`${STRAPI_URL}${endpoint}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json.data || [];
      } catch { return []; }
    }

    Promise.all([
      fetchPosts('/api/the-grand-pictures?populate=*&sort=Date:desc&publicationState=live&pagination[limit]=3'),
      fetchPosts('/api/the-syntax-of-minds?populate=*&sort=Date:desc&publicationState=live&pagination[limit]=3'),
    ]).then(([gp, sm]) => {
      setGrandPicture(gp);
      setSyntaxMind(sm);
      setLoading(false);
      setTimeout(() => {
        gsap.fromTo('.home-blog-section .blog-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-blog-section', start: 'top 85%' } }
        );
        gsap.utils.toArray('.blog-card-image img').forEach((img) => {
          gsap.fromTo(img,
            { scale: 1.15 },
            { scale: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: img, start: 'top 95%' } }
          );
        });
      }, 100);
    });
  }, []);

  const renderCard = (post, sectionKey, index, categoryLabel) => {
    const attrs = post.attributes || post;
    const title = attrs.Title || 'Untitled';
    const imageUrl = getImageUrl(post);
    const docId = post.documentId || post.id;
    const date = formatDate(attrs.Date);
    const readTime = estimateReadingTime(attrs.Blog);
    const isFeatured = index === 0;
    const issueNum = String(index + 1).padStart(2, '0');

    return (
      <article
        key={docId}
        className={`blog-card${isFeatured ? ' blog-card-featured' : ''}`}
        onClick={() => window.location.href = `/blog/${sectionKey}/${docId}`}
      >
        {imageUrl ? (
          <div className="blog-card-image">
            <img src={imageUrl} alt={title} loading="lazy" />
            <div className="blog-card-image-overlay" />
            <span className="blog-card-category-pill">{categoryLabel}</span>
            <span className="blog-card-issue">DISPATCH #{issueNum}</span>
          </div>
        ) : (
          <div className="blog-card-image blog-card-image-placeholder">
            <div className="placeholder-pattern">
              <div className="pattern-line" /><div className="pattern-line" /><div className="pattern-line" />
            </div>
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

  return (
    <section className="home-blog-section">
      <div className="container">
        {/* Grand Picture */}
        <div className="blog-block">
          <div className="blog-block-header">
            <div className="blog-block-header-text">
              <h2>The Grand Picture</h2>
              <p>A macro lens on civilization, systems, and the architecture of human progress.</p>
            </div>
            <a href="/blog" className="pill-btn ghost blog-view-all-btn">
              VIEW ALL
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className={`blog-grid${grandPicture.length > 0 ? ' blog-grid-featured' : ''}`}>
            {loading ? (
              <div className="blog-loading"><div className="loading-spinner" /><span>Loading...</span></div>
            ) : grandPicture.length ? (
              grandPicture.map((p, i) => renderCard(p, 'grand-picture', i, 'THE GRAND PICTURE'))
            ) : (
              <p className="blog-empty-text">No articles published yet.</p>
            )}
          </div>
        </div>

        {/* Syntax of Mind */}
        <div className="blog-block">
          <div className="blog-block-header">
            <div className="blog-block-header-text">
              <h2>The Syntax of Mind</h2>
              <p>Deep dives into cognition, consciousness, and the operating system of the mind.</p>
            </div>
            <a href="/blog" className="pill-btn ghost blog-view-all-btn">
              VIEW ALL
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className={`blog-grid${syntaxMind.length > 0 ? ' blog-grid-featured' : ''}`}>
            {loading ? (
              <div className="blog-loading"><div className="loading-spinner" /><span>Loading...</span></div>
            ) : syntaxMind.length ? (
              syntaxMind.map((p, i) => renderCard(p, 'syntax-mind', i, 'THE SYNTAX OF MIND'))
            ) : (
              <p className="blog-empty-text">No articles published yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
