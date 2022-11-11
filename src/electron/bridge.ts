import { contextBridge, ipcRenderer } from 'electron';

export const API = {
  send: ipcRenderer.send,
  invoke: ipcRenderer.invoke,
};

contextBridge.exposeInMainWorld('API', API);
