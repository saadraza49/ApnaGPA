/* ════════════════════════════════════════════════════
   CUSTOM DROPDOWN LOGIC
   ════════════════════════════════════════════════════ */

function closeCustomSelect() {
    document.querySelectorAll('.custom-select-container.open').forEach(csContainer => {
        csContainer.classList.remove('open');
        const card = csContainer.closest('.card');
        if (card) card.classList.remove('overflow-visible');
        const row = csContainer.closest('.course-row');
        if (row) row.classList.remove('row-z-top');
    });
}

function initDropdownGlobals() {
    // Close dropdown if clicked outside
    document.addEventListener('click', closeCustomSelect);
}

function initCustomDropdown(id) {
    const csContainer = document.getElementById('cs' + id);
    const csTrigger = document.getElementById('cst' + id);
    const csLabel = document.getElementById('csl' + id);
    const csOptions = csContainer.querySelectorAll('.custom-select-option');
    const chSelect = document.getElementById('c' + id);

    if (!csContainer || !csTrigger || !csLabel || !chSelect) return;

    function openCustomSelect() {
        // Close all others first
        closeCustomSelect();
        
        csContainer.classList.add('open');
        const card = csContainer.closest('.card');
        if (card) card.classList.add('overflow-visible');
        const row = csContainer.closest('.course-row');
        if (row) row.classList.add('row-z-top');
    }

    csTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (csContainer.classList.contains('open')) {
            closeCustomSelect();
        } else {
            openCustomSelect();
        }
    });

    csTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (!csContainer.classList.contains('open')) openCustomSelect();
            // Focus the container to allow further arrow nav, though focus stays on trigger
        } else if (e.key === 'Escape') {
            closeCustomSelect();
        }
    });

    // Keyboard navigation within options
    csTrigger.addEventListener('keydown', (e) => {
        if (!csContainer.classList.contains('open')) return;
        
        const optsArray = Array.from(csOptions);
        let currentIndex = optsArray.findIndex(opt => opt.classList.contains('focused'));
        if (currentIndex === -1) currentIndex = optsArray.findIndex(opt => opt.classList.contains('selected'));
        if (currentIndex === -1) currentIndex = 0;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            optsArray.forEach(o => o.classList.remove('focused'));
            let next = (currentIndex + 1) % optsArray.length;
            optsArray[next].classList.add('focused');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            optsArray.forEach(o => o.classList.remove('focused'));
            let prev = (currentIndex - 1 + optsArray.length) % optsArray.length;
            optsArray[prev].classList.add('focused');
        } else if (e.key === 'Enter') {
            e.preventDefault();
            let activeOpt = optsArray.find(o => o.classList.contains('focused')) || optsArray[currentIndex];
            if (activeOpt) {
                activeOpt.click();
                csTrigger.focus();
            }
        }
    });

    csOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = opt.getAttribute('data-value');
            const text = opt.textContent.trim();
            
            // Update visual state
            csOptions.forEach(o => o.classList.remove('selected', 'focused'));
            opt.classList.add('selected');
            csLabel.textContent = text;
            
            // Update native select
            chSelect.value = val;
            closeCustomSelect();
            
            // Trigger change event to fire existing logic
            chSelect.dispatchEvent(new Event('change'));
        });
    });
}

window.initDropdownGlobals = initDropdownGlobals;
window.initCustomDropdown = initCustomDropdown;
window.closeCustomSelect = closeCustomSelect;
