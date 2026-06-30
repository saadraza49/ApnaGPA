/* ════════════════════════════════════════════════════
   CGPA CALCULATOR LOGIC
   ════════════════════════════════════════════════════ */
function initCGPACalculator() {
    let cgpaCid = 0;
    const $cgpaSemesters = document.getElementById('cgpa-semesters');

    function addCgpaRow() {
        cgpaCid++;
        const id = cgpaCid;
        const d = document.createElement('div');
        d.className = 'course-row';
        d.dataset.id = id;

        d.innerHTML = `
            <div class="field">
                <input type="text" class="control" id="cgpa-n${id}" placeholder="e.g. Semester ${id}" autocomplete="off">
            </div>
            <div class="field">
                <input type="number" class="control" id="cgpa-gpa${id}" placeholder="3.50" min="0" max="4" step="0.01">
            </div>
            <div class="field">
                <input type="number" class="control" id="cgpa-ch${id}" placeholder="18" min="1" max="50" step="1">
            </div>
            <button class="btn-remove" type="button" title="Remove" data-rm="${id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        `;
        // For desktop, enforce grid columns directly on row since course-row uses 4 columns but original is different
        d.style.gridTemplateColumns = window.innerWidth > 480 ? '1fr 110px 120px 44px' : '';

        $cgpaSemesters.appendChild(d);

        const nInput = document.getElementById('cgpa-n' + id);
        const gpaInput = document.getElementById('cgpa-gpa' + id);
        const chInput = document.getElementById('cgpa-ch' + id);

        nInput.addEventListener('input', calculateCgpa);
        gpaInput.addEventListener('input', calculateCgpa);
        chInput.addEventListener('input', calculateCgpa);
    }

    function removeCgpaRow(id) {
        if ($cgpaSemesters.querySelectorAll('.course-row').length <= 1) return;
        const r = $cgpaSemesters.querySelector(`.course-row[data-id="${id}"]`);
        if (!r) return;
        r.classList.add('removing');
        r.addEventListener('animationend', () => { r.remove(); calculateCgpa(); });
    }

    function validateCgpa() {
        const rows = $cgpaSemesters.querySelectorAll('.course-row');
        const data = [];
        let ok = true;

        rows.forEach(r => {
            const id = r.dataset.id;
            const nI = document.getElementById('cgpa-n' + id);
            const gpaI = document.getElementById('cgpa-gpa' + id);
            const chI = document.getElementById('cgpa-ch' + id);

            const name = nI.value.trim() || `Semester ${id}`;
            
            let gpa = parseFloat(gpaI.value);
            let ch = parseFloat(chI.value);

            if (gpaI.value.trim() === '') {
                window.triggerShake(gpaI);
                ok = false;
            } else if (isNaN(gpa) || gpa < 0 || gpa > 4) {
                window.triggerShake(gpaI);
                ok = false;
            }

            if (chI.value.trim() === '') {
                window.triggerShake(chI);
                ok = false;
            } else if (isNaN(ch) || ch <= 0) {
                window.triggerShake(chI);
                ok = false;
            }

            data.push({ name, gpa, ch, id });
        });

        if (!ok) return null;
        return data;
    }

    function calculateCgpa() {
        const data = validateCgpa();
        if (!data) return;

        let totalPoints = 0;
        let totalCredits = 0;

        const tbody = document.getElementById('cgpa-tbody');
        tbody.innerHTML = '';

        data.forEach((d, i) => {
            let pts = d.gpa * d.ch;
            totalPoints += pts;
            totalCredits += d.ch;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${window.esc(d.name)}</td>
                <td class="num">${d.ch}</td>
                <td class="num">${d.gpa.toFixed(2)}</td>
                <td class="num">${pts.toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });

        let cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        cgpa = Math.round(cgpa * 100) / 100;
        
        const lg = window.letterGrade(cgpa);
        const t = window.tier(cgpa);

        document.getElementById('cgpa-val').textContent = cgpa.toFixed(2);
        document.getElementById('cgpa-val').className = 'gpa-hero-value tier-' + t;
        
        const pillEl = document.getElementById('cgpa-grade-pill');
        pillEl.textContent = lg;
        pillEl.className = 'grade-pill pill-' + t;

        document.getElementById('cgpa-s-semesters').textContent = data.length;
        document.getElementById('cgpa-s-credits').textContent = totalCredits;
        document.getElementById('cgpa-header-total-credits').textContent = `Total Credits: ${totalCredits}`;
    }

    function resetCgpaAll() {
        $cgpaSemesters.innerHTML = '';
        cgpaCid = 0;
        addCgpaRow();
        calculateCgpa();
        const target = document.getElementById('cgpa');
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    }

    document.getElementById('btn-cgpa-add').addEventListener('click', addCgpaRow);
    document.getElementById('btn-cgpa-reset').addEventListener('click', resetCgpaAll);
    $cgpaSemesters.addEventListener('click', e => {
        const b = e.target.closest('.btn-remove');
        if (b) removeCgpaRow(b.dataset.rm);
    });
    $cgpaSemesters.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); calculateCgpa(); } });

    addCgpaRow();
    calculateCgpa();
    
    // Expose validate for export
    window.validateCgpaData = validateCgpa;
}
