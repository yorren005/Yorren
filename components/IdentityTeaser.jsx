'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const WHO_WE_ARE = [
  {
    label: '01',
    title: 'A Cognitive Architecture Initiative',
    body: 'We are building a structured framework for how humans think, adapt, and evolve in an era reshaped by artificial intelligence.',
  },
  {
    label: '02',
    title: 'A Research-Driven Platform',
    body: 'Every idea we publish is grounded in philosophy, cognitive science, behavioral research, and real-world observation — not viral opinion.',
  },
  {
    label: '03',
    title: 'A Long-Term Mission',
    body: 'Yorren is not a content calendar. It is a decades-long project to redefine what it means to be a capable human in the 21st century.',
  },
];

const WHAT_WE_ARE_NOT = [
  {
    label: '×',
    title: 'Not a Self-Help Brand',
    body: 'We do not sell affirmations, morning routines, or 5-step systems. We build frameworks that require genuine intellectual engagement.',
  },
  {
    label: '×',
    title: 'Not a Media Company',
    body: 'We do not chase trends, produce content for algorithms, or optimize for engagement over depth. Every word is intentional.',
  },
  {
    label: '×',
    title: 'Not for Everyone',
    body: 'Yorren is built for those who believe human potential is not fixed — and who are willing to do the uncomfortable work of proving it.',
  },
];

export default function IdentityTeaser() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.identity-animate').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('identity-visible');
              }, i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="identity-teaser-section" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="identity-teaser-header identity-animate">
          <span className="tagline">THE YORREN IDENTITY</span>
          <h2 className="identity-teaser-title">
            Clarity on what<br />
            <em className="identity-em">we stand for.</em>
          </h2>
          <p className="identity-teaser-sub">
            In a world flooded with content and noise, we believe the most radical act is to be precise about who you are — and honest about what you are not.
          </p>
        </div>

        {/* Two Columns */}
        <div className="identity-columns">

          {/* Who We Are */}
          <div className="identity-col identity-animate">
            <div className="identity-col-header">
              <span className="identity-col-tag who-tag">WHO WE ARE</span>
              <div className="identity-col-line who-line" />
            </div>
            <div className="identity-cards">
              {WHO_WE_ARE.map((item) => (
                <div className="identity-card who-card identity-animate" key={item.label}>
                  <span className="identity-card-label">{item.label}</span>
                  <div className="identity-card-body">
                    <h3 className="identity-card-title">{item.title}</h3>
                    <p className="identity-card-text">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Are Not */}
          <div className="identity-col identity-animate">
            <div className="identity-col-header">
              <span className="identity-col-tag not-tag">WHAT WE ARE NOT</span>
              <div className="identity-col-line not-line" />
            </div>
            <div className="identity-cards">
              {WHAT_WE_ARE_NOT.map((item) => (
                <div className="identity-card not-card identity-animate" key={item.label}>
                  <span className="identity-card-label not-label">{item.label}</span>
                  <div className="identity-card-body">
                    <h3 className="identity-card-title">{item.title}</h3>
                    <p className="identity-card-text">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="identity-teaser-cta identity-animate">
          <Link href="/identity" className="pill-btn ghost identity-cta-btn">
            READ OUR DIRECTIVE
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
