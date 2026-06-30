/* ════════════════════════════════════════════════════
   EXPORT LOGIC
   ════════════════════════════════════════════════════ */
function initExport() {
    const btnExport = document.getElementById('btn-export');
    const btnCgpaExport = document.getElementById('btn-cgpa-export');

    if (btnExport) {
        btnExport.addEventListener('click', () => {
            const originalContent = btnExport.innerHTML;
            btnExport.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Exporting...`;
            btnExport.style.visibility = 'hidden';

            // Populate export card
            document.getElementById('exp-date-val').textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            document.getElementById('exp-gpa-num').textContent = document.getElementById('gpa-val').textContent.split('/')[0];
            document.getElementById('exp-grade-letter').textContent = document.getElementById('grade-pill').textContent;

            document.getElementById('exp-stat-courses').textContent = document.getElementById('s-courses').textContent;
            document.getElementById('exp-stat-credits').textContent = document.getElementById('s-credits').textContent;
            document.getElementById('exp-stat-gp').textContent = document.getElementById('s-gp').textContent;

            // Populate table
            const expTbody = document.getElementById('exp-tbody');
            expTbody.innerHTML = '';

            const $courses = document.getElementById('courses');
            const rows = $courses.querySelectorAll('.course-row:not(.removing)');
            let i = 1;
            rows.forEach(r => {
                const id = r.dataset.id;
                const name = document.getElementById('n' + id).value.trim() || `Course ${i}`;
                const ch = parseInt(document.getElementById('c' + id).value, 10);
                const m = document.getElementById('m' + id).value;
                const marks = parseFloat(m);

                let grade = 'F';
                let gp = 0;
                let isAudit = (ch === 0);

                if (!isAudit && !isNaN(marks) && m !== '') {
                    const res = window.lookup(ch, marks);
                    grade = res.grade;
                    gp = res.gp;
                }

                const tr = document.createElement('tr');
                tr.innerHTML = `
            <td>${i}</td>
            <td>${window.esc(name)}${isAudit ? ' (Audit)' : ''}</td>
            <td class="num">${ch}</td>
            <td class="num">${isAudit ? '-' : (m === '' || isNaN(marks) ? '-' : marks)}</td>
            <td>${isAudit ? '-' : grade}</td>
            <td class="num">${isAudit ? 'N/A' : gp.toFixed(2)}</td>
        `;
                expTbody.appendChild(tr);
                i++;
            });

            const exportCard = document.getElementById('export-card');

            setTimeout(async () => {
                try {
                    const canvas = await html2canvas(exportCard, {
                        scale: 2,
                        backgroundColor: '#ffffff',
                        useCORS: true,
                        logging: false
                    });

                    const link = document.createElement('a');
                    link.download = `ApnaGPA-Result.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();

                    window.showToast('Result exported!');
                } catch (err) {
                    console.error('Export failed:', err);
                    window.showToast('Export failed, try again');
                } finally {
                    btnExport.innerHTML = originalContent;
                    btnExport.style.visibility = 'visible';
                }
            }, 100);
        });
    }

    if (btnCgpaExport) {
        btnCgpaExport.addEventListener('click', () => {
            const originalContent = btnCgpaExport.innerHTML;
            btnCgpaExport.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Exporting...`;
            btnCgpaExport.style.visibility = 'hidden';

            const exportCard = document.getElementById('export-card');
            const gpaLabel = exportCard.querySelector('.exp-gpa-label');
            const statsLabels = exportCard.querySelectorAll('.exp-stat-lbl');
            const thElements = exportCard.querySelectorAll('th');
            
            const origGpaLabel = gpaLabel.textContent;
            const origStatCourses = statsLabels[0].textContent;
            const origThSubject = thElements[1].textContent;
            const origThMarks = thElements[3].textContent;
            
            gpaLabel.textContent = 'Cumulative GPA';
            statsLabels[0].textContent = 'Semesters';
            thElements[1].textContent = 'Semester';
            thElements[3].textContent = 'GPA';

            document.getElementById('exp-date-val').textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            document.getElementById('exp-gpa-num').textContent = document.getElementById('cgpa-val').textContent.split('/')[0];
            document.getElementById('exp-grade-letter').textContent = document.getElementById('cgpa-grade-pill').textContent;

            document.getElementById('exp-stat-courses').textContent = document.getElementById('cgpa-s-semesters').textContent;
            document.getElementById('exp-stat-credits').textContent = document.getElementById('cgpa-s-credits').textContent;
            
            const cgpaData = window.validateCgpaData ? window.validateCgpaData() : null;
            let totalPts = 0;
            if(cgpaData) cgpaData.forEach(d => totalPts += (d.gpa * d.ch));
            document.getElementById('exp-stat-gp').textContent = totalPts.toFixed(2);

            const expTbody = document.getElementById('exp-tbody');
            expTbody.innerHTML = '';
            
            if (cgpaData) {
                cgpaData.forEach((d, index) => {
                    const tr = document.createElement('tr');
                    const pts = d.gpa * d.ch;
                    const res = window.letterGrade(d.gpa);
                    tr.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${window.esc(d.name)}</td>
                        <td class="num">${d.ch}</td>
                        <td class="num">${d.gpa.toFixed(2)}</td>
                        <td>${res}</td>
                        <td class="num">${pts.toFixed(2)}</td>
                    `;
                    expTbody.appendChild(tr);
                });
            }

            setTimeout(async () => {
                try {
                    const canvas = await html2canvas(exportCard, {
                        scale: 2,
                        backgroundColor: '#ffffff',
                        useCORS: true,
                        logging: false
                    });

                    const link = document.createElement('a');
                    link.download = `ApnaCGPA-Result.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();

                    window.showToast('CGPA Result exported!');
                } catch (err) {
                    console.error('Export failed:', err);
                    window.showToast('Export failed, try again');
                } finally {
                    btnCgpaExport.innerHTML = originalContent;
                    btnCgpaExport.style.visibility = 'visible';
                    gpaLabel.textContent = origGpaLabel;
                    statsLabels[0].textContent = origStatCourses;
                    thElements[1].textContent = origThSubject;
                    thElements[3].textContent = origThMarks;
                }
            }, 100);
        });
    }
}
