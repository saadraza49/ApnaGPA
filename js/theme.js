/* ════════════════════════════════════════════════════
   THEME TOGGLE
   ════════════════════════════════════════════════════ */
function initTheme() {
    const saved = localStorage.getItem('apnagpa-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    const btn = document.getElementById('btn-theme');
    const iconEl = document.getElementById('icon-theme');

    const sunIcon = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
    const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

    function updateIcon() {
        if (!iconEl) return;
        const current = document.documentElement.getAttribute('data-theme');
        iconEl.innerHTML = current === 'dark' ? sunIcon : moonIcon;
    }
    updateIcon();

    if (btn) {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('apnagpa-theme', next);
            updateIcon();
        });
    }
}
