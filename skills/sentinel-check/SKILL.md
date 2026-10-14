---
name: sentinel-check
description: Verifica deterministica del codice pre-commit con typecheck e limite anti-loop a 2 tentativi.
---

# Sentinel Check & Quality Gate

Usa questa skill per convalidare il codice prima di considerare completato qualsiasi task.

## Regole di Esecuzione:
1. **Typecheck & Linter**:
   - Eseguire la verifica statica (`tsc --noEmit`, test unitari o build di prova).
2. **Tetto Massimo Anti-Loop (2 Tentativi)**:
   - Se riscontri un errore di compilazione o fallimento del codice, puoi effettuare al massimo **DUE (2) tentativi consecutivi di fix**.
   - Se l'errore persiste dopo il secondo tentativo: **STOP IMMEDIATO**. È tassativo fermare qualsiasi tool-use, esporre l'errore chiaramente all'utente e attendere istruzioni.
