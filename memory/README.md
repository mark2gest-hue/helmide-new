# 🧠 Cartella Memoria Persistente (`memory/`)

Tutti i ricordi, le decisioni e i log operativi degli agenti vengono archiviati **esclusivamente qui in locale** sul computer dell'utente:

1. **`SESSION_STATE.md` (nella radice)**:
   - È la memoria di lavoro a breve termine ("lavagna attiva").
   - Contiene il task corrente, chi ci sta lavorando e l'ultimo passo completato.
   - Viene letto dall'agente ad ogni inizio chat per ripartire in 0 secondi.

2. **`memory/sessions/`**:
   - Salva i riepiloghi storici delle sessioni passate in formato JSON e Markdown.
   - Se l'IDE crasha o si apre una nuova conversazione, l'agente può consultare i file in questa cartella per ripescare accordi e codice scritti giorni prima.

3. **`memory/decisions/`**:
   - Salva le scelte architetturali (es. perché è stata scelta una certa libreria, vincoli di database, o preferenze espresse dall'utente).
