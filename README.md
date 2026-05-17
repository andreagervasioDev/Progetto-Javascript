# Counter App

Semplice applicazione web che simula il comportamento di un contatore (counter), sviluppata in JavaScript puro senza l'utilizzo di framework o librerie esterne.

## Struttura del progetto

```
counter/
├── index.html
├── js/
│   └── script.js
├── style/
│   └── styles.css
└── .gitignore
└── README.md
```

## Funzionalità

- Visualizzazione del valore del counter, inizializzato a **0**
- Pulsante **+** per incrementare il valore
- Pulsante **−** per decrementare il valore
- Pulsante **reset** per riportare il counter a zero
- **Passo personalizzabile**: è possibile impostare di quanto incrementare o decrementare il valore ad ogni click
- **Colore dinamico**: il display diventa verde per valori positivi e arancione per valori negativi
- **Persistenza**: il valore viene salvato nel `localStorage` e mantenuto al ricaricamento della pagina
- **Supporto tastiera** tramite scorciatoie (vedere sezione dedicata)
- **Pulsante ?** con legenda delle scorciatoie da tastiera disponibili

## Scorciatoie da tastiera

| Tasto | Azione |
|-------|--------|
| `↑` | Incrementa il counter |
| `↓` | Decrementa il counter |
| `R` | Reset a zero |

## Tecnologie utilizzate

- HTML5
- CSS3
- JavaScript puro (Vanilla JS), senza framework o librerie esterne

## Come eseguire il progetto

1. Clona o scarica il progetto
2. Apri il file `index.html` in un browser web
3. Non è richiesta nessuna installazione o configurazione aggiuntiva
