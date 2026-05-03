document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ─── 1. Theme Toggle ───────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun');
    const moonIcon = themeToggle.querySelector('.moon');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
        gsap.fromTo('body', { opacity: 0.85 }, { opacity: 1, duration: 0.5 });
        // Logo glow
        const glowColor = isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)';
        gsap.fromTo('.logo',
            { filter: `drop-shadow(0 0 18px ${glowColor})` },
            { filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))', duration: 1.5, clearProps: 'filter' }
        );
        // Re-sync canvas color
        initCanvas();
    });

    // ─── 2. Scroll Progress Bar ────────────────────────────────
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });

    // ─── 3. Custom Magnetic Cursor ─────────────────────────────
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05, ease: 'none' });
    });

    // Follower has lag
    (function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        gsap.set(follower, { x: followerX, y: followerY });
        requestAnimationFrame(animateFollower);
    })();

    // Expand on hover of interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .pillar-card, .insight-item, .insight-img-cover');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // ─── 4. Neural Network Canvas (Removed, using Video Background) ───
    // Replaced with <video> element for cinematic look

    // ─── 5. Word-by-Word Hero Headline Reveal ─────────────────
    const headline = document.getElementById('hero-headline');
    if (headline) {
        const words = headline.textContent.trim().split(' ');
        headline.innerHTML = words.map(w =>
            `<span class="word"><span class="word-inner">${w}</span></span>`
        ).join(' ');
    }

    // ─── 6. Hero Entrance Animations ─────────────────────────
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    heroTl
        .from('.navbar',     { y: -100, opacity: 0 })
        .from('.tagline',    { y: 20, opacity: 0 }, '-=0.8')
        .from('.hero-headline .word-inner', {
            y: '110%',
            opacity: 0,
            stagger: 0.07,
            duration: 0.9,
            ease: 'power3.out'
        }, '-=0.9')
        .from('.hero-subtext',  { y: 20, opacity: 0 }, '-=0.6')
        .from('.hero-actions',  { y: 20, opacity: 0 }, '-=0.8');

    // ─── 7. New Hero Element Animations ─────────────────────────

    // Status pill entrance
    gsap.from('.status-pill', {
        x: -30, opacity: 0, duration: 1,
        delay: 2,
        ease: 'power3.out'
    });

    // Orbital anchor entrance
    gsap.from('.orbital-anchor', {
        scale: 0.5, opacity: 0, duration: 1.5,
        delay: 1.5,
        ease: 'power2.out'
    });

    // Proof strip staggered reveal
    gsap.from('.proof-label', {
        y: 15, opacity: 0, duration: 0.8,
        delay: 2.2,
        ease: 'power3.out'
    });

    // Proof logos are revealed via parent .proof-strip CSS animation

    // Scroll indicator – hide after user scrolls
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        let scrollHidden = false;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80 && !scrollHidden) {
                scrollHidden = true;
                scrollIndicator.classList.add('hidden');
            } else if (window.scrollY <= 80 && scrollHidden) {
                scrollHidden = false;
                scrollIndicator.classList.remove('hidden');
            }
        }, { passive: true });
    }

    // ─── 8. Section Scroll Reveals ────────────────────────────
    gsap.from('.thesis-section', {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: '.thesis-section', start: 'top 85%', toggleActions: 'play none none none' }
    });

    gsap.from('.pillars-section .section-header', {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: '.pillars-section', start: 'top 80%', toggleActions: 'play none none none' }
    });

    gsap.from('.pillar-card', {
        opacity: 0, y: 40, scale: 0.95, stagger: 0.15, duration: 0.8,
        ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: '.pillars-grid', start: 'top 85%', toggleActions: 'play none none none' }
    });

    gsap.from('.quote-section .container', {
        opacity: 0, y: 50, duration: 1,
        scrollTrigger: { trigger: '.quote-section', start: 'top 80%', toggleActions: 'play none none none' }
    });

    gsap.from('.insights-section .container', {
        opacity: 0, y: 50, duration: 1,
        scrollTrigger: { trigger: '.insights-section', start: 'top 80%', toggleActions: 'play none none none' }
    });

    gsap.from('.insight-item', {
        opacity: 0, x: 20, stagger: 0.25, duration: 0.8,
        scrollTrigger: { trigger: '.insight-side', start: 'top 75%', toggleActions: 'play none none none' }
    });

    gsap.from('.newsletter-glass', {
        opacity: 0, y: 40, scale: 0.98, duration: 1,
        scrollTrigger: { trigger: '.newsletter-section', start: 'top 80%', toggleActions: 'play none none none' }
    });

    // ─── 9. Pillar Card 3D Tilt ───────────────────────────────
    const cards = document.querySelectorAll('.pillar-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / rect.height) * -5;
            const rotateY = ((x - rect.width / 2) / rect.width) * 5;
            gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
        });
    });

    // ─── 10. Quote Scroll-Linked Word Reveal ──────────────────
    const quoteEl = document.getElementById('quote-text');
    if (quoteEl) {
        const quoteWords = quoteEl.textContent.trim().split(' ');
        quoteEl.innerHTML = quoteWords.map(w =>
            `<span style="opacity:0.15;transition:opacity 0.4s ease;">${w} </span>`
        ).join('');

        ScrollTrigger.create({
            trigger: '.quote-section',
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
            onUpdate: (self) => {
                const spans = quoteEl.querySelectorAll('span');
                const progress = self.progress;
                spans.forEach((span, i) => {
                    const threshold = i / spans.length;
                    span.style.opacity = progress >= threshold ? '1' : '0.15';
                });
            }
        });
    }

});
