
// Stato dell'applicazione
let count = parseInt(localStorage.getItem('counter-value') || '0');

function el(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    const { className, textContent, ...attrs } = props;
    if (className) node.className = className;
    if (textContent !== undefined) node.textContent = textContent;
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    children.forEach(c => node.appendChild(c));
    return node;
}

// Creazione dinamica del counter tramite manipolazione del DOM
const app = document.getElementById('app');

const label   = el('span', { className: 'counter-label', textContent: 'contatore' });
const display = el('div',  { className: 'counter-display', textContent: '0' });

const btnDec = el('button', { className: 'counter-btn', textContent: '-', 'aria-label': 'Decrementa' });
const btnInc = el('button', { className: 'counter-btn', textContent: '+', 'aria-label': 'Incrementa' });
const btnRow = el('div', { className: 'btn-row' }, btnDec, btnInc);

const stepLabel = el('label', { className: 'step-label', textContent: 'passo', for: 'step-input' });
const stepInput = el('input', { className: 'step-input', id: 'step-input', type: 'number', value: '1', min: '1', max: '1000' });
const stepRow   = el('div', { className: 'step-row' }, stepLabel, stepInput);

const resetBtn = el('button', { className: 'reset-btn', textContent: 'reset' });

const shortcuts = [
    { key: '↑', desc: 'Incrementa' },
    { key: '↓', desc: 'Decrementa' },
    { key: 'R', desc: 'Reset a zero' }
];

const tooltipTitle = el('div', { className: 'help-tooltip-title', textContent: 'scorciatoie da tastiera' });
const helpTooltip  = el('div', { className: 'help-tooltip' }, tooltipTitle);

shortcuts.forEach(function(s) {
    helpTooltip.appendChild(
        el('div', { className: 'help-row' },
            el('span', { className: 'help-key',  textContent: s.key }),
            el('span', { className: 'help-desc', textContent: s.desc })
        )
    );
});

const helpBtn     = el('button', { className: 'help-btn', textContent: '?', 'aria-label': 'Mostra legenda tasti' });
const helpWrapper = el('div', { className: 'help-wrapper' }, helpTooltip, helpBtn);
const resetRow    = el('div', { className: 'reset-row' }, resetBtn, helpWrapper);

app.appendChild(label);
app.appendChild(display);
app.appendChild(btnRow);
app.appendChild(stepRow);
app.appendChild(resetRow);

// Funzioni di logica
function getStep() {
    const v = parseInt(stepInput.value);
    return (isNaN(v) || v < 1) ? 1 : v;
}

function render() {
    display.textContent = count;

    display.classList.remove('positive', 'negative');
    if (count > 0) {
        display.classList.add('positive');
    } else if (count < 0) {
        display.classList.add('negative');
    }

    localStorage.setItem('counter-value', count);
}

function bump() {
    display.classList.add('bump');
    setTimeout(() => display.classList.remove('bump'), 120);
}

// Event Listeners
btnInc.addEventListener('click', function() {
    count += getStep();
    bump();
    render();
});

btnDec.addEventListener('click', function() {
    count -= getStep();
    bump();
    render();
});

resetBtn.addEventListener('click', function() {
    count = 0;
    render();
});

helpBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    helpTooltip.classList.toggle('visible');
});

document.addEventListener('click', function() {
    helpTooltip.classList.remove('visible');
});

// Supporto tastiera: freccia su/giu e R per reset
document.addEventListener('keydown', function(e) {
    if (e.target === stepInput) return;
    if (e.key === 'ArrowUp') {
        btnInc.click();
    } else if (e.key === 'ArrowDown') {
        btnDec.click();
    } else if (e.key === 'r' || e.key === 'R') {
        resetBtn.click();
    }
});

// Inizializzazione
render();
