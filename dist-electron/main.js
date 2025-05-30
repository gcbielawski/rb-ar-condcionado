import { app as r, BrowserWindow as d, ipcMain as s } from "electron";
import { fileURLToPath as m } from "node:url";
import n from "node:path";
import i from "node:fs";
const c = n.dirname(m(import.meta.url));
console.log(c);
process.env.APP_ROOT = n.join(c, "..");
const a = process.env.VITE_DEV_SERVER_URL, E = n.join(process.env.APP_ROOT, "dist-electron"), p = n.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = a ? n.join(process.env.APP_ROOT, "public") : p;
let o;
function _() {
  o = new d({
    icon: n.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: n.join(c, "preload.mjs")
    }
  }), o.setMenuBarVisibility(!1), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), a ? o.loadURL(a) : o.loadFile(n.join(p, "index.html"));
}
r.on("window-all-closed", () => {
  process.platform !== "darwin" && (r.quit(), o = null);
});
r.on("activate", () => {
  d.getAllWindows().length === 0 && _();
});
let t;
r.whenReady().then(() => {
  t = JSON.parse(i.readFileSync("./data.json", "utf-8")) || [], s.handle("getQuotes", () => t), s.handle("insertQuote", (l, e) => {
    t = JSON.parse(e), i.writeFileSync("./data.json", e);
  }), s.handle("updateQuote", (l, e) => {
    t = JSON.parse(e), i.writeFileSync("./data.json", e);
  }), s.handle("removeQuote", (l, e) => {
    t = JSON.parse(e), i.writeFileSync("./data.json", e);
  }), s.handle("generatePdf", (l, e) => {
    console.log(e);
  }), _();
});
export {
  E as MAIN_DIST,
  p as RENDERER_DIST,
  a as VITE_DEV_SERVER_URL
};
