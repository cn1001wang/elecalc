import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  alert: (str: string): Promise<any> => ipcRenderer.invoke('alert', str),
  mac: ''
}
const os = require('os')
//获取mac地址
let mac = ''
const networkInterfaces = os.networkInterfaces()
for (const i in networkInterfaces) {
  for (const j in networkInterfaces[i]) {
    if (
      networkInterfaces[i][j]['family'] === 'IPv4' &&
      networkInterfaces[i][j]['mac'] !== '00:00:00:00:00:00' &&
      networkInterfaces[i][j]['address'] !== '127.0.0.1'
    ) {
      mac = networkInterfaces[i][j]['mac']
    }
  }
}
api.mac = mac

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
