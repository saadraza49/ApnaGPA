/* ════════════════════════════════════════════════════
   OFFICIAL GCUF GP LOOKUP TABLES
   ════════════════════════════════════════════════════ */
const TABLES = {
    1: {
        max: 20,
        data: {
            8: { g: 'D', gp: 1.00 }, 9: { g: 'C-', gp: 1.50 }, 10: { g: 'C', gp: 2.00 },
            11: { g: 'C+', gp: 2.35 }, 12: { g: 'B-', gp: 2.70 }, 13: { g: 'B', gp: 3.00 },
            14: { g: 'B+', gp: 3.25 }, 15: { g: 'B+', gp: 3.50 }, 16: { g: 'A-', gp: 3.75 },
            17: { g: 'A', gp: 4.00 }, 18: { g: 'A', gp: 4.00 }, 19: { g: 'A', gp: 4.00 },
            20: { g: 'A', gp: 4.00 }
        }
    },
    2: {
        max: 40,
        data: {
            16: { g: 'D', gp: 2.00 }, 17: { g: 'D', gp: 2.60 }, 18: { g: 'C-', gp: 3.00 },
            19: { g: 'C-', gp: 3.60 }, 20: { g: 'C', gp: 4.00 }, 21: { g: 'C', gp: 4.42 },
            22: { g: 'C+', gp: 4.70 }, 23: { g: 'C+', gp: 5.12 }, 24: { g: 'B-', gp: 5.40 },
            25: { g: 'B-', gp: 5.76 }, 26: { g: 'B', gp: 6.00 }, 27: { g: 'B', gp: 6.30 },
            28: { g: 'B+', gp: 6.50 }, 29: { g: 'B+', gp: 6.80 }, 30: { g: 'B+', gp: 7.00 },
            31: { g: 'B+', gp: 7.30 }, 32: { g: 'A-', gp: 7.50 }, 33: { g: 'A-', gp: 7.80 },
            34: { g: 'A', gp: 8.00 }, 35: { g: 'A', gp: 8.00 }, 36: { g: 'A', gp: 8.00 },
            37: { g: 'A', gp: 8.00 }, 38: { g: 'A', gp: 8.00 }, 39: { g: 'A', gp: 8.00 },
            40: { g: 'A', gp: 8.00 }
        }
    },
    3: {
        max: 60,
        data: {
            24: { g: 'D', gp: 3.00 }, 25: { g: 'D', gp: 3.60 }, 26: { g: 'D', gp: 4.20 },
            27: { g: 'C-', gp: 4.50 }, 28: { g: 'C-', gp: 5.10 }, 29: { g: 'C-', gp: 5.70 },
            30: { g: 'C', gp: 6.00 }, 31: { g: 'C', gp: 6.42 }, 32: { g: 'C', gp: 6.84 },
            33: { g: 'C+', gp: 7.05 }, 34: { g: 'C+', gp: 7.47 }, 35: { g: 'C+', gp: 7.89 },
            36: { g: 'B-', gp: 8.10 }, 37: { g: 'B-', gp: 8.46 }, 38: { g: 'B-', gp: 8.82 },
            39: { g: 'B', gp: 9.00 }, 40: { g: 'B', gp: 9.30 }, 41: { g: 'B', gp: 9.60 },
            42: { g: 'B+', gp: 9.75 }, 43: { g: 'B+', gp: 10.05 }, 44: { g: 'B+', gp: 10.35 },
            45: { g: 'B+', gp: 10.50 }, 46: { g: 'B+', gp: 10.80 }, 47: { g: 'B+', gp: 11.10 },
            48: { g: 'A-', gp: 11.25 }, 49: { g: 'A-', gp: 11.55 }, 50: { g: 'A-', gp: 11.85 },
            51: { g: 'A', gp: 12.00 }, 52: { g: 'A', gp: 12.00 }, 53: { g: 'A', gp: 12.00 },
            54: { g: 'A', gp: 12.00 }, 55: { g: 'A', gp: 12.00 }, 56: { g: 'A', gp: 12.00 },
            57: { g: 'A', gp: 12.00 }, 58: { g: 'A', gp: 12.00 }, 59: { g: 'A', gp: 12.00 },
            60: { g: 'A', gp: 12.00 }
        }
    },
    4: {
        max: 80,
        data: {
            32: { g: 'D', gp: 4.00 }, 33: { g: 'D', gp: 4.80 }, 34: { g: 'D', gp: 5.20 },
            35: { g: 'D', gp: 5.60 }, 36: { g: 'C-', gp: 6.00 }, 37: { g: 'C-', gp: 6.80 },
            38: { g: 'C-', gp: 7.20 }, 39: { g: 'C-', gp: 7.60 }, 40: { g: 'C', gp: 8.00 },
            41: { g: 'C', gp: 8.56 }, 42: { g: 'C', gp: 8.84 }, 43: { g: 'C', gp: 9.12 },
            44: { g: 'C+', gp: 9.40 }, 45: { g: 'C+', gp: 9.96 }, 46: { g: 'C+', gp: 10.24 },
            47: { g: 'C+', gp: 10.52 }, 48: { g: 'B-', gp: 10.80 }, 49: { g: 'B-', gp: 11.28 },
            50: { g: 'B-', gp: 11.52 }, 51: { g: 'B-', gp: 11.76 }, 52: { g: 'B', gp: 12.00 },
            53: { g: 'B', gp: 12.40 }, 54: { g: 'B', gp: 12.60 }, 55: { g: 'B', gp: 12.80 },
            56: { g: 'B+', gp: 13.00 }, 57: { g: 'B+', gp: 13.40 }, 58: { g: 'B+', gp: 13.60 },
            59: { g: 'B+', gp: 13.80 }, 60: { g: 'B+', gp: 14.00 }, 61: { g: 'B+', gp: 14.40 },
            62: { g: 'B+', gp: 14.60 }, 63: { g: 'B+', gp: 14.80 }, 64: { g: 'A-', gp: 15.00 },
            65: { g: 'A-', gp: 15.40 }, 66: { g: 'A-', gp: 15.60 }, 67: { g: 'A-', gp: 15.80 },
            68: { g: 'A', gp: 16.00 }, 69: { g: 'A', gp: 16.00 }, 70: { g: 'A', gp: 16.00 },
            71: { g: 'A', gp: 16.00 }, 72: { g: 'A', gp: 16.00 }, 73: { g: 'A', gp: 16.00 },
            74: { g: 'A', gp: 16.00 }, 75: { g: 'A', gp: 16.00 }, 76: { g: 'A', gp: 16.00 },
            77: { g: 'A', gp: 16.00 }, 78: { g: 'A', gp: 16.00 }, 79: { g: 'A', gp: 16.00 },
            80: { g: 'A', gp: 16.00 }
        }
    }
};

