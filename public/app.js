// HelmIDE New - App Logic
const AGENTS = [
  { id: "director", name: "Agente Direttore", icon: "👔", role: "Coordina, configura e delega alla squadra" },
  { id: "ui-designer", name: "UI Designer", icon: "🎨", role: "Frontend Moderno a 60fps" },
  { id: "app-packager", name: "Desktop Packager", icon: "📦", role: "Crea file .exe e .app autonomi" },
  { id: "media-script", name: "Video & Script", icon: "🎬", role: "Teleprompter, scalette, sintesi" },
  { id: "security-scanner", name: "Security Scanner", icon: "🛡️", role: "Audit porte, .env esposti, bug" },
  { id: "web-intel", name: "Web Intel & Prezzi", icon: "🔍", role: "Monitor prezzi e novita online" },
  { id: "sentinel-deploy", name: "Sentinel & Deploy", icon: "🚀", role: "Typecheck, test e deploy sicuro" }
];

const DEFAULT_AGENT_PROMPTS = {
  "director": "Sei l Agente Direttore e Coordinatore Capo di HelmIDE New. Il tuo compito principale e guidare l utente, analizzare le sue richieste complesse e configurare automaticamente gli altri 6 agenti specialistici assegnando loro ruoli e compiti precisi.",
  "ui-designer": "Sei un Senior Frontend Architect e UI Designer. Il tuo obiettivo e creare interfacce moderne, pulite a 60fps con tipografia ad alto contrasto. Evita layout generici, gradients kitsch e colori spenti. Usa Tailwind CSS moderno e micro-animazioni fluide.",
  "app-packager": "Sei un Desktop App Packaging Specialist (Ares Engine). Prendi script o progetti web e li impacchetti in eseguibili autonomi (.exe per Windows o .app per Mac) pronti al doppio clic, includendo dipendenze e icone personalizzate.",
  "media-script": "Sei uno specialista nella creazione di script multimediali e didattica. Converti idee, trascrizioni audio o video in copioni scorrevoli per teleprompter con pause segnalate, scalette a capitoli e punti elenco per slide.",
  "security-scanner": "Sei un Security Auditor & Ethical Hacker difensivo. Scansioni web app e server alla ricerca di vulnerabilita perimetrali, file sensibili (.env, chiavi SSH) esposti pubblicamente, porte aperte non necessarie e configurazioni Nginx deboli.",
  "web-intel": "Sei un Web Intelligence & Pricing Analyst. Monitori siti web pubblici di concorrenti o cataloghi e-commerce. Estrai prezzi, dettagli di offerta e variazioni di listino sintetizzandoli in tabelle comparative ordinate.",
  "sentinel-deploy": "Sei il Sentinel DevOps Automator. Prima di qualsiasi rilascio, esegui typecheck TypeScript, linter e test anti-regressione. Blocchi il rilascio se ci sono errori e applichi il tetto massimo anti-loop a 2 tentativi prima di chiedere conferma."
};

let currentAgentId = "director";
let activeConfigAgentId = "director";
let currentSelectedModel = "gemini-2.5-flash";

function selectAgent(agentId) {
  currentAgentId = agentId;
  const agent = AGENTS.find(a => a.id === agentId);
  if (!agent) return;

  const label = document.getElementById("active-agent-label");
  if (label) label.innerText = agent.icon + " " + agent.name;

  document.querySelectorAll(".agent-item").forEach(el => {
    el.classList.remove("bg-slate-800/80", "border-cyan-500/40");
    el.classList.add("hover:bg-slate-800/50", "border-transparent");
  });

  const activeBtn = document.getElementById("agent-btn-" + agentId);
  if (activeBtn) {
    activeBtn.classList.add("bg-slate-800/80", "border-cyan-500/40");
    activeBtn.classList.remove("border-transparent");
  }

  const chat = document.getElementById("chat-messages");
  if (chat) {
    const notice = document.createElement("div");
    notice.className = "flex justify-center my-2";
    notice.innerHTML = '<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-cyan-300">Canale collegato con ' + agent.icon + ' ' + agent.name + '</span>';
    chat.appendChild(notice);
    chat.scrollTop = chat.scrollHeight;
  }
}

function toggleFolder(folderId) {
  const files = document.getElementById("files-" + folderId);
  const icon = document.getElementById("icon-" + folderId);
  if (!files || !icon) return;

  if (files.classList.contains("hidden")) {
    files.classList.remove("hidden");
    icon.innerText = "▼";
    icon.className = "text-[11px] text-cyan-400";
  } else {
    files.classList.add("hidden");
    icon.innerText = "▶";
    icon.className = "text-[11px] text-slate-500";
  }
}

