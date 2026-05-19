"use client";
import { IconBrain, IconMoon, IconTarget, IconShield } from "@tabler/icons-react";

export default function CapabilityMatrix() {
  return (
    <section className="bento-section">
      <div className="container">
        <div className="section-header">
          <h2>Capability Matrix</h2>
          <p>The protocols and systems designed for extreme human adaptation.</p>
        </div>
        <div className="bento-grid">
          <div className="bento-card large">
            <div className="bento-icon"><IconBrain size={32} /></div>
            <h3>Neuroplasticity Engine</h3>
            <p>Accelerated learning and cognitive rewiring frameworks.</p>
            <div className="bento-metric">+40% Retention</div>
          </div>
          <div className="bento-card">
            <div className="bento-icon"><IconMoon size={32} /></div>
            <h3>Sleep Architecture</h3>
            <p>Optimize deep sleep phases.</p>
            <div className="bento-metric">REM +25%</div>
          </div>
          <div className="bento-card">
            <div className="bento-icon"><IconTarget size={32} /></div>
            <h3>Deep Focus Protocol</h3>
            <p>Sustained attention states.</p>
            <div className="bento-metric">4hr Flow</div>
          </div>
          <div className="bento-card wide">
            <div className="bento-icon"><IconShield size={32} /></div>
            <h3>Stress Inoculation</h3>
            <p>Practical systems for maintaining clarity and taking decisive action in high-pressure environments.</p>
            <div className="bento-metric">Cortisol -15%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
