"use client";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";

const snapshotFaqs = [
  {
    category: "FAQ",
    question: "What exactly is Yorren?",
    answer: "Yorren is a platform designed to enhance human potential. There are two systems one must master: the inner self and the outer world. That is what Yorren is for."
  },
  {
    category: "FAQ",
    question: "Who is this framework built for?",
    answer: "It is built for individuals who want to learn how to master their own cognitive and physiological systems to effectively navigate the complexities of the modern world."
  },
  {
    category: "FAQ",
    question: "Do I need any special equipment to start?",
    answer: "No. The process begins with understanding your own baseline. All you need is dedication, focus, and the willingness to learn the system."
  }
];

export default function GlassFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="glass-faq-section">
      <div className="container">
        <div className="section-header">
          <h2>FAQ</h2>
          <p>What Yorren is.</p>
        </div>
        <div className="glass-faq-wrapper">
          {snapshotFaqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`glass-faq-item ${isActive ? "active" : ""}`}
              >
                <div 
                  className="glass-faq-q"
                  onClick={() => toggleAccordion(index)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span>{faq.question}</span>
                  </div>
                  <div className={`glass-faq-icon ${isActive ? "rotate" : ""}`}>
                    <IconChevronDown size={20} />
                  </div>
                </div>
                <div 
                  className="glass-faq-a"
                  style={{
                    maxHeight: isActive ? "200px" : "0",
                    opacity: isActive ? 1 : 0,
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <div className="glass-faq-a-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link 
              href="/knowledge-base" 
              className="pill-btn ghost"
              style={{ display: 'inline-flex' }}
            >
              VIEW OUR KNOWLEDGE PANEL
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