function addProjectPrompt() {
  const name = prompt("Inserisci il nome del nuovo progetto locale:");
  if (!name) return;
  const tree = document.getElementById("projects-tree");
  const id = "proj-" + name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  
  const newDiv = document.createElement("div");
  newDiv.className = "space-y-1";
  newDiv.innerHTML = '<div onclick="toggleFolder(\'' + id + '\')" class="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/60 cursor-pointer text-slate-200 font-semibold group">' +
    '<div class="flex items-center gap-1.5 truncate">' +
      '<span id="icon-' + id + '" class="text-[11px] text-cyan-400">▼</span>' +
      '<span>' + name + '</span>' +
    '</div>' +
    '<span class="text-[10px] text-cyan-400 font-normal">nuovo</span>' +
  '</div>' +
  '<div id="files-' + id + '" class="pl-4 space-y-1 text-slate-400 text-[11px]">' +
    '<div class="flex items-center gap-1.5 py-0.5 hover:text-slate-200 cursor-pointer"><span>📄</span><span>README.md</span></div>' +
    '<div class="flex items-center gap-1.5 py-0.5 hover:text-slate-200 cursor-pointer"><span>📄</span><span>index.js</span></div>' +
  '</div>';
  tree.appendChild(newDiv);
}

function switchView(view) {
  const cockpit = document.getElementById("view-cockpit");
  const studio = document.getElementById("view-studio");
  const tabCockpit = document.getElementById("tab-cockpit");
  const tabStudio = document.getElementById("tab-studio");

  if (view === "studio") {
    if (cockpit) cockpit.classList.add("hidden");
    if (studio) studio.classList.remove("hidden");
    if (tabStudio) tabStudio.className = "px-3 py-1 rounded-md text-xs font-medium text-white bg-slate-800 border border-slate-700/60 shadow-sm transition flex items-center gap-1.5";
    if (tabCockpit) tabCockpit.className = "px-3 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-slate-200 transition";
  } else {
    if (studio) studio.classList.add("hidden");
    if (cockpit) cockpit.classList.remove("hidden");
    if (tabCockpit) tabCockpit.className = "px-3 py-1 rounded-md text-xs font-medium text-white bg-slate-800 border border-slate-700/60 shadow-sm transition";
    if (tabStudio) tabStudio.className = "px-3 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-slate-200 transition flex items-center gap-1.5";
  }
}

function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  const chat = document.getElementById("chat-messages");
  
  const userBubble = document.createElement("div");
  userBubble.className = "flex items-start justify-end gap-3";
  userBubble.innerHTML = '<div class="bg-cyan-600/30 border border-cyan-500/40 p-3 rounded-2xl rounded-tr-sm text-cyan-100 max-w-xl">' + text + '</div>';
  chat.appendChild(userBubble);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  setTimeout(function() {
    const agentBubble = document.createElement("div");
    agentBubble.className = "flex items-start gap-3 max-w-2xl";
    agentBubble.innerHTML = '<div class="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold shrink-0">✓</div>' +
      '<div class="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-sm text-slate-300 space-y-1.5">' +
        '<p class="font-mono text-cyan-400 font-semibold">[Plan - ' + currentAgentId + ' (' + currentSelectedModel + ')]</p>' +
        '<p>Ricevuto. Sto elaborando il task con l\'agente ' + currentAgentId + ' secondo le regole di HelmIDE.</p>' +
        '<p class="text-[11px] text-slate-400 font-mono">&gt; Sentinel Status: Clean | Zero allucinazioni | Modello: ' + currentSelectedModel + '</p>' +
      '</div>';
    chat.appendChild(agentBubble);
    chat.scrollTop = chat.scrollHeight;
  }, 500);
}

function clearChat() {
  const chat = document.getElementById("chat-messages");
  if (chat) chat.innerHTML = "";
}

// Modal Chiavi API
function openKeysModal() {
  const modal = document.getElementById("keys-modal");
  if (modal) modal.classList.remove("hidden");
  const g = document.getElementById("key-google");
  const d = document.getElementById("key-deepseek");
  const a = document.getElementById("key-anthropic");
  const o = document.getElementById("key-openrouter");
  if (g) g.value = localStorage.getItem("helmide_key_google") || "";
  if (d) d.value = localStorage.getItem("helmide_key_deepseek") || "";
  if (a) a.value = localStorage.getItem("helmide_key_anthropic") || "";
  if (o) o.value = localStorage.getItem("helmide_key_openrouter") || "";
}

function closeKeysModal() {
  const modal = document.getElementById("keys-modal");
  if (modal) modal.classList.add("hidden");
}

