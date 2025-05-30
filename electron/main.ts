import { app, BrowserWindow, ipcMain } from "electron";
// import { createRequire } from 'node:module'
import { fileURLToPath } from "node:url";
import path from "node:path";
// import sqlite3 from "sqlite3";
import fs from "node:fs";

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

// const dbClass = sqlite3.verbose();

// Exemplo de leitura
// const rows = db.prepare("SELECT * FROM orcamentos").all();

// console.log(rows);

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// const db = new Database("C:\\Users\\Pichau\\Desktop\\projeto-extensao\\electron-react\\electron-vite-project\\db.sqlite3");

// const __filename = fileURLToPath(import.meta.url);

// const db = new dbClass.Database(path.join(__dirname, "db.sqlite3"), (err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//   } else {
//     console.log("Database connected!");
//   }
// });

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // Remove menu bar
  // win.setMenu(null);
  win.setMenuBarVisibility(false);
  // win.webContents.openDevTools();

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any[];

app.whenReady().then(() => {
  db = JSON.parse(fs.readFileSync("./data.json", "utf-8")) || [];

  ipcMain.handle("getQuotes", () => {
    return db;
  });

  ipcMain.handle("insertQuote", (_, data: string) => {
    db = JSON.parse(data);
    fs.writeFileSync("./data.json", data);
  });

  ipcMain.handle("updateQuote", (_, data: string) => {
    db = JSON.parse(data);
    fs.writeFileSync("./data.json", data);
  });

  ipcMain.handle("removeQuote", (_, data: string) => {
    db = JSON.parse(data);
    fs.writeFileSync("./data.json", data);
  });

  ipcMain.handle("generatePdf", (_, data: string) => {
    console.log(data);
  });

  createWindow();
});
