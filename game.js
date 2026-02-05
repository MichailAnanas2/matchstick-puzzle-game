/**
 * Битсеты для 7-сегментных цифр
 *     a
 *    ---
 * f |   | b
 *    -g-
 * e |   | c
 *    ---
 *     d
 */
const DIGIT_MAP = {
    '0': { a:1, b:1, c:1, d:1, e:1, f:1, g:0 },
    '1': { a:0, b:1, c:1, d:0, e:0, f:0, g:0 },
    '2': { a:1, b:1, c:0, d:1, e:1, f:0, g:1 },
    '3': { a:1, b:1, c:1, d:1, e:0, f:0, g:1 },
    '4': { a:0, b:1, c:1, d:0, e:0, f:1, g:1 },
    '5': { a:1, b:0, c:1, d:1, e:0, f:1, g:1 },
    '6': { a:1, b:0, c:1, d:1, e:1, f:1, g:1 },
    '7': { a:1, b:1, c:1, d:0, e:0, f:0, g:0 },
    '8': { a:1, b:1, c:1, d:1, e:1, f:1, g:1 },
    '9': { a:1, b:1, c:1, d:1, e:0, f:1, g:1 }
};

const SEGMENTS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const H_SEGMENTS = ['a', 'd', 'g']; // горизонтальные

// ===== PUZZLE GENERATOR =====
class PuzzleGenerator {
    constructor() {
        this.puzzles = [];
    }