function saveApiKeys() {
  const g = document.getElementById("key-google");
  const d = document.getElementById("key-deepseek");
  const a = document.getElementById("key-anthropic");
  const o = document.getElementById("key-openrouter");

  if (g) localStorage.setItem("helmide_key_google", g.value.trim());
  if (d) localStorage.setItem("helmide_key_deepseek", d.value.trim());
  if (a) localStorage.setItem("helmide_key_anthropic", a.value.trim());
  if (o) localStorage.setItem("helmide_key_openrouter", o.value.trim());

  closeKeysModal();

  const chat = document.getElementById("chat-messages");
  if (chat) {
    const notice = document.createElement("div");
    notice.className = "flex justify-center my-2";
    notice.innerHTML = '<span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">✔ Chiavi API salvate localmente con successo!</span>';
    chat.appendChild(notice);
    chat.scrollTop = chat.scrollHeight;
  }
}

// Selettore Modelli
function changeModel(modelName) {
  currentSelectedModel = modelName;
  localStorage.setItem("helmide_selected_model", modelName);
  const chat = document.getElementById("chat-messages");
  if (chat) {
    const notice = document.createElement("div");
    notice.className = "flex justify-center my-2";
    notice.innerHTML = '<span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">⚡ Modello attivo aggiornato: <b>' + modelName + '</b></span>';
    chat.appendChild(notice);
    chat.scrollTop = chat.scrollHeight;
  }
}

function promptAddCustomModel() {
  const modelId = prompt("Inserisci l\'ID del modello personalizzato (es. openrouter/anthropic/claude-3.7-sonnet o qwen-2.5-coder):");
  if (!modelId || !modelId.trim()) return;

  const cleanId = modelId.trim();
  const customGroup = document.getElementById("custom-models-group");
  if (customGroup) {
    const opt = document.createElement("option");
    opt.value = cleanId;
    opt.innerText = cleanId + " (Custom)";
    opt.selected = true;
    customGroup.appendChild(opt);
  }

  let customs = [];
  try {
    customs = JSON.parse(localStorage.getItem("helmide_custom_models") || "[]");
  } catch(e) {}
  if (!customs.includes(cleanId)) {
    customs.push(cleanId);
    localStorage.setItem("helmide_custom_models", JSON.stringify(customs));
  }

  changeModel(cleanId);
}

function loadSavedModels() {
  try {
    const customs = JSON.parse(localStorage.getItem("helmide_custom_models") || "[]");
    const customGroup = document.getElementById("custom-models-group");
    if (customGroup) {
      customs.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.innerText = c + " (Custom)";
        customGroup.appendChild(opt);
      });
    }

    const saved = localStorage.getItem("helmide_selected_model");
    if (saved) {
      const selector = document.getElementById("model-selector");
      if (selector) selector.value = saved;
      currentSelectedModel = saved;
    }
  } catch(e) {}
}

// Configurazione Agenti Modale
function openAgentConfigModal(agentId) {
  activeConfigAgentId = agentId || currentAgentId;
  const agent = AGENTS.find(a => a.id === activeConfigAgentId);
  if (!agent) return;

  const modal = document.getElementById("agent-config-modal");
  if (modal) modal.classList.remove("hidden");

  const iconEl = document.getElementById("cfg-agent-icon");
  if (iconEl) iconEl.innerText = agent.icon;

  const titleEl = document.getElementById("cfg-agent-title");
  if (titleEl) titleEl.innerText = "Configura " + agent.name;

  const subtitleEl = document.getElementById("cfg-agent-subtitle");
  if (subtitleEl) subtitleEl.innerText = "Ruolo: " + agent.role;

  const nameInput = document.getElementById("cfg-agent-name-input");
  if (nameInput) nameInput.value = localStorage.getItem("helmide_agent_name_" + activeConfigAgentId) || agent.name;
  
  const savedPrompt = localStorage.getItem("helmide_agent_prompt_" + activeConfigAgentId);
  const promptArea = document.getElementById("cfg-agent-prompt-textarea");
  if (promptArea) promptArea.value = savedPrompt || DEFAULT_AGENT_PROMPTS[activeConfigAgentId] || "";

  const savedModel = localStorage.getItem("helmide_agent_model_" + activeConfigAgentId);
  const modelSelect = document.getElementById("cfg-agent-model-select");
  if (modelSelect) modelSelect.value = savedModel || "default";
}

function closeAgentConfigModal() {
  const modal = document.getElementById("agent-config-modal");
  if (modal) modal.classList.add("hidden");
}

