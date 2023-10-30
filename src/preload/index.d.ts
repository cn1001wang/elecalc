import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      mac: string
      alert: any
    }
    abp: any
  }
}