    generate() {
        const validated = [
  { "start": "6+4=4", "solution": "0+4=4" },
  { "start": "8-4=4", "solution": "0+4=4" },
  { "start": "6+1=5", "solution": "5+1=6" },
  { "start": "3+3=8", "solution": "3+5=8" },
  { "start": "9-5=8", "solution": "9-9=0" },
  { "start": "8+3=9", "solution": "0+9=9" },
  { "start": "8-0=0", "solution": "0+0=0" },
  { "start": "9+1=0", "solution": "9-1=8" },
  { "start": "3+2=7", "solution": "5+2=7" },
  { "start": "5+3=6", "solution": "3+3=6" },
  { "start": "9-4=3", "solution": "9-4=5" },
  { "start": "6-5=9", "solution": "8-5=3" },
  { "start": "2+6=9", "solution": "3+6=9" },
  { "start": "8-3=3", "solution": "8-3=5" },
  { "start": "9+5=6", "solution": "3+5=8" },
  { "start": "7+2=5", "solution": "7+2=9" },
  { "start": "6+0=8", "solution": "8-0=8" },
  { "start": "5+4=3", "solution": "5+4=9" },
  { "start": "3+6=0", "solution": "3+6=9" },
  { "start": "4+4=0", "solution": "4+4=8" },
  { "start": "7+7=0", "solution": "1+7=8" },
  { "start": "3+3=0", "solution": "3+3=6" },
  { "start": "9-8=9", "solution": "9+0=9" },
  { "start": "6+2=0", "solution": "6+2=8" },
  { "start": "5+0=3", "solution": "3+0=3" },
  { "start": "8+1=3", "solution": "8+1=9" },
  { "start": "4+1=3", "solution": "4+1=5" },
  { "start": "2+3=6", "solution": "3+3=6" },
  { "start": "1+7=6", "solution": "1+7=8" },
  { "start": "5+1=4", "solution": "3+1=4" },
  { "start": "7+1=6", "solution": "7+1=8" },
  { "start": "4+3=9", "solution": "4+5=9" },
  { "start": "0+5=3", "solution": "8-5=3" },
  { "start": "6-1=7", "solution": "8-1=7" },
  { "start": "9-3=8", "solution": "5+3=8" },
  { "start": "3-2=0", "solution": "2-2=0" },
  { "start": "5-2=1", "solution": "3-2=1" },
  { "start": "6+5=3", "solution": "8-5=3" },
  { "start": "9+3=6", "solution": "5+3=8" },
  { "start": "6+0=0", "solution": "0+0=0" },
  { "start": "9+0=0", "solution": "0+0=0" },
  { "start": "0-8=0", "solution": "0+0=0" },
  { "start": "0-0=8", "solution": "0+0=0" },
  { "start": "0+6=0", "solution": "0+0=0" },
  { "start": "0+9=0", "solution": "0+0=0" },
  { "start": "8+0=0", "solution": "0+0=0" },
  { "start": "0+8=0", "solution": "0+0=0" },
  { "start": "0+0=8", "solution": "0+0=0" },
  { "start": "0+0=6", "solution": "0+0=0" },
  { "start": "0+0=9", "solution": "0+0=0" },
  { "start": "6-0=0", "solution": "0-0=0" },
  { "start": "9-0=0", "solution": "0-0=0" },
  { "start": "0-6=0", "solution": "0-0=0" },
  { "start": "0-9=0", "solution": "0-0=0" },
  { "start": "0-0=6", "solution": "0-0=0" },
  { "start": "0-0=9", "solution": "0-0=0" },
  { "start": "6+1=1", "solution": "0+1=1" },
  { "start": "9+1=1", "solution": "0+1=1" },
  { "start": "8-1=1", "solution": "0+1=1" },
  { "start": "0-7=1", "solution": "0+1=1" },
  { "start": "0-1=7", "solution": "0+1=1" },
  { "start": "8+1=1", "solution": "0+1=1" },
  { "start": "0+7=1", "solution": "0+1=1" },
  { "start": "0+1=7", "solution": "0+1=1" },
  { "start": "6+2=2", "solution": "0+2=2" },
  { "start": "9+2=2", "solution": "0+2=2" },
  { "start": "8-2=2", "solution": "0+2=2" },
  { "start": "0+3=2", "solution": "0+2=2" },
  { "start": "8+2=2", "solution": "0+2=2" },
  { "start": "0+2=3", "solution": "0+2=2" },
  { "start": "6+3=3", "solution": "0+3=3" },
  { "start": "9+3=3", "solution": "0+3=3" },
  { "start": "0-9=3", "solution": "0+3=3" },
  { "start": "0-3=9", "solution": "0+3=3" },
  { "start": "8+3=3", "solution": "0+3=3" },
  { "start": "0+9=3", "solution": "0+3=3" },
  { "start": "0+3=9", "solution": "0+3=3" },
  { "start": "0+3=5", "solution": "0+3=3" },
  { "start": "9+4=4", "solution": "0+4=4" },
  { "start": "8+4=4", "solution": "0+4=4" },
  { "start": "6+5=5", "solution": "0+5=5" },
  { "start": "9+5=5", "solution": "0+5=5" },
  { "start": "8-5=5", "solution": "0+5=5" },
  { "start": "0-9=5", "solution": "0+5=5" },
  { "start": "0-6=5", "solution": "0+5=5" },
  { "start": "0-5=9", "solution": "0+5=5" },
  { "start": "0-5=6", "solution": "0+5=5" },
  { "start": "8+5=5", "solution": "0+5=5" },
  { "start": "0+9=5", "solution": "0+5=5" },
  { "start": "0+6=5", "solution": "0+5=5" },
  { "start": "0+5=9", "solution": "0+5=5" },
  { "start": "0+5=6", "solution": "0+5=5" },
  { "start": "6+6=6", "solution": "0+6=6" },
  { "start": "9+6=6", "solution": "0+6=6" },
  { "start": "8-6=6", "solution": "0+6=6" },
  { "start": "0-8=6", "solution": "0+6=6" },
  { "start": "0-6=8", "solution": "0+6=6" },
  { "start": "8+5=6", "solution": "0+6=6" },
  { "start": "0+9=6", "solution": "0+6=6" },
  { "start": "0+5=8", "solution": "0+6=6" }
        ];

        this.puzzles = validated.map((p, i) => ({
            id: i + 1,
            start: p.start,
            solution: p.solution
        }));
    }
}

