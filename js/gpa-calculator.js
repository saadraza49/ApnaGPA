/* ════════════════════════════════════════════════════
   GPA CALCULATOR LOGIC
   ════════════════════════════════════════════════════ */
function initGPACalculator() {
    let cid = 0;
    const $courses = document.getElementById('courses');
    const $results = document.getElementById('results');

    function maxMarks(ch) { return ch * 20; }

    function addRow() {
        cid++;
        const id = cid;
        const d = document.createElement('div');
        d.className = 'course-row';
        d.dataset.id = id;

        d.innerHTML = `
    <div class="field">
        <input type="text" class="control" id="n${id}" placeholder="e.g. Mathematics" autocomplete="off">
    </div>
    <div class="field">
        <select class="control" id="c${id}" style="display: none;">
            <option value="0">0 Hour</option>
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3" selected>3 Hours</option>
            <option value="4">4 Hours</option>
        </select>
        <div class="custom-select-container" id="cs${id}">
            <div class="control custom-select-trigger" id="cst${id}" tabindex="0">
                <span class="custom-select-label" id="csl${id}">3 Hours</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="custom-select-options">
                <div class="custom-select-option" data-value="0">
                    0 Hour
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="custom-select-option" data-value="1">
                    1 Hour
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="custom-select-option" data-value="2">
                    2 Hours
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="custom-select-option selected" data-value="3">
                    3 Hours
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="custom-select-option" data-value="4">
                    4 Hours
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
            </div>
        </div>
    </div>
    <div class="field">
        <input type="number" class="control" id="m${id}" placeholder="60" value="0" min="0" max="60" step="any">
    </div>
    <button class="btn-remove" type="button" title="Remove" data-rm="${id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
        `;
        $courses.appendChild(d);
        d.querySelector('input[type="text"]').focus();

        const chSelect = document.getElementById('c' + id);
        const mInput = document.getElementById('m' + id);
        const nInput = document.getElementById('n' + id);
        
        // Initialize custom dropdown
        if (window.initCustomDropdown) {
            window.initCustomDropdown(id);
        }

        nInput.addEventListener('input', calculate);

        chSelect.addEventListener('change', () => {
            const ch = parseInt(chSelect.value, 10);
            if (ch === 0) {
                mInput.disabled = true;
                mInput.value = '';
                mInput.placeholder = 'N/A';
                mInput.removeAttribute('max');
            } else if (ch >= 1 && ch <= 4) {
                mInput.disabled = false;
                const maxM = maxMarks(ch);
                mInput.placeholder = String(maxM);
                mInput.max = maxM;

                if (mInput.value !== '') {
                    let val = parseFloat(mInput.value);
                    if (val > maxM) mInput.value = maxM;
                    else if (val < 0) mInput.value = 0;
                }
            }
            calculate();
        });

        mInput.addEventListener('focus', () => {
            if (mInput.value === '0') mInput.value = '';
        });

        mInput.addEventListener('blur', () => {
            if (mInput.value === '') {
                mInput.value = '0';
                calculate();
            }
        });

        mInput.addEventListener('input', () => {
            if (mInput.value !== '') {
                const ch = parseInt(chSelect.value, 10);
                if (ch >= 1 && ch <= 4) {
                    let val = parseFloat(mInput.value);
                    const maxM = maxMarks(ch);
                    if (val > maxM) {
                        mInput.value = maxM;
                    } else if (val < 0) {
                        mInput.value = 0;
                    }
                }
            }
            calculate();
        });
    }

    function removeRow(id) {
        if ($courses.querySelectorAll('.course-row').length <= 1) return;
        const r = $courses.querySelector(`.course-row[data-id="${id}"]`);
        if (!r) return;
        r.classList.add('removing');
        r.addEventListener('animationend', () => { r.remove(); calculate(); });
    }

    function validate() {
        const rows = $courses.querySelectorAll('.course-row');
        const data = [];
        let ok = true;

        rows.forEach(r => {
            const id = r.dataset.id;
            const nI = document.getElementById('n' + id);
            const cI = document.getElementById('c' + id);
            const cstI = document.getElementById('cst' + id);
            const mI = document.getElementById('m' + id);

            const name = nI.value.trim() || `Course ${data.length + 1}`;
            const cRaw = cI.value;

            let ch = NaN, mk = NaN;

            if (cRaw === '' || cRaw === null) {
                window.triggerShake(cstI || cI);
                ok = false;
            } else {
                ch = parseInt(cRaw, 10);
            }

            if (ch === 0) {
                mk = 0;
            } else if (!isNaN(ch) && ch >= 1 && ch <= 4) {
                const mRaw = mI.value.trim();
                if (mRaw === '') {
                    if (mRaw === '') {
                        window.triggerShake(mI);
                        ok = false;
                    } else {
                        mk = parseFloat(mRaw);
                        if (isNaN(mk) || mk < 0) {
                            window.triggerShake(mI);
                            ok = false;
                        } else if (mk > maxMarks(ch)) {
                            window.triggerShake(mI);
                            ok = false;
                        }
                    }
                } else {
                    mk = parseFloat(mRaw);
                    if (isNaN(mk) || mk < 0) {
                        window.triggerShake(mI);
                        ok = false;
                    } else if (mk > maxMarks(ch)) {
                        window.triggerShake(mI);
                        ok = false;
                    }
                }
            }

            data.push({ name, ch, mk, id });
        });

        if (!ok) return null;
        for (const d of data) { if (isNaN(d.ch)) return null; }
        return data;
    }

    function calculate() {
        const data = validate();
        if (!data) {
            const f = $courses.querySelector('.is-error');
            if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        let totCH = 0, totGP = 0, hasFail = false;
        const failed = [];

        const rows = data.map((d, i) => {
            if (d.ch === 0) {
                return { i: i + 1, name: d.name, ch: 0, mk: 0, grade: '—', gp: 0, isFail: false, isAudit: true };
            }

            const result = window.lookup(d.ch, d.mk);
            totCH += d.ch;
            totGP += result.gp;
            if (result.isFail) { hasFail = true; failed.push(d.name); }
            return { i: i + 1, name: d.name, ch: d.ch, mk: d.mk, grade: result.grade, gp: result.gp, isFail: result.isFail, isAudit: false };
        });

        const gpa = totCH > 0 ? totGP / totCH : 0;
        const gpaR = Math.round(gpa * 100) / 100;
        const t = window.tier(gpaR);
        const lg = window.letterGrade(gpaR);

        document.getElementById('gpa-val').textContent = gpaR.toFixed(2);
        document.getElementById('gpa-val').className = 'gpa-hero-value tier-' + t;

        const pillEl = document.getElementById('grade-pill');
        pillEl.textContent = lg;
        pillEl.className = 'grade-pill pill-' + t;

        document.getElementById('s-courses').textContent = data.length;
        document.getElementById('s-credits').textContent = totCH;
        document.getElementById('s-gp').textContent = totGP.toFixed(2);
        document.getElementById('header-total-credits').textContent = `Total Credits: ${totCH}`;

        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        rows.forEach(r => {
            const tr = document.createElement('tr');
            if (r.isFail) tr.classList.add('row-fail');
            if (r.isAudit) tr.style.opacity = '0.5';
            tr.innerHTML = `
        <td>${window.esc(r.name) || `<span class="muted">Course ${r.i}</span>`}${r.isFail ? '<span class="badge-fail">Fail</span>' : ''}${r.isAudit ? '<span style="margin-left:8px;font-size:.6875rem;color:var(--text-3)">Audit</span>' : ''}</td>
        <td class="num">${r.ch}</td>
        <td class="num">${r.isAudit ? '-' : r.mk}</td>
        <td>${r.isAudit ? '-' : r.grade}</td>
        <td class="num">${r.isAudit ? 'N/A' : r.gp.toFixed(2)}</td>
    `;
            tbody.appendChild(tr);
        });
    }

    function resetAll() {
        $courses.innerHTML = '';
        cid = 0;
        addRow();
        calculate();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('btn-add').addEventListener('click', addRow);
    document.getElementById('btn-reset').addEventListener('click', resetAll);
    $courses.addEventListener('click', e => {
        const b = e.target.closest('.btn-remove');
        if (b) removeRow(b.dataset.rm);
    });
    $courses.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); calculate(); } });

    addRow();
    calculate();
    
    // Expose validate and calculate for export usage
    window.validateGpaData = validate;
}
