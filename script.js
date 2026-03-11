/* ============================================
   script.js — eventone.html interactions
   ============================================ */

// ---------- Navbar scroll state ----------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.pageYOffset > 60);
}, { passive: true });

// ---------- Mobile menu toggle ----------
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ---------- Gallery carousel ----------
(function () {
    const track = document.getElementById('galleryTrack');
    const wrapper = track ? track.parentElement : null;
    const dotsContainer = document.getElementById('galleryDots');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (!track || !wrapper || !dotsContainer) return;

    const slides = Array.from(track.querySelectorAll('.gallery-slide'));
    const total = slides.length;
    let current = 0;
    let autoTimer;

    function slidesVisible() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, total - slidesVisible());
    }

    function slideWidth() {
        return wrapper.offsetWidth / slidesVisible();
    }

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Photo ' + (i + 1));
        dot.addEventListener('click', () => {
            goTo(i);
            resetAuto();
        });
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex()));
        track.style.transition = 'transform 0.72s var(--ease-out-expo)';
        track.style.transform = 'translateX(-' + (current * slideWidth()) + 'px)';
        dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    function next() {
        goTo(current + 1 > maxIndex() ? 0 : current + 1);
    }

    function prev() {
        goTo(current - 1 < 0 ? maxIndex() : current - 1);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prev();
            resetAuto();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            next();
            resetAuto();
        });
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragCurrentX = 0;
    let dragOrigin = 0;
    const threshold = 60;

    function currentOffset() {
        return -(current * slideWidth());
    }

    wrapper.addEventListener('mousedown', (event) => {
        isDragging = true;
        dragStartX = event.clientX;
        dragOrigin = currentOffset();
        track.style.transition = 'none';
        wrapper.classList.add('dragging');
        clearInterval(autoTimer);
    });

    window.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        dragCurrentX = event.clientX;
        const delta = dragCurrentX - dragStartX;
        const clamped = Math.max(
            -(maxIndex() * slideWidth()) - 80,
            Math.min(80, dragOrigin + delta)
        );
        track.style.transform = 'translateX(' + clamped + 'px)';
    });

    window.addEventListener('mouseup', (event) => {
        if (!isDragging) return;
        isDragging = false;
        wrapper.classList.remove('dragging');
        const delta = event.clientX - dragStartX;
        if (delta < -threshold) next();
        else if (delta > threshold) prev();
        else goTo(current);
        resetAuto();
    });

    track.querySelectorAll('img').forEach((img) => {
        img.addEventListener('dragstart', (event) => event.preventDefault());
    });

    let touchStartX = 0;

    wrapper.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        track.style.transition = 'none';
        clearInterval(autoTimer);
    }, { passive: true });

    wrapper.addEventListener('touchmove', (event) => {
        const delta = event.touches[0].clientX - touchStartX;
        const clamped = Math.max(
            -(maxIndex() * slideWidth()) - 80,
            Math.min(80, currentOffset() + delta)
        );
        track.style.transform = 'translateX(' + clamped + 'px)';
    }, { passive: true });

    wrapper.addEventListener('touchend', (event) => {
        const diff = touchStartX - event.changedTouches[0].clientX;
        if (diff > threshold) next();
        else if (diff < -threshold) prev();
        else goTo(current);
        resetAuto();
    });

    window.addEventListener('resize', () => goTo(current));

    function startAuto() {
        autoTimer = setInterval(next, 3800);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    goTo(0);
    startAuto();
})();