// ===== MODAL HELPER =====
function showModal(icon, text, onClose) {
    const modal = document.getElementById('modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalText = document.getElementById('modal-text');
    const modalBtn = document.getElementById('modal-btn');

    modalIcon.textContent = icon;
    modalText.textContent = text;
    modal.classList.remove('hidden');

    modalBtn.onclick = () => {
        modal.classList.add('hidden');
        if (onClose) onClose();
    };
}

// ===== GAME CLASS =====
class Game {
    constructor() {
        this.generator = new PuzzleGenerator();
        this.generator.generate();
        
        this.currentIndex = parseInt(localStorage.getItem('match_idx')) || 0;
        this.bestTimes = JSON.parse(localStorage.getItem('match_bests')) || {};
        
        this.startTime = 0;
        this.timerInterval = null;
        this.draggedSlot = null;
        this.initialState = {};
        this.currentPuzzleStart = '';
        
        this.initUI();
        updateUILabels();
        this.showScreen('start');
    }

    initUI() {
        document.getElementById('btn-play').onclick = () => this.startPuzzle(0);
        document.getElementById('btn-check').onclick = () => this.checkSolution();
        document.getElementById('btn-hint').onclick = () => showRewarded(() => this.showHint());
        document.getElementById('btn-next').onclick = () => this.nextPuzzle();
        document.getElementById('btn-back').onclick = () => this.showScreen('start');
        document.getElementById('btn-reset').onclick = () => this.resetPuzzle();
        document.getElementById('btn-lang').onclick = () => toggleLang();
        document.getElementById('btn-lang').innerText = `🌐 ${currentLang.toUpperCase()}`;
        
        if (this.currentIndex > 0) {
            document.getElementById('btn-continue').classList.remove('hidden');
            document.getElementById('btn-continue').onclick = () => this.startPuzzle(this.currentIndex);
        }

        // Global events
        document.addEventListener('pointermove', (e) => this.onPointerMove(e));
        document.addEventListener('pointerup', (e) => this.onPointerUp(e));
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    showScreen(name) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${name}`).classList.add('active');
        if (name === 'start' && this.currentIndex > 0) {
            document.getElementById('btn-continue').classList.remove('hidden');
        }
    }

    async startPuzzle(index) {
        if (index >= 100) index = 0;
        this.currentIndex = index;
        const puzzle = this.generator.puzzles[index];
        this.currentPuzzleStart = puzzle.start;
        this.renderEquation(puzzle.start);
        
        this.startTime = Date.now();
        this.updateTimer();
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
        
        document.getElementById('label-puzzle-index').innerText = `${t('task')} ${index + 1} / 100`;
        this.showScreen('game');
        this.loadRecords(index + 1);
    }

    resetPuzzle() {
        this.renderEquation(this.currentPuzzleStart);
    }

    async loadRecords(id) {
        const local = this.bestTimes[id];
        document.getElementById('best-local').innerText = `${t('best')}: ${local ? this.formatTime(local) : '--:--'}`;
        
        const global = await getGlobalBest(id);
        if (global) {
            document.getElementById('best-global').innerText = `${t('worldBest')}: ${this.formatTime(global.time)}`;
        } else {
            document.getElementById('best-global').innerText = `${t('worldBest')}: --:--`;
        }
    }

    // ===== RENDERING =====
    renderEquation(equation) {
        const field = document.getElementById('match-field');
        field.innerHTML = '';
        this.initialState = {};

        const chars = equation.split('');
        chars.forEach((char, tokenIdx) => {
            if (/\d/.test(char)) {
                this.renderDigit(field, char, tokenIdx);
            } else if (char === '+' || char === '-') {
                this.renderOperator(field, char, tokenIdx);
            } else if (char === '=') {
                this.renderEquals(field, tokenIdx);
            }
        });

        // Save initial state
        this.saveState();
    }

    renderDigit(container, digit, tokenIdx) {
        const token = document.createElement('div');
        token.className = 'token digit';
        token.dataset.token = tokenIdx;
        token.dataset.type = 'digit';

        const pattern = DIGIT_MAP[digit];

        SEGMENTS.forEach(seg => {
            const slot = document.createElement('div');
            const isHorizontal = H_SEGMENTS.includes(seg);
            slot.className = `segment ${isHorizontal ? 'h' : 'v'} seg-${seg}`;
            slot.dataset.token = tokenIdx;
            slot.dataset.seg = seg;
            
            if (pattern[seg]) {
                slot.classList.add('active');
            } else {
                slot.classList.add('empty');
            }

            slot.addEventListener('pointerdown', (e) => this.onSlotPointerDown(e, slot));
            token.appendChild(slot);
        });

        container.appendChild(token);
    }

    renderOperator(container, op, tokenIdx) {
        const token = document.createElement('div');
        token.className = 'token operator';
        token.dataset.token = tokenIdx;
        token.dataset.type = 'operator';
        token.dataset.op = op;

        // Horizontal bar (always present for + and -)
        const hSlot = document.createElement('div');
        hSlot.className = 'op-slot h active';
        hSlot.dataset.token = tokenIdx;
        hSlot.dataset.seg = 'h';
        hSlot.style.top = '50%';
        hSlot.style.left = '50%';
        hSlot.style.transform = 'translate(-50%, -50%)';
        hSlot.addEventListener('pointerdown', (e) => this.onSlotPointerDown(e, hSlot));
        token.appendChild(hSlot);

        // Vertical bar (only for +)
        const vSlot = document.createElement('div');
        vSlot.className = `op-slot v ${op === '+' ? 'active' : 'empty'}`;
        vSlot.dataset.token = tokenIdx;
        vSlot.dataset.seg = 'v';
        vSlot.style.top = '50%';
        vSlot.style.left = '50%';
        vSlot.style.transform = 'translate(-50%, -50%)';
        vSlot.addEventListener('pointerdown', (e) => this.onSlotPointerDown(e, vSlot));
        token.appendChild(vSlot);

        container.appendChild(token);
    }

    renderEquals(container, tokenIdx) {
        const token = document.createElement('div');
        token.className = 'token equals';
        token.dataset.token = tokenIdx;
        token.dataset.type = 'equals';

        // Two fixed bars
        token.innerHTML = '<div class="eq-bar"></div><div class="eq-bar"></div>';
        container.appendChild(token);
    }

    // ===== INTERACTION =====
    onSlotPointerDown(e, slot) {
        e.preventDefault();
        
        if (this.draggedSlot) {
            // Already dragging - try to place
            if (slot.classList.contains('empty')) {
                slot.classList.remove('empty');
                slot.classList.add('active');
                this.cancelDrag();
            }
            return;
        }

        if (slot.classList.contains('active')) {
            // Pick up match
            this.draggedSlot = slot;
            slot.classList.remove('active');
            slot.classList.add('empty');
            
            const ghost = document.getElementById('drag-ghost');
            ghost.className = slot.classList.contains('h') ? 'h' : 'v';
            ghost.style.display = 'block';
            this.moveGhost(e);
            
            // Highlight valid drop zones
            document.querySelectorAll('.segment.empty, .op-slot.empty').forEach(s => {
                s.classList.add('highlight');
            });
        }
    }

    onPointerMove(e) {
        if (this.draggedSlot) {
            this.moveGhost(e);
        }
    }

    onPointerUp(e) {
        if (!this.draggedSlot) return;
        
        // Получаем координаты указателя
        const x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
        const y = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || 0;
        
        // Ищем ближайший пустой слот (магнитное прилипание)
        const emptySlots = document.querySelectorAll('.segment.empty, .op-slot.empty');
        let dropTarget = null;
        let minDst = Infinity;
        const threshold = 60; // Радиус захвата в пикселях

        emptySlots.forEach(slot => {
            const rect = slot.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dst = Math.hypot(x - centerX, y - centerY);
            
            if (dst < minDst && dst < threshold) {
                minDst = dst;
                dropTarget = slot;
            }
        });

        if (dropTarget) {
            dropTarget.classList.remove('empty', 'highlight');
            dropTarget.classList.add('active');
        } else {
            // Return match to original position
            this.draggedSlot.classList.remove('empty');
            this.draggedSlot.classList.add('active');
        }

        this.cancelDrag();
    }

    cancelDrag() {
        this.draggedSlot = null;
        document.getElementById('drag-ghost').style.display = 'none';
        document.querySelectorAll('.highlight').forEach(s => s.classList.remove('highlight'));
    }

    moveGhost(e) {
        const ghost = document.getElementById('drag-ghost');
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        ghost.style.left = (x - 20) + 'px';
        ghost.style.top = (y - 20) + 'px';
    }

    // ===== STATE MANAGEMENT =====
    saveState() {
        this.initialState = {};
        document.querySelectorAll('.segment, .op-slot').forEach(slot => {
            const key = `${slot.dataset.token}_${slot.dataset.seg}`;
            this.initialState[key] = slot.classList.contains('active');
        });
    }

    getCurrentState() {
        const state = {};
        document.querySelectorAll('.segment, .op-slot').forEach(slot => {
            const key = `${slot.dataset.token}_${slot.dataset.seg}`;
            state[key] = slot.classList.contains('active');
        });
        return state;
    }

    countDifferences() {
        const current = this.getCurrentState();
        let diff = 0;
        for (const key in this.initialState) {
            if (this.initialState[key] !== current[key]) {
                diff++;
            }
        }
        return diff;
    }

    // ===== EQUATION PARSING =====
    getCurrentEquation() {
        const tokens = document.querySelectorAll('.token');
        let equation = '';

        tokens.forEach(token => {
            const type = token.dataset.type;

            if (type === 'digit') {
                const slots = token.querySelectorAll('.segment');
                const pattern = {};
                slots.forEach(s => {
                    pattern[s.dataset.seg] = s.classList.contains('active') ? 1 : 0;
                });
                
                // Find matching digit
                let found = '?';
                for (const [digit, ref] of Object.entries(DIGIT_MAP)) {
                    let match = true;
                    for (const seg of SEGMENTS) {
                        if (pattern[seg] !== ref[seg]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        found = digit;
                        break;
                    }
                }
                equation += found;

            } else if (type === 'operator') {
                const hSlot = token.querySelector('.op-slot.h');
                const vSlot = token.querySelector('.op-slot.v');
                const hasH = hSlot && hSlot.classList.contains('active');
                const hasV = vSlot && vSlot.classList.contains('active');
                
                if (hasH && hasV) equation += '+';
                else if (hasH && !hasV) equation += '-';
                else equation += '?';

            } else if (type === 'equals') {
                equation += '=';
            }
        });

        return equation;
    }

    isValidMath(eq) {
        if (eq.includes('?')) return false;
        try {
            const parts = eq.split('=');
            if (parts.length !== 2) return false;
            
            const evalExpr = (expr) => {
                // Simple parser for a op b
                const match = expr.match(/^(\d+)([+-])(\d+)$/);
                if (match) {
                    const a = parseInt(match[1]);
                    const op = match[2];
                    const b = parseInt(match[3]);
                    return op === '+' ? a + b : a - b;
                }
                return parseInt(expr);
            };

            return evalExpr(parts[0]) === evalExpr(parts[1]);
        } catch(e) { 
            return false; 
        }
    }

    // ===== VALIDATION =====
    checkSolution() {
        const diffCount = this.countDifferences();

        if (diffCount !== 2) {
            showModal('🤔', t('errorMove'));
            return;
        }

        const eq = this.getCurrentEquation();
        console.log('Current equation:', eq);

        if (this.isValidMath(eq)) {
            this.onSuccess();
        } else {
            showModal('❌', t('errorMath'));
        }
    }

    onSuccess() {
        clearInterval(this.timerInterval);
        const time = Date.now() - this.startTime;
        const puzzleId = this.currentIndex + 1;
        
        if (!this.bestTimes[puzzleId] || time < this.bestTimes[puzzleId]) {
            this.bestTimes[puzzleId] = time;
            localStorage.setItem('match_bests', JSON.stringify(this.bestTimes));
            saveScore(puzzleId, time);
        }

        document.getElementById('current-time-res').innerText = this.formatTime(time);
        document.getElementById('local-best-res').innerText = this.formatTime(this.bestTimes[puzzleId]);
        this.showScreen('success');
    }

    nextPuzzle() {
        this.currentIndex++;
        localStorage.setItem('match_idx', this.currentIndex);
        showFullscreen(() => this.startPuzzle(this.currentIndex));
    }

    updateTimer() {
        const ms = Date.now() - this.startTime;
        document.getElementById('game-timer').innerText = this.formatTime(ms);
    }

    formatTime(ms) {
        const totalSec = Math.floor(ms / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    showHint() {
        const sol = this.generator.puzzles[this.currentIndex].solution;
        showModal('💡', `${t('task')}: ${sol}`);
    }

    handleKeyboard(e) {
        if (e.key === 'Escape' && this.draggedSlot) {
            this.draggedSlot.classList.remove('empty');
            this.draggedSlot.classList.add('active');
            this.cancelDrag();
        }
    }
}

// ===== INIT =====
window.onload = async () => {
    await initYandex();
    window.game = new Game();
};