function lookup(ch, marks) {
    const table = TABLES[ch];
    if (!table) return { grade: 'F', gp: 0, isFail: true };
    const m = Number.isInteger(marks) ? marks : Math.ceil(marks);
    const capped = Math.min(m, table.max);
    const entry = table.data[capped];
    if (!entry) return { grade: 'F', gp: 0, isFail: true };
    return { grade: entry.g, gp: entry.gp, isFail: false };
}

function letterGrade(g) {
    if (g >= 4.0) return 'A';
    if (g >= 3.67) return 'A−';
    if (g >= 3.33) return 'B+';
    if (g >= 3.0) return 'B';
    if (g >= 2.67) return 'B−';
    if (g >= 2.33) return 'C+';
    if (g >= 2.0) return 'C';
    if (g >= 1.67) return 'C−';
    if (g >= 1.0) return 'D';
    return 'F';
}

function tier(g) {
    if (g >= 3.5) return 'green';
    if (g >= 2.5) return 'yellow';
    return 'red';
}

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function fmtNum(n) {
    return n % 1 === 0 ? n.toString() : n.toFixed(1);
}

function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    const msgEl = document.getElementById('toast-msg');
    if (msgEl) msgEl.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function triggerShake(el) {
    // Left intentionally empty as per user request
}

// Attach utilities to window if they need to be globally accessible
window.TABLES = TABLES;
window.lookup = lookup;
window.letterGrade = letterGrade;
window.tier = tier;
window.esc = esc;
window.fmtNum = fmtNum;
window.showToast = showToast;
window.triggerShake = triggerShake;
