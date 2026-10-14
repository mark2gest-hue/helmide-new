---
name: security-audit
description: Checklist di sicurezza difensiva, scansione porte, protezione credenziali ed eliminazione leak di file .env.
---

# Security Audit & Defensive Checklist

Usa questa skill prima di pubblicare o condividere qualsiasi progetto, script o configurazione.

## Checklist Obbligatoria Pre-Deploy:
1. **Verifica File Sensibili**:
   - Assicurarsi che `.env`, `.env.local`, file con chiavi SSH o token API siano inseriti nel file `.gitignore`.
   - Verificare che nessun segreto sia hardcodato nel codice sorgente frontend o nei commit Git.
2. **Perimetro Server & VPS**:
   - Porte consentite: solo 80 (HTTP), 443 (HTTPS) ed eventuale SSH su porta personalizzata o protetta da firewall.
   - Disattivare listing delle directory su Nginx (`autoindex off`).
3. **Controllo Dipendenze**:
   - Eseguire `npm audit` per rilevare vulnerabilità note nei pacchetti installati.
