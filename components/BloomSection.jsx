'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BloomSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const initScrub = () => {
      const duration = video.duration || 10;
      let scrubObj = { time: 0 };
      gsap.to(scrubObj, {
        time: duration,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
        onUpdate: () => { if (video.readyState >= 2) video.currentTime = scrubObj.time; },
      });
    };

    video.load();
    if (video.readyState >= 1) initScrub();
    else video.addEventListener('loadedmetadata', initScrub);

    // Text fade-in
    const lines = section.querySelectorAll('.bloom-line');
    lines.forEach((line, i) => {
      gsap.from(line, {
        opacity: 0, y: 40, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: `${20 + i * 10}% center`, end: `${30 + i * 10}% center`, scrub: 1 },
      });
    });
  }, []);

  return (
    <section className="bloom-section" id="bloom-section" ref={sectionRef}>
      <div className="bloom-sticky">
        <video ref={videoRef} id="bloom-video" muted playsInline preload="auto" className="bloom-video">
          <source src="/bloom.mp4" type="video/mp4" />
        </video>
        <div className="bloom-text-overlay">
          <h2 className="bloom-heading">
            <span className="bloom-line bloom-line-1">Grow Your Digital</span>
            <span className="bloom-line bloom-line-2">Presence, Let Your</span>
            <span className="bloom-line bloom-line-3">Vision <em>Bloom</em></span>
          </h2>
        </div>
      </div>
    </section>
  );
}
