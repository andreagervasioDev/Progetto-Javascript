
// Stato dell'applicazione
let count = parseInt(localStorage.getItem('counter_value') || '0');
let operationHistory = [];

// Creazione dinamica del counter tramite manipolazione del DOM
const app = document.getElementById('app');

// Label descrittiva
const label = document.createElement('span');
label.className = 'counter-label';
label.textContent = 'contatore';
app.appendChild(label);

// Display del valore
const display = document.createElement('div');
display.className = 'counter-display';
display.textContent = '0';
app.appendChild(display);

// Riga pulsanti - e +
const btnRow = document.createElement('div');
btnRow.className = 'btn-row';

const btnDec = document.createElement('button');
btnDec.className = 'counter-btn';
btnDec.textContent = '-';
btnDec.setAttribute('aria-label', 'Decrementa')

const btnInc = document.createElement('button');
btnInc.className = 'counter-btn';
btnInc.textContent = '+';
btnInc.setAttribute('aria-label', 'Incrementa')

btnRow.appendChild(btnDec);
btnRow.appendChild(btnInc);
app.appendChild(btnRow);

// Riga passo personalizzato 
const stepRow = document.createElement('div');
stepRow.className = 'step-row';

const stepLabel = document.createElement('label');
stepLabel.className = 'step-label';
stepLabel.textContent = 'passo';
stepLabel.setAttribute('for', 'step-input');

const stepInput = document.createElement('input');
stepInput.type = 'number';
stepInput.id = 'step-input';
stepInput.className = 'step-input';
stepInput.value = '1';
stepInput.min = '1';
stepInput.max = '1000';

stepRow.appendChild(stepLabel);
stepRow.appendChild(stepInput);
app.appendChild(stepRow);

// Riga reset + help affiancati
const resetRow = document.createElement('div');
resetRow.className = 'reset-row';

// Pulsante reset
const resetBtn = document.createElement('button');
resetBtn.className = 'reset-btn';
resetBtn.textContent = 'reset';
resetRow.appendChild(resetBtn);

// Bottone ? con legenda scorciatoie da tastiera
const helpWrapper = document.createElement('div');
helpWrapper.className = 'help-wrapper';

const helpBtn = document.createElement('button');
helpBtn.className = 'help-btn';
helpBtn.textContent = '?';
helpBtn.setAttribute('aria-label', 'Mostra legenda tasti');

const helpTooltip = document.createElement('div');
helpTooltip.className = 'help-tooltip';

const tooltipTitle = document.createElement('div');
tooltipTitle.className = 'help-tooltip-title';
tooltipTitle.textContent = 'scorciatoie da tastiera';
helpTooltip.appendChild(tooltipTitle);

const shortcuts = [
{ key: '↑', desc: 'Incrementa' },
{ key: '↓', desc: 'Decrementa' },
{ key: 'R', desc: 'Reset a zero' }
];

shortcuts.forEach(function(s) {
const row = document.createElement('div');
row.className = 'help-row';

const keyEl = document.createElement('span');
keyEl.className = 'help-key';
keyEl.textContent = s.key;

const descEl = document.createElement('span');
descEl.className = 'help-desc';
descEl.textContent = s.desc;

row.appendChild(keyEl);
row.appendChild(descEl);
helpTooltip.appendChild(row);
});

helpBtn.addEventListener('click', function(e) {
e.stopPropagation();
helpTooltip.classList.toggle('visible');
});

document.addEventListener('click', function() {
helpTooltip.classList.remove('visible');
});

helpWrapper.appendChild(helpTooltip);
helpWrapper.appendChild(helpBtn);
resetRow.appendChild(helpWrapper);
app.appendChild(resetRow);

// Funzioni di logica
function getStep() {
    const v = parseInt(stepInput.value);
    return (isNaN(v) || v < 1) ? 1 : v;
}

function render() {
    display.textContent = count;

    // Colora in base al segno
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
    const step = getStep();
    count += step;
    bump();
    render();
});

btnDec.addEventListener('click', function() {
    const step = getStep();
    count -= step;
    bump();
    render();
});

resetBtn.addEventListener('click', function() {
    count = 0;
    render();
});

// Supporto tastiera: freccia su/giu e R per reset
document.addEventListener('keydown', function(e) {
    if (e.target === stepInput) return;
    if (e.key === 'ArrowUp') {
        btnInc.click();
    }else if (e.key === 'ArrowDown') {
        btnDec.click();
    } else if (e.key === 'r' || e.key === 'R') {
        resetBtn.click();
    }
});

// Inizializzazione 
render();

