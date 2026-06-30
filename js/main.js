/* ════════════════════════════════════════════════════
   MAIN ENTRY POINT
   ════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme toggle
    if (window.initTheme) window.initTheme();

    // 2. Global Dropdown logic
    if (window.initDropdownGlobals) window.initDropdownGlobals();

    // 3. Mobile Navigation & Interactions
    if (window.initMobileNav) window.initMobileNav();

    // 4. Calculators
    if (window.initGPACalculator) window.initGPACalculator();
    if (window.initCGPACalculator) window.initCGPACalculator();

    // 5. Exports
    if (window.initExport) window.initExport();

    // Add simple CSS for spinning icon inside JS so we don't need another chunk
    if (!document.getElementById('spin-style')) {
        const s = document.createElement('style');
        s.id = 'spin-style';
        s.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
        document.head.appendChild(s);
    }
});
