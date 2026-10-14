---
name: ares-packager
description: Procedura di packaging per trasformare app web e script in eseguibili autonomi desktop (.exe Windows e .app Mac).
---

# Ares Desktop Packaging Engine

Usa questa skill per impacchettare script locali o web app in eseguibili pronti al doppio clic.

## Standard Architetturale
- Per applicazioni leggere basate su HTML/JS/Node: utilizzare packager stand-alone (es. pkg, caxa, o Electron/Tauri minificato).
- Includere sempre:
  - Icona personalizzata `.ico` per Windows e `.icns` per Mac.
  - Script di avvio automatico browser locale o webview integrata.
  - Chiusura pulita dei processi in background alla chiusura della finestra.
