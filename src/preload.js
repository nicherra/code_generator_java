// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

// Exponer el canal para recibir el rootPath desde el main process
contextBridge.exposeInMainWorld("electronAPI", {
  receiveRootPath: (callback) => ipcRenderer.on("set-root-path", callback),
  crearArchivos: (NombreClase, atributos) => ipcRenderer.on("crearArchivos", NombreClase, atributos),
});
