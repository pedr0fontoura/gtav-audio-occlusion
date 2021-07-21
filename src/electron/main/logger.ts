import { BrowserWindow } from 'electron';

export default class Logger {
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  public log(text: string): void {
    this.mainWindow.webContents.send('consoleLog', text);
  }

  public warn(text: string): void {
    this.mainWindow.webContents.send('consoleWarn', text);
  }

  public error(text: string): void {
    this.mainWindow.webContents.send('consoleError', text);
  }
}
