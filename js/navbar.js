/* ════════════════════════════════════════════════════
   NAVBAR & INTERACTIONS
   ════════════════════════════════════════════════════ */
function initMobileNav() {
    // Smooth Scroll Navbar
    document.querySelectorAll('.topbar-nav a').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open
            const topbarNav = document.getElementById('topbar-nav');
            if (topbarNav && topbarNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });

    // Mobile menu toggle
    const btnMobileMenu = document.getElementById('btn-mobile-menu');
    const btnCloseMenu = document.getElementById('btn-close-menu');
    const topbarNav = document.getElementById('topbar-nav');
    const navOverlay = document.getElementById('nav-overlay');

    function openMobileMenu() {
        if (topbarNav) topbarNav.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (topbarNav) topbarNav.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (btnMobileMenu) btnMobileMenu.addEventListener('click', openMobileMenu);
    if (btnCloseMenu) btnCloseMenu.addEventListener('click', closeMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

    // Ripple Effect
    document.addEventListener('mousedown', function(e) {
        const target = e.target.closest('button');
        if (!target) return;
        // Ignore ripple on icon buttons
        if (target.classList.contains('mobile-menu-btn') || target.classList.contains('btn-close-menu')) return;
        
        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Intersection Observer for scroll animations (dev profile)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const devCard = document.querySelector('.dev-profile-card');
    if (devCard) observer.observe(devCard);
}
