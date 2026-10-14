---
name: ui-anti-slop
description: Linee guida e standard per costruire interfacce frontend d'élite a 60fps rifiutando il look generico AI.
---

# UI Anti-Slop & High-End Design Directive

Usa questa skill ogni volta che progetti o modifichi pagine web, componenti o interfacce grafiche.

## 1. Bandire i Cliché AI
- Vietato il gradiente generico viola-blu/cyan su sfondo nero vuoto.
- Vietate le card con glassmorphism pesante o bordi spessi non motivati.
- Vietate le griglie a 3 colonne identiche con icone generiche arrotondate.

## 2. Tipografia con Carattere
- Usa accoppiate tipografiche solide:
  - Intestazioni e display: `Plus Jakarta Sans`, `Outfit` o serif deciso.
  - Dati tecnici, codice e badge: `JetBrains Mono`.
- Micro-etichette ad alto contrasto (10px–11px maiuscole con tracking leggero).

## 3. Dinamismo a 60fps & Dettagli
- Hover effects sottili su card e pulsanti (`transition duration-200 active:scale-95`).
- Texture tangibili: sottili linee di griglia tecniche, bordi fini (`border-slate-800/80`), dark mode a livelli (sfondo #090a0f, card rgba(18, 20, 29, 0.7)).