function saveAgentConfig() {
  const nameInput = document.getElementById("cfg-agent-name-input");
  const promptArea = document.getElementById("cfg-agent-prompt-textarea");
  const modelSelect = document.getElementById("cfg-agent-model-select");

  const name = nameInput ? nameInput.value.trim() : "";
  const prompt = promptArea ? promptArea.value.trim() : "";
  const model = modelSelect ? modelSelect.value : "default";

  if (name) localStorage.setItem("helmide_agent_name_" + activeConfigAgentId, name);
  if (prompt) localStorage.setItem("helmide_agent_prompt_" + activeConfigAgentId, prompt);
  localStorage.setItem("helmide_agent_model_" + activeConfigAgentId, model);

  closeAgentConfigModal();

  const chat = document.getElementById("chat-messages");
  if (chat) {
    const notice = document.createElement("div");
    notice.className = "flex justify-center my-2";
    notice.innerHTML = '<span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">⚙️ Configurazione salvata per l\'agente <b>' + (name || activeConfigAgentId) + '</b></span>';
    chat.appendChild(notice);
    chat.scrollTop = chat.scrollHeight;
  }
}

function resetAgentToDefault() {
  const promptArea = document.getElementById("cfg-agent-prompt-textarea");
  const modelSelect = document.getElementById("cfg-agent-model-select");
  if (promptArea) promptArea.value = DEFAULT_AGENT_PROMPTS[activeConfigAgentId] || "";
  if (modelSelect) modelSelect.value = "default";
}

async function loadWorkspaceProjects() {
  try {
    const res = await fetch("/api/status");
    if (!res.ok) return;
    const data = await res.json();
    
    if (data.projects && data.projects.length > 0) {
      const tree = document.getElementById("projects-tree");
      if (!tree) return;
      tree.innerHTML = "";
      
      data.projects.forEach((p, idx) => {
        const id = "proj-" + idx;
        const isFirst = idx === 0;
        const pDiv = document.createElement("div");
        pDiv.className = "space-y-1";
        pDiv.innerHTML = '<div onclick="toggleFolder(\'' + id + '\')" class="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/60 cursor-pointer text-slate-200 font-semibold group">' +
            '<div class="flex items-center gap-1.5 truncate">' +
              '<span id="icon-' + id + '" class="text-[11px] ' + (isFirst ? "text-cyan-400" : "text-slate-500") + '">' + (isFirst ? "▼" : "▶") + '</span>' +
              '<span class="truncate">' + p.name + '</span>' +
            '</div>' +
            '<span class="text-[10px] text-cyan-400/80 font-mono">auto</span>' +
          '</div>' +
          '<div id="files-' + id + '" class="' + (isFirst ? "" : "hidden") + ' pl-4 space-y-1 text-slate-400 text-[11px]">' +
            (p.files || []).map(f => '<div class="flex items-center gap-1.5 py-0.5 hover:text-slate-200 cursor-pointer"><span>' + (f.endsWith("/") ? "📁" : "📄") + '</span><span class="truncate">' + f + '</span></div>').join("") +
          '</div>';
        tree.appendChild(pDiv);
      });
    }
  } catch (e) {
    console.error("Errore caricamento progetti automatici:", e);
  }
}

// Inizializzazione al caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  loadSavedModels();
  loadWorkspaceProjects();
});

function renderCockpitAgents() {
  const grid = document.getElementById("cockpit-agents-grid");
  if (!grid) return;
  grid.innerHTML = AGENTS.map(a => `
    <div class="glass-card rounded-xl p-4 flex flex-col justify-between border border-slate-800 hover:border-indigo-500/40 transition group">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${a.icon}</span>
          <div>
            <h4 class="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition">${a.name}</h4>
            <p class="text-xs text-slate-400 mt-0.5">${a.role}</p>
          </div>
        </div>
        <span class="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        <button onclick="selectAgent('${a.id}'); switchView('studio');" class="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 cursor-pointer">
          <span>Chatta</span> <span>&rarr;</span>
        </button>
        <button onclick="openAgentConfigModal('${a.id}')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition cursor-pointer flex items-center gap-1">
          <span>⚙️ Configura</span>
        </button>
      </div>
    </div>
  `).join("");
}

// Inizializzazione Cockpit Agents
window.addEventListener("DOMContentLoaded", () => {
  renderCockpitAgents();
});

// Funzioni per il Modale del Manuale / README.md
async function openReadmeModal() {
  const modal = document.getElementById("readme-modal");
  const contentEl = document.getElementById("readme-content");
  if (modal) modal.classList.remove("hidden");
  
  if (contentEl) {
    contentEl.innerText = "Caricamento istruzioni in corso...";
    try {
      const res = await fetch("/api/readme");
      if (res.ok) {
        const data = await res.json();
        contentEl.innerText = data.content || "Nessun contenuto trovato.";
      } else {
        contentEl.innerText = "Errore durante il caricamento del file README.md";
      }
    } catch(e) {
      contentEl.innerText = "Impossibile caricare le istruzioni: " + e.message;
    }
  }
}

function closeReadmeModal() {
  const modal = document.getElementById("readme-modal");
  if (modal) modal.classList.add("hidden");
}
