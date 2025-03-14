const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { rootPath } = require("./code/utils");
const { crearArchivos } = require("./code/crearArchivos");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("set-root-path", rootPath);
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  ipcMain.on("crearArchivos", (event, data) => {
    console.log("Datos recibidos para crear archivos:", data);
    crearArchivos(data);
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
