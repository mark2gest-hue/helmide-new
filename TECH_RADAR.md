# 📡 Tech Radar — Standard Tecnologici Consigliati (HelmIDE Edition)

Questo documento elenca le tecnologie, librerie e pattern architetturali consigliati e testati per costruire software stabile e veloce con agenti AI.

---

## 🟢 ADOPT (Tecnologie Primarie Consigliate)

| Area | Tecnologia | Motivazione |
| :--- | :--- | :--- |
| **Runtime & Core** | **Node.js (LTS) / TypeScript** | Standard universale, typing sicuro, enorme ecosistema. |
| **Frontend UI** | **Vanilla CSS / Tailwind CSS v4** | Flessibilità totale, layout responsive rapidi, zero overhead. |
| **Tipografia & Look** | **Plus Jakarta Sans + JetBrains Mono** | Design ad alto contrasto, leggibilità tecnica, look premium. |
| **Database & ORM** | **PostgreSQL (Supabase / Neon) + Drizzle ORM** | Relazionale robusto, migrazioni SQL trasparenti, zero magia nascosta. |
| **Desktop Packaging** | **Ares Pattern (Electron / Tauri / Caxa)** | Trasforma script web in eseguibili autonomi (.exe/.app). |
| **Agent Protocol** | **Model Context Protocol (MCP)** | Standard aperto per collegare tool ed estensioni a qualsiasi LLM. |

---

## 🟡 TRIAL (In Valutazione & Sperimentazione)

| Area | Tecnologia | Note |
| :--- | :--- | :--- |
| **Modelli LLM** | **Google Gemini 2.5 Flash** | Ideale come default: 1M context window, 0€ su tier free, latenza <1s. |
| **Ragionamento** | **Claude 3.7 Sonnet / DeepSeek R1** | Per task complessi di architettura e refactoring strutturale. |
| **Automazione** | **LiveKit / WebRTC Agents** | Per centralini vocali e agenti in tempo reale a bassissima latenza. |

---

## 🔴 AVOID (Pattern Sconsigliati / Da Evitare)

| Tecnologia / Pattern | Motivo |
| :--- | :--- |
| **Refactoring Cosmetico Non Richiesto** | Brucia token inutili e introduce regressioni su codice funzionante. |
| **Comandi Shell Multilinea / Heredoc Annidati** | Corrompono i permessi dei Language Server negli agenti IDE provocando crash. |
| **UI Generiche Slop (Gradienti viola/cyan kitsch)** | Aspetto amatoriale e poco credibile per software B2B o commerciale. |
| **Dipendenze Pesanti Premature (YAGNI)** | Non aggiungere librerie esterne per problemi risolvibili con funzioni standard JavaScript. |
