/* ============================================
   RADIO SABOR — App Logic
   ============================================ */

// ─── Navbar Scroll Effect ───
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ─── Mobile Menu Toggle ───
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Toggle body scroll
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ─── Scroll Reveal ───
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── Smooth Scroll for Anchor Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ─── Form Handling ───
function handleSignup(form, type) {
    const emailInput = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    const email = emailInput.value;

    if (!email) return;

    // Animate button
    const originalText = button.textContent;
    button.textContent = '✓ Subscribed!';
    button.style.background = 'linear-gradient(135deg, #FF6B35, #FF3CAC)';
    button.style.boxShadow = '0 0 20px rgba(255, 60, 172, 0.4)';

    // Reset form
    emailInput.value = '';

    // Reset button after delay
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.boxShadow = '';
    }, 3000);
}

// ─── Parallax Effect on Hero ───
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg img');
    if (hero) {
        const scroll = window.pageYOffset;
        const speed = 0.3;
        hero.style.transform = `scale(1.05) translateY(${scroll * speed}px)`;
    }
});

// ─── Counter Animation for Stats ───
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[1]);
                const suffix = text.replace(match[1], '');
                animateCounter(el, target, suffix);
            }
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const duration = 1500;
    const steps = duration / (1000 / 60);
    const step = target / steps;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 1000 / 60);
}

// ─── Event Card Tilt Effect ───
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ─── Cursor Glow Effect (Desktop) ───
if (window.matchMedia('(min-width: 768px)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
  `;
    document.body.appendChild(glow);

    let glowX = 0, glowY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        glowX = e.clientX;
        glowY = e.clientY;
    });

    function updateGlow() {
        currentX += (glowX - currentX) * 0.1;
        currentY += (glowY - currentY) * 0.1;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(updateGlow);
    }

    updateGlow();
}

// ─── Gallery Carousel ───
(function () {
    const track = document.getElementById('galleryTrack');
    const wrapper = track ? track.parentElement : null;
    const dotsContainer = document.getElementById('galleryDots');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.gallery-slide'));
    const total = slides.length;
    let current = 0;
    let autoTimer;

    function slidesVisible() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function maxIndex() { return total - slidesVisible(); }

    function slideWidth() { return wrapper.offsetWidth / slidesVisible(); }

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Photo ' + (i + 1));
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex()));
        track.style.transition = 'transform 0.72s var(--ease-out-expo)';
        track.style.transform = 'translateX(-' + (current * slideWidth()) + 'px)';
        dotsContainer.querySelectorAll('.gallery-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function next() { goTo(current + 1 > maxIndex() ? 0 : current + 1); }
    function prev() { goTo(current - 1 < 0 ? maxIndex() : current - 1); }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });

    // ── Mouse drag ──
    let isDragging = false;
    let dragStartX = 0;
    let dragCurrentX = 0;
    let dragOrigin = 0;   // translateX at drag start
    const THRESHOLD = 60; // px needed to trigger a slide change

    function currentOffset() { return -(current * slideWidth()); }

    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragOrigin = currentOffset();
        track.style.transition = 'none';
        wrapper.classList.add('dragging');
        clearInterval(autoTimer);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragCurrentX = e.clientX;
        const delta = dragCurrentX - dragStartX;
        // Clamp so you can't drag past the first/last slide too far
        const clamped = Math.max(
            -(maxIndex() * slideWidth()) - 80,
            Math.min(80, dragOrigin + delta)
        );
        track.style.transform = 'translateX(' + clamped + 'px)';
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        wrapper.classList.remove('dragging');
        const delta = e.clientX - dragStartX;
        if (delta < -THRESHOLD) next();
        else if (delta > THRESHOLD) prev();
        else goTo(current); // snap back
        resetAuto();
    });

    // Prevent image drag interference
    track.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // ── Touch swipe ──
    let touchStartX = 0;
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        track.style.transition = 'none';
        clearInterval(autoTimer);
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        const delta = e.touches[0].clientX - touchStartX;
        const clamped = Math.max(
            -(maxIndex() * slideWidth()) - 80,
            Math.min(80, currentOffset() + delta)
        );
        track.style.transform = 'translateX(' + clamped + 'px)';
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (diff > THRESHOLD) next();
        else if (diff < -THRESHOLD) prev();
        else goTo(current);
        resetAuto();
    });

    // Recalculate on resize
    window.addEventListener('resize', () => goTo(current));

    // Auto-play — pause while dragging is handled inline
    function startAuto() { autoTimer = setInterval(next, 3800); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }

    startAuto();
})();

// ─── Genre Tag Hover Glow ───
document.querySelectorAll('.hero-genres span').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.1)';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
    });
});

// ─── Countdown Timer ───
(function () {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const targetDate = new Date(countdownEl.dataset.date).getTime();

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function updateCountdown() {
        const now = Date.now();
        const diff = targetDate - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();
