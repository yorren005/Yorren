"use client";
import { useEffect, useRef } from "react";

export default function SynapticTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    const nodes = document.querySelectorAll(".timeline-node");
    nodes.forEach((node) => observer.observe(node));

    return () => nodes.forEach((node) => observer.unobserve(node));
  }, []);

  return (
    <section className="timeline-section" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <h2>Synaptic Architecture</h2>
          <p>The evolutionary pathway of our framework.</p>
        </div>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-node">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-phase">PHASE 01</span>
              <h3>Assessment</h3>
              <p>Establishing baselines and identifying cognitive bottlenecks.</p>
            </div>
          </div>
          
          <div className="timeline-node">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-phase">PHASE 02</span>
              <h3>Integration</h3>
              <p>Deploying foundational protocols for sleep and focus.</p>
            </div>
          </div>

          <div className="timeline-node">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-phase">PHASE 03</span>
              <h3>Optimization</h3>
              <p>Fine-tuning variables for sustained peak performance.</p>
            </div>
          </div>

          <div className="timeline-node">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-phase">PHASE 04</span>
              <h3>Expansion</h3>
              <p>Pushing past perceived limits into new capability tiers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
