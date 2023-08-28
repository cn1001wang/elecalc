import { dialog } from 'electron'

export default function (str: any): void {
  console.log(str)
  const options = {
    type: 'warning',
    buttons: ['Ok'],
    defaultId: 0,
    cancelId: 0,
    detail: str,
    message: ''
  }
  dialog.showMessageBoxSync(options)
}
