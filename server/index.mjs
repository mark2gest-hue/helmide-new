import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const configPath = path.join(rootDir, "helmide.config.json");
const exampleConfigPath = path.join(rootDir, "helmide.config.example.json");
const readmePath = path.join(rootDir, "README.md");

function loadConfig() {
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } catch (e) {
      console.error("Errore lettura helmide.config.json:", e);
    }
  }
  if (fs.existsSync(exampleConfigPath)) {
    return JSON.parse(fs.readFileSync(exampleConfigPath, "utf-8"));
  }
  return { appName: "HelmIDE New", port: 3040 };
}

function scanUserProjects(workspacePath) {
  if (!workspacePath || !fs.existsSync(workspacePath)) {
    return [
      {
        name: "demo-teleprompter",
        path: "/demo/teleprompter",
        files: ["index.html", "styles.css", "app.js", "package.json"]
      }
    ];
  }

  try {
    const entries = fs.readdirSync(workspacePath, { withFileTypes: true });
    const projects = [];

    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
        const projDir = path.join(workspacePath, entry.name);
        let files = [];
        try {
          const subEntries = fs.readdirSync(projDir, { withFileTypes: true });
          files = subEntries
            .filter(f => !f.name.startsWith(".") && f.name !== "node_modules")
            .slice(0, 15)
            .map(f => (f.isDirectory() ? f.name + "/" : f.name));
        } catch (err) {
          files = ["(accesso limitato)"];
        }

        projects.push({
          name: entry.name,
          path: projDir,
          files: files
        });
      }
    }
    return projects;
  } catch (e) {
    return [{ name: "Errore scansione", files: [e.message] }];
  }
}

const config = loadConfig();
const PORT = config.port || 3040;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Status & Projects
  if (req.url === "/api/status") {
    const currentConfig = loadConfig();
    const workspace = currentConfig.user?.workspacePath || "";
    const scannedProjects = scanUserProjects(workspace);

    const payload = {
      ...currentConfig,
      projects: scannedProjects
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
    return;
  }

  // API per leggere il README.md e le istruzioni
  if (req.url === "/api/readme") {
    let readmeContent = "# Guida non trovata";
    if (fs.existsSync(readmePath)) {
      readmeContent = fs.readFileSync(readmePath, "utf-8");
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ content: readmeContent }));
    return;
  }

  // Static files in public/
  let filePath = path.join(rootDir, "public", req.url === "/" ? "index.html" : req.url);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
    return;
  }

  const ext = path.extname(filePath);
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png"
  };

  res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`✔ HelmIDE New server attivo su port ${PORT}`);
});
