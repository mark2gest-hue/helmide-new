# HelmIDE New — Regole Operative & Guardrails per Agenti AI

Questo file definisce le **Regole Operative Centrali** per qualsiasi agente AI (Antigravity, Cursor, Windsurf, Claude Code) che lavora su questo workspace.

---

## 🎯 Protocollo Operativo "Zero-Allucinazioni" (Plan → Patch → Sentinel)

Ogni sessione o modifica al codice DEVE seguire rigorosamente queste 3 fasi:

### Fase 1 — Ispezione & Piano (Zero Modifiche alla Cieca)
- Ispeziona sempre i file esistenti prima di proporre codice.
- Identifica la causa esatta del problema o dell'obiettivo.
- Presenta un piano in **massimo 3 punti secchi** prima di toccare qualsiasi file.

### Fase 2 — Patch Chirurgica (Anti-Bloat & YAGNI)
- **Divieto Assoluto di Refactoring Cosmetico**: Non toccare o "abbellire" codice funzionante non richiesto.
- **Solo Patch Incrementali**: Modifica solo le righe necessarie al task, senza riscrivere interi file da zero.
- **Divieto di Boilerplate Prematuro (YAGNI)**: Non scrivere codice difensivo per scenari futuri ipotetici. Risolvi il problema adesso nel modo più pulito e piatto possibile.

### Fase 3 — Sentinel Check & Limite Anti-Loop (Max 2 Tentativi)
- Esegui sempre un check di validazione (linter, typecheck o test di avvio).
- **Tetto Massimo Anti-Loop (2 Tentativi)**: Se si riscontra un errore di compilazione o fallimento del codice, l'agente può effettuare al massimo **DUE (2) tentativi consecutivi di fix automatico**.
- Se l'errore persiste dopo il secondo tentativo: **STOP IMMEDIATO AL TOOL-USE**. Esporre l'errore chiaramente all'utente e chiedere indicazioni senza sprecare token.

---

## 🛡️ Stabilità IDE & Comandi Shell Puliti
- I comandi shell eseguiti dall'agente devono essere **a riga singola pulita**.
- Vietato categoricamente passare script multilinea annidati complessi (heredoc pesanti) che possono corrompere il parser di permessi e provocare il crash del Language Server.

---

## 🧠 Memoria Persistente tra Sessioni
- A ogni interruzione o riavvio dell'IDE, consulta sempre `SESSION_STATE.md` o i transcript per riprendere il contesto esatto del task attivo senza chiedere all'utente di rispiegare da capo.

---

## 🎨 Standard UI & Motion (Aiutiamoci Standard)
- Interfacce scure ad alto contrasto, animazioni fluide a 60fps.
- Font accoppiati: `Plus Jakarta Sans` per intestazioni, `JetBrains Mono` per codici, dati e badge.
- Rifiutare layout AI generici e cliché grafici amatoriali.
