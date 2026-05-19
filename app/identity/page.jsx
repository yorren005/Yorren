import Link from 'next/link';

export const metadata = {
  title: 'YORREN | Who We Are & What We Are Not',
  description:
    'A full brand manifesto. Understand what Yorren stands for, what drives our mission, and where we draw the line.',
};

const WHO_ITEMS = [
  {
    number: '01',
    title: 'A Cognitive Architecture Initiative',
    body: 'Yorren is built around one foundational question: what happens to the human mind and body when the world evolves faster than we do? We exist to answer it — methodically, honestly, and without shortcut.',
  },
  {
    number: '02',
    title: 'A Research-Driven Platform',
    body: 'Every essay, framework, and idea published under the Yorren name is grounded in philosophy, cognitive science, behavioral research, and direct observation. We cite our sources. We question our assumptions. We update when we are wrong.',
  },
  {
    number: '03',
    title: 'A Framework for Extreme Human Adaptation',
    body: 'We are not here to make you feel better about where you are. We are here to give you the architecture to become what the next era demands — cognitively sharper, physically more resilient, and strategically aligned with how intelligence itself is evolving.',
  },
  {
    number: '04',
    title: 'A Long-Term Mission',
    body: 'Yorren is not a content calendar or a newsletter brand. It is a decades-long project. The work compounds. The frameworks deepen. The community that builds around it does so because they understand that meaningful change is not quarterly.',
  },
  {
    number: '05',
    title: 'A Global Intellectual Community',
    body: 'We draw from pioneers at Stanford, MIT, Harvard, and OpenAI — not as name-drops, but because the ideas we synthesize are shaped by the best minds working on human cognition, AI alignment, and behavioral science. We make that research accessible and actionable.',
  },
];

const NOT_ITEMS = [
  {
    title: 'Not a Self-Help Brand',
    body: 'We do not sell affirmations, morning routines, gratitude journals, or 5-step systems to a better life. If you are looking for that, there are thousands of creators who can help you. Yorren is not one of them.',
  },
  {
    title: 'Not a Media Company',
    body: 'We do not chase trending topics, produce content for algorithms, or measure success in impressions. We optimise for depth, precision, and long-term value. We would rather permanently change one reader than have a million scroll past.',
  },
  {
    title: 'Not a Motivational Platform',
    body: 'Motivation is a poor substitute for architecture. We are not here to make you feel energised for 48 hours. We are here to give you systems, mental models, and frameworks that function when motivation disappears — which it always does.',
  },
  {
    title: 'Not a Personal Brand',
    body: 'While Yorren was founded by Yogeshwaran, the mission is larger than any one person. The ideas belong to the framework. The framework belongs to the mission. The mission belongs to everyone who refuses to be left behind by the century they live in.',
  },
  {
    title: 'Not for Everyone',
    body: 'We mean this literally, not as marketing scarcity. Yorren is built for a specific type of person — someone who believes human potential is not fixed, who is comfortable with complexity, and who is willing to do the uncomfortable, patient work of genuine self-architecture.',
  },
];

const PRINCIPLES = [
  { label: 'PRECISION', desc: 'We say exactly what we mean. No vague inspiration.' },
  { label: 'DEPTH', desc: 'We go further than the surface. Always.' },
  { label: 'HONESTY', desc: 'We update when evidence changes. We admit uncertainty.' },
  { label: 'PATIENCE', desc: 'We build for decades, not quarters.' },
];

export default function IdentityPage() {
  return (
    <main>
      {/* Hero */}
      <section className="identity-page-hero">
        <div className="container">
          <span className="tagline">THE YORREN MANIFESTO</span>
          <h1 className="identity-page-title">
            Who We Are.<br />
            <span className="identity-page-title-contrast">What We Are Not.</span>
          </h1>
          <p className="identity-page-sub">
            Clarity is a form of respect. Here is ours.
          </p>
        </div>
        <div className="identity-hero-divider" />
      </section>

      {/* Who We Are */}
      <section className="identity-page-section">
        <div className="container">
          <div className="identity-page-col-label who-col-label">WHO WE ARE</div>
          <div className="identity-page-items">
            {WHO_ITEMS.map((item) => (
              <div className="identity-page-item" key={item.number}>
                <span className="identity-page-item-num">{item.number}</span>
                <div className="identity-page-item-content">
                  <h2 className="identity-page-item-title">{item.title}</h2>
                  <p className="identity-page-item-body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider Quote */}
      <section className="identity-quote-section">
        <div className="container">
          <blockquote className="identity-quote">
            &ldquo;Yorren exists for those who believe human potential is not fixed &mdash; and that the 21st century demands we prove it.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* What We Are Not */}
      <section className="identity-page-section identity-not-section">
        <div className="container">
          <div className="identity-page-col-label not-col-label">WHAT WE ARE NOT</div>
          <div className="identity-page-items">
            {NOT_ITEMS.map((item, i) => (
              <div className="identity-page-item identity-not-item" key={i}>
                <span className="identity-page-item-num not-num">×</span>
                <div className="identity-page-item-content">
                  <h2 className="identity-page-item-title">{item.title}</h2>
                  <p className="identity-page-item-body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="identity-principles-section">
        <div className="container">
          <span className="tagline">OPERATING PRINCIPLES</span>
          <h2 className="identity-principles-title">How we work.</h2>
          <div className="identity-principles-grid">
            {PRINCIPLES.map((p) => (
              <div className="identity-principle-card" key={p.label}>
                <span className="identity-principle-label">{p.label}</span>
                <p className="identity-principle-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="identity-final-cta">
        <div className="container">
          <h2 className="identity-final-title">If this resonates,<br />you belong here.</h2>
          <p className="identity-final-sub">Start with the blog. Let the ideas find you.</p>
          <div className="identity-final-actions">
            <Link href="/blog" className="pill-btn white">
              EXPLORE THE BLOG
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/about" className="pill-btn ghost">
              MEET THE FOUNDER
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
