import HeroSection from '@/components/HeroSection';
import GoogleGeminiEffectDemo from '@/components/google-gemini-effect-demo';
import YorrenGlobeSection from '@/components/YorrenGlobeSection';
import HomeAnimations from '@/components/HomeAnimations';
import HomeBlogGrid from '@/components/HomeBlogGrid';
import IdentityTeaser from '@/components/IdentityTeaser';
import CapabilityMatrix from '@/components/CapabilityMatrix';
import SynapticTimeline from '@/components/SynapticTimeline';
import GlassFAQ from '@/components/GlassFAQ';



export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <GoogleGeminiEffectDemo />
      <CapabilityMatrix />
      <SynapticTimeline />
      <YorrenGlobeSection />

      {/* Core Thesis Section */}
      <section className="thesis-section">
        <div className="container">
          <div className="thesis-glass">
            <div className="thesis-glow" />
            <span className="thesis-tag">THE MISSION</span>
            <h2 className="thesis-statement">To help you master your mind and body. We build the tools you need to adapt, survive, and thrive.</h2>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pillars-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <p>The foundational elements of our methodology, designed to push the boundaries of what it means to be human.</p>
          </div>
          <div className="pillars-grid">
            <div className="pillar-card">
              <span className="pillar-number">01</span>
              <div className="pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v8m0 4v8M2 12h8m4 0h8" /></svg></div>
              <h3>Cognitive Expansion</h3>
              <p>Developing advanced frameworks to enhance neuroplasticity, deep focus, and analytical intelligence.</p>
            </div>
            <div className="pillar-card active">
              <span className="pillar-number">02</span>
              <div className="pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg></div>
              <h3>Strategic Endurance</h3>
              <p>Engineering psychological and physical endurance to maintain absolute clarity in chaotic environments.</p>
            </div>
            <div className="pillar-card">
              <span className="pillar-number">03</span>
              <div className="pillar-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg></div>
              <h3>Mastering Technology</h3>
              <p>Guiding the human mind to adapt and thrive in a rapidly changing, AI-driven future.</p>
            </div>
          </div>
        </div>
      </section>

      <IdentityTeaser />

      <HomeBlogGrid />

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-glass">
            <div className="newsletter-glow" />
            <h3>Deepen Your Practice</h3>
            <p className="newsletter-sub">Join thousands of practitioners redefining what&apos;s possible.</p>
            <div className="input-group">
              <input type="email" placeholder="Email address" />
              <button className="pill-btn white">CHASE <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        </div>
      </section>

      <GlassFAQ />
      <HomeAnimations />
    </main>
  );
}
