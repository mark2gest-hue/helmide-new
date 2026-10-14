# ⚡ HelmIDE New — Autonomous Agentic Cockpit

> La cabina di regia open-source per governare agenti AI, eliminare allucinazioni e sviluppare software a 60fps a costo token ZERO.

---

## 🎯 Caratteristiche Principali

- **Dashboard Cockpit & Agent Studio**: Interfaccia web scura ad alte prestazioni su porta **3040** (`http://localhost:3040`) con layout a 3 colonne stile IDE.
- **👔 Agente Direttore (Orchestratore Capo)**: Riceve i tuoi comandi, intervista sulle esigenze e coordina automaticamente la squadra dei 6 agenti.
- **📁 Albero Progetti Dinamico (Auto-Discovery)**: Mostra in tempo reale tutte le cartelle e i file sorgente dei tuoi progetti locali.
- **Squadra di 6 Agenti Specialistici**:
  1. 🎨 **UI Designer & Anti-Slop**: Frontend moderno con design da agenzia premium a 60fps.
  2. 📦 **Desktop App Packager**: Trasforma script e app in file eseguibili autonomi (`.exe` / `.app` Ares engine).
  3. 🎬 **Video & Script Processor**: Generazione teleprompter, scalette e sintesi per creator e docenti.
  4. 🛡️ **Security & Vulnerability Scanner**: Audit perimetrale porte aperte, file .env e bug.
  5. 🔍 **Competitor & Web Intel**: Monitoraggio prezzi e intelligence web automatica.
  6. 🚀 **Sentinel & Deploy Automator**: Typecheck, test di regressione e pubblicazione sicura.
- **Token Economy**: Bridge con sessione Antigravity (Google AI Pro) oppure chiave gratuita Google AI Studio (Gemini 2.5 Flash).

---

## 📁 GUIDA COMPLETA: Come Configurare i Progetti per Vederli nell'Albero

Per far apparire i tuoi progetti e i relativi file nell'albero a sinistra, hai **due modalità semplicissime**:

### Modalità 1: Configurazione Automatica della Cartella Madre (CONSIGLIATA)

Se tieni tutti i tuoi progetti dentro un'unica cartella principale (es. `C:/Sviluppo/Progetti` su Windows o `/Users/stefano/Sviluppo/Progetti` su Mac):

1. Apri il file `helmide.config.json` nella cartella di HelmIDE.
2. Inserisci il percorso della cartella madre nel campo `user.workspacePath`:
```json
{
  "user": {
    "name": "Stefano",
    "workspacePath": "C:/Sviluppo/Progetti"
  }
}
```
3. **Cosa succede automaticamente**:
   - HelmIDE scansiona tutte le sottocartelle presenti (es. `teleprompter-app`, `nuovo-sito`, `tool-video`).
   - Ciascuna cartella diventa un nodo dell'albero a sinistra.
   - Cliccando sulla freccia (▶), l'albero si apre e mostra i file reali (`index.html`, `app.js`, `package.json`, ecc.).
   - I file pesanti o inutili (come `node_modules`, `.git`, cache) vengono **esclusi in automatico**.

---

### Modalità 2: Configurazione Puntuale Progetto per Progetto (Array Projects)

Se invece i tuoi progetti si trovano in percorsi o dischi diversi, puoi elencarli singolarmente in `helmide.config.json` aggiungendo la sezione `projects`:

```json
{
  "user": {
    "name": "Stefano",
    "workspacePath": ""
  },
  "projects": [
    {
      "name": "Teleprompter Pro",
      "path": "C:/Lavori/Teleprompter",
      "tag": "locale"
    },
    {
      "name": "Piattaforma Didattica",
      "path": "D:/WebApps/Piattaforma",
      "tag": "vps"
    },
    {
      "name": "Script Video",
      "path": "C:/Users/stefano/Documents/Script",
      "tag": "draft"
    }
  ]
}
```

---

### Modalità 3: Aggiunta Veloce Direttamente dall'Interfaccia

Puoi anche aggiungere un nuovo progetto senza toccare nessun file:
1. Nella colonna sinistra, accanto a **"📁 I MIEI PROGETTI"**, clicca sul tasto **`+`**.
2. Digita il nome del progetto (es. `nuovo-bot`) e premi Invio.
3. Il progetto comparirà immediatamente nell'albero pronto per essere usato.

---

### Modalità 4: Fai fare tutto all'Agente in Antigravity

Se hai Antigravity aperto:
Basta scrivere nella chat:
> *"Agente, imposta il mio workspacePath su C:/Sviluppo/Progetti e avvia HelmIDE."*

L'agente aggiornerà il file di configurazione al posto tuo in 2 secondi.

---

## 🚀 Avvio Rapido

```bash
npm start
```
Apri il browser su: **`http://localhost:3040`**

---


---

## 📦 Struttura del Progetto & Moduli Inclusi

