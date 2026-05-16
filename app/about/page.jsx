export const metadata = {
  title: 'YORREN | The Architect',
  description: 'Yogeshwaran Balaji is the mind behind Yorren.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="about-page-hero">
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <span className="tagline">THE ARCHITECT</span>
              <h1 className="about-hero-title">Yogeshwaran</h1>
              <p className="about-hero-sub">The mind behind <strong>Yorren</strong>, an initiative to redefine what humans are capable of in a world being reshaped by artificial intelligence.</p>
            </div>
            <div className="about-hero-image">
              <img src="/assets/yogeshwaran-1.jpg" alt="Yogeshwaran" className="img-hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Foundation */}
      <section className="about-page-foundation">
        <div className="container">
          <div className="about-foundation-grid">
            <div className="about-foundation-image">
              <img src="/assets/yogeshwaran-2.jpg" alt="Yogeshwaran" className="img-foundation" />
            </div>
            <div className="about-foundation-content">
              <p className="about-text-large">He started with a question most people ignore: what happens to the human mind and body when the world around us evolves faster than we do? That question became an obsession and, eventually, a mission.</p>
              <p className="about-text-large">Yorren is the answer. Not a self-help brand, but a structured framework for upgrading how we think, how we move, and how we adapt, built for the people who refuse to be left behind by the century they live in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="about-page-philosophy">
        <div className="container">
          <div className="philosophy-header">
            <h2 className="philosophy-title">Core Philosophy</h2>
          </div>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <h3>Cognitive Expansion</h3>
              <p>Developing sharper thinking, deeper focus, and the mental clarity needed to navigate an era of infinite information.</p>
            </div>
            <div className="philosophy-card">
              <h3>Human-AI Synthesis</h3>
              <p>Understanding how to harness artificial intelligence as an extension of human intuition, not a replacement for it.</p>
            </div>
            <div className="philosophy-card highlight">
              <h3>Physical Evolution</h3>
              <p>The mind cannot outperform the body. We pursue peak physicality as the foundation for every other form of growth.</p>
            </div>
          </div>
          <div className="philosophy-footer">
            <p className="about-text-final">Yorren exists for those who believe human potential is not fixed, and that the 21st century demands we prove it.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
