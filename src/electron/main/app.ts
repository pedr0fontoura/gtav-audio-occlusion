import { BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron';
import path from 'path';

import { CodeWalker } from '@/core/formats/codewalker';
import { CMapData, CMapTypes } from '@/core/game/';

import * as XML from '@/core/types/xml';

interface File {
  name: string;
  path: string;
}

export interface FilesDTO {
  ymap: File;
  ytyp: File;
  ymt: File;
  dat15: File;
  dat151: File;
}

const WEB_ENTRY_PATH = path.resolve(__dirname, '..', '..', 'web', 'index.html');

export default class AudioOcclusionTool {
  private mainWindow: BrowserWindow;

  private codeWalker: CodeWalker;

  constructor() {
    this.codeWalker = new CodeWalker();

    ipcMain.on('importFile', this.importFile.bind(this));
    ipcMain.handle('selectOutputDirectory', this.selectOutputDirectory.bind(this));
  }

  public init() {
    if (this.mainWindow) {
      return;
    }

    this.mainWindow = new BrowserWindow({
      height: 700,
      width: 1100,
      title: 'GTA V Audio Occlusion Tool',
      backgroundColor: '#212121',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.loadURL('http://localhost:4000');
    } else {
      this.mainWindow.loadFile(WEB_ENTRY_PATH);
    }

    this.mainWindow.on('page-title-updated', e => {
      e.preventDefault();
    });

    this.mainWindow.webContents.on('did-finish-load', () => {
      console.log('Finished loading main window');
    });
  }

  private async importFile(event: IpcMainEvent, file: string): Promise<void> {
    let parsedFile: File;

    if (file) {
      parsedFile = JSON.parse(file);
    }

    if (parsedFile.path.includes('.ymap')) {
      const raw = await this.codeWalker.readFile<XML.Ymap>(parsedFile.path);

      console.log(new CMapData(raw));
    } else if (parsedFile.path.includes('.ytyp')) {
      const raw = await this.codeWalker.readFile<XML.Ytyp>(parsedFile.path);

      console.log(new CMapTypes(raw));
    }
  }

  private async selectOutputDirectory(event: IpcMainEvent): Promise<string> {
    const selection = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
    });

    if (selection.canceled) return;

    const [path] = selection.filePaths;

    return path;
  }
}