```
HelmIDE-New/
├── AGENTS.md                  # Regole operative non-negoziabili anti-allucinazione
├── TECH_RADAR.md              # Registro tecnologico (Adopt / Trial / Avoid)
├── README.md                  # Questa guida completa
├── helmide.config.json        # File di configurazione personale (workspace e chiavi)
├── helmide.config.example.json# Template pulito di partenza
├── package.json               # Configurazione di avvio Node.js (npm start)
├── server/
│   └── index.mjs              # Server locale leggero (porta 3040) con auto-discovery
├── public/
│   ├── index.html             # Dashboard Cockpit & Agent Studio (Aiutiamoci Edition)
│   ├── app.js                 # Logica frontend reattiva, modali e chat
│   └── logo-aiutiamoci.png    # Brand e logo ufficiale
├── agents/                    # Definizioni dei 6 agenti specialistici
│   ├── ui-designer.md         # 🎨 Frontend moderno a 60fps
│   ├── app-packager.md        # 📦 Packaging app (.exe / .app Ares Engine)
│   ├── media-script.md        # 🎬 Copioni per teleprompter e scalette
│   ├── security-scanner.md    # 🛡️ Audit porte, .env e vulnerabilità
│   ├── web-intel.md           # 🔍 Monitoraggio prezzi e competitor
│   └── sentinel-deploy.md     # 🚀 Typecheck e verifiche senza regressioni
└── skills/                    # Skill operative modulari pronte per l'IDE
    ├── ui-anti-slop/          # Standard tipografici e design anti-cliché AI
    ├── ares-packager/         # Metodo di packaging desktop standalone
    ├── video-script-processor/# Formattazione script per teleprompter con pause
    ├── security-audit/        # Checklist pre-deploy e scansione leak credenziali
    └── sentinel-check/        # Verifica deterministica con tetto anti-loop a 2 tentativi
```

---

## 🛠️ Skills Specialistici Pre-Integrate (Pronte all'uso)

In **HelmIDE New** trovi già installate e calibrate **5 Skills d'élite** conformi allo standard universale degli agenti AI (ognuna con il proprio contratto operativo `SKILL.md`):

| Skill | Cartella | Scopo Operativo | Come Chiamarla in Chat |
| :--- | :--- | :--- | :--- |
| 🎨 **UI Anti-Slop** | `skills/ui-anti-slop/` | Crea frontend moderni a 60fps, elimina template generici AI, impone tipografia ad alto contrasto (Plus Jakarta Sans + JetBrains Mono) e dark mode rifinita. | *"Usa la skill ui-anti-slop per ridisegnare la pagina"* |
| 📦 **Ares Packager** | `skills/ares-packager/` | Impacchetta script o web app in eseguibili autonomi standalone pronti al doppio clic (`.exe` per Windows e `.app` per Mac) con icone incluse. | *"Impacchetta questa app usando la skill ares-packager"* |
| 🎬 **Video & Script** | `skills/video-script-processor/` | Genera copioni per teleprompter con pause segnalate, scalette a capitoli e punti azionabili per lezioni e creator. | *"Prepara il copione teleprompter con video-script-processor"* |
| 🛡️ **Security Audit** | `skills/security-audit/` | Audit perimetrale su server e web app. Elimina leak di file `.env`, controlla porte aperte e verifica dipendenze vulnerabili. | *"Esegui la skill security-audit sul progetto"* |
| 🚀 **Sentinel Check** | `skills/sentinel-check/` | Quality check deterministico pre-commit con typecheck e limite anti-loop a 2 tentativi consecutivi prima dello stop. | *"Convalida il codice con la skill sentinel-check"* |

---

### Come l'Agente carica le Skills
Non devi fare configurazioni manuali:
1. Quando apri `HelmIDE-New` in **Antigravity**, **Cursor** o **Windsurf**, l'agente scansiona in automatico la cartella `skills/`.
2. Ogni skill espone all'agente istruzioni dettagliate, checklist e guardrails che ne guidano il comportamento senza allucinazioni.

---

## 📡 Tech Radar: Cosa Usare e Cosa Evitare

Nel file `TECH_RADAR.md` trovi le raccomandazioni ufficiali per non perdere tempo:
- **Cosa Adottare (ADOPT)**: Node.js/TypeScript, Tailwind CSS v4, Plus Jakarta Sans + JetBrains Mono, Drizzle ORM, Ares Packaging.
- **Cosa Sperimentare (TRIAL)**: Google Gemini 2.5 Flash (default 0€), Claude 3.7 Sonnet / DeepSeek R1 per compiti complessi, LiveKit per agenti vocali.
- **Cosa Evitare Assolutamente (AVOID)**: Refactoring cosmetico su codice funzionante, comandi shell multilinea annidati (causano crash dell'IDE), layout generici AI di bassa qualità.


---

## 🧠 Come Funziona la Memoria degli Agenti e Dove Viene Salvata

Uno dei problemi più grandi degli IDE AI è la *"perdita di memoria"*: quando chiudi l'editor, crasha il processo o apri una nuova chat, l'agente dimentica tutto e ricomincia a fare domande banali.

In **HelmIDE New** la memoria è **persistente, trasparente e salvata al 100% in locale sul tuo computer**:

### Dove risiede la memoria:
1. **`SESSION_STATE.md` (Memoria a Breve Termine / Lavagna Attiva)**:
   - Si trova nella cartella principale di HelmIDE.
   - Traccia il task attivo in tempo reale, l'agente che ci sta lavorando e le decisioni prese.
   - Quando riapri Antigravity o Cursor, l'agente legge questo file e **riprende il lavoro all'istante senza che tu debba rispiegare nulla**.

2. **`memory/sessions/` (Memoria Storica Sessioni)**:
   - Archivia i riassunti delle conversazioni e degli scambi passati.
   - Permette agli agenti di ricordare decisioni e codice scritto nei giorni precedenti.

3. **`memory/decisions/` (Registro Architetturale)**:
   - Conserva i vincoli rigidi (es. porte locali, database scelti, preferenze dell'utente) in modo che nessun agente proponga modifiche che violino gli standard stabiliti.

### Riservatezza Totale:
Nessun dato di memoria viene inviato a server cloud centralizzati: i file rimangono sul tuo disco fisso all'interno della cartella del progetto.

## 📄 Licenza
Rilasciato sotto licenza MIT. Libero per uso personale e commerciale.
