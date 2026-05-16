'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STRAPI_URL, getImageUrl } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

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
      // Animate after render
      setTimeout(() => {
        gsap.fromTo('.home-blog-section .blog-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-blog-section', start: 'top 85%' } }
        );
      }, 100);
    });
  }, []);

  const renderCard = (post, sectionKey) => {
    const attrs = post.attributes || post;
    const title = attrs.Title || 'Untitled';
    const imageUrl = getImageUrl(post);
    const docId = post.documentId || post.id;

    return (
      <article key={docId} className="blog-card" onClick={() => window.location.href = `/blog/${sectionKey}/${docId}`}>
        {imageUrl ? (
          <div className="blog-card-image">
            <img src={imageUrl} alt={title} loading="lazy" />
            <div className="blog-card-image-overlay" />
          </div>
        ) : (
          <div className="blog-card-image blog-card-image-placeholder">
            <div className="placeholder-pattern">
              <div className="pattern-line" /><div className="pattern-line" /><div className="pattern-line" />
            </div>
          </div>
        )}
        <div className="blog-card-body">
          <h3 className="blog-card-title">{title}</h3>
        </div>
      </article>
    );
  };

  return (
    <section className="home-blog-section" style={{ padding: '6rem 0' }}>
      <div className="container">
        {/* Grand Picture */}
        <div className="blog-block" style={{ marginBottom: '6rem' }}>
          <div className="section-header flex">
            <div><h2>The Grand Picture</h2><p>A macro lens on civilization, systems, and the architecture of human progress.</p></div>
            <a href="/blog" className="view-all">VIEW ALL →</a>
          </div>
          <div className="blog-grid">
            {loading ? <div className="blog-loading"><div className="loading-spinner" /><span>Loading...</span></div> : grandPicture.length ? grandPicture.map((p) => renderCard(p, 'grand-picture')) : <p style={{ color: '#666' }}>No articles published yet.</p>}
          </div>
        </div>
        {/* Syntax of Mind */}
        <div className="blog-block">
          <div className="section-header flex">
            <div><h2>The Syntax of Mind</h2><p>Deep dives into cognition, consciousness, and the operating system of the mind.</p></div>
            <a href="/blog" className="view-all">VIEW ALL →</a>
          </div>
          <div className="blog-grid">
            {loading ? <div className="blog-loading"><div className="loading-spinner" /><span>Loading...</span></div> : syntaxMind.length ? syntaxMind.map((p) => renderCard(p, 'syntax-mind')) : <p style={{ color: '#666' }}>No articles published yet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
