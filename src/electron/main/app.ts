import { BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron';
import path from 'path';

import { CodeWalkerEncoder, CodeWalkerFile } from '../../core/files/codewalker';
import { CMapData } from '../../core/files/codewalker/ymap';
import { CMloArchetypeDef } from '../../core/files/codewalker/ytyp';

import Interior from '../../core/classes/interior';
import AudioOcclusion, { PortalEntity, PortalInfo } from '../../core/classes/audioOcclusion';
import AudioDynamixData from '../../core/classes/audioDynamixData';
import AudioGameData from '../../core/classes/audioGameData';
import Node from '../../core/classes/audioOcclusion/node';

import * as XML from '../../core/types/xml';

import UserInterfaceLogger from './logger';

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

export default class AudioOcclusionTool {
  private mainWindow: BrowserWindow;

  private logger: UserInterfaceLogger;

  private cwFile: CodeWalkerFile;
  private cwEncoder: CodeWalkerEncoder;

  public outputDirPath: string;

  public ymap: File;
  public ytyp: File;

  public interior: Interior;

  public cMapData: CMapData;
  public cMloArchetypeDef: CMloArchetypeDef;

  public audioOcclusion: AudioOcclusion;
  public audioDynamixData: AudioDynamixData;
  public audioGameData: AudioGameData;

  constructor() {
    this.cwFile = new CodeWalkerFile();
    this.cwEncoder = new CodeWalkerEncoder();

    ipcMain.on('importFile', this.importFile.bind(this));
    ipcMain.on('removeFile', this.removeFile.bind(this));

    ipcMain.handle('generateAudioOcclusion', this.generateAudioOcclusion.bind(this));
    ipcMain.on('writeAudioOcclusion', this.writeAudioOcclusion.bind(this));
    ipcMain.on('clearAudioOcclusion', this.clearAudioOcclusion.bind(this));

    ipcMain.handle('generateAudioDynamixData', this.generateAudioDynamixData.bind(this));
    ipcMain.on('writeAudioDynamixData', this.writeAudioDynamixData.bind(this));
    ipcMain.on('clearAudioDynamixData', this.clearAudioDynamixData.bind(this));

    ipcMain.handle('generateAudioGameData', this.generateAudioGameData.bind(this));
    ipcMain.on('writeAudioGameData', this.writeAudioGameData.bind(this));
    ipcMain.on('clearAudioGameData', this.clearAudioGameData.bind(this));

    ipcMain.handle('getFiles', this.getFiles.bind(this));
    ipcMain.handle('getOutputDirPath', this.getOutputDirPath.bind(this));

    ipcMain.handle('getNodes', this.getNodes.bind(this));
    ipcMain.handle('getPortalEntries', this.getPortalEntries.bind(this));
    ipcMain.handle('getPortalsEntities', this.getPortalsEntities.bind(this));

    ipcMain.handle('getAudioDynamixData', this.getAudioDynamixData.bind(this));
    ipcMain.handle('getAudioGameData', this.getAudioGameData.bind(this));

    ipcMain.on('refreshAudioOcclusionNodes', this.refreshAudioOcclusionNodes.bind(this));

    ipcMain.on('updateAudioOcclusion', this.updateAudioOcclusion.bind(this));
    ipcMain.on('updateAudioDynamixData', this.updateAudioDynamixData.bind(this));
    ipcMain.on('updateAudioGameData', this.updateAudioGameData.bind(this));

    ipcMain.on('updatePortalsEntities', this.updatePortalsEntities.bind(this));
    ipcMain.on('updatePortalEntry', this.updatePortalEntry.bind(this));

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
      this.mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    }

    this.mainWindow.on('page-title-updated', e => {
      e.preventDefault();
    });

    this.mainWindow.webContents.on('did-finish-load', () => {
      this.logger = new UserInterfaceLogger(this.mainWindow);

      global.console.log = (message?: any, ...optionalParams: any[]) => this.logger.log(message);
      global.console.warn = (message?: any, ...optionalParams: any[]) => this.logger.warn(message);
      global.console.error = (message?: any, ...optionalParams: any[]) => this.logger.error(message);

      console.log('Finished loading main window');
    });
  }

  private clearGeneratedResources(): void {
    this.audioOcclusion = undefined;
    this.audioDynamixData = undefined;
    this.audioGameData = undefined;
  }

  private async importFile(event: IpcMainEvent, file: string): Promise<void> {
    let parsedFile: File;

    if (file) {
      parsedFile = JSON.parse(file);
    }

    if (!this.cMapData && parsedFile.path.includes('.ymap')) {
      this.ymap = parsedFile;
      const parsedYmap = await this.cwFile.read<XML.Ymap>(parsedFile.path);

      this.cMapData = new CMapData(parsedYmap, parsedFile.name);
    }

    if (!this.cMloArchetypeDef && parsedFile.path.includes('.ytyp')) {
      this.ytyp = parsedFile;
      const parsedYtyp = await this.cwFile.read<XML.Ytyp>(parsedFile.path);

      this.cMloArchetypeDef = new CMloArchetypeDef(parsedYtyp, parsedFile.name);
    }

    if (this.cMapData && this.cMloArchetypeDef) {
      this.interior = new Interior(this.cMapData, this.cMloArchetypeDef);
    }
  }

  private removeFile(event: IpcMainEvent, file: string): void {
    let parsedFile: File;

    if (file) {
      parsedFile = JSON.parse(file);
    }

    if (parsedFile.path.includes('.ymap')) {
      this.ymap = undefined;
      this.cMapData = undefined;
      this.interior = undefined;
      this.clearGeneratedResources();
    }

    if (parsedFile.path.includes('.ytyp')) {
      this.ytyp = undefined;
      this.cMloArchetypeDef = undefined;
      this.interior = undefined;
      this.clearGeneratedResources();
    }

    if (parsedFile.path.includes('.ymt')) {
      this.audioOcclusion = undefined;
    }

    if (parsedFile.path.includes('_mix.dat15')) {
      this.audioDynamixData = undefined;
    }

    if (parsedFile.path.includes('_game.dat15')) {
      this.audioGameData = undefined;
    }
  }

  private generateAudioOcclusion(): File {
    if (!this.cMapData || !this.cMloArchetypeDef) return;

    console.log('Generating Audio Occlusion');

    this.audioOcclusion = new AudioOcclusion(this.interior);

    return {
      name: this.audioOcclusion.fileName,
      path: path.resolve(this.outputDirPath, this.audioOcclusion.fileName),
    };
  }

  private async writeAudioOcclusion(): Promise<void> {
    if (!this.audioOcclusion) return;

    console.log('Encoding Audio Occlusion');
    const ymt = this.cwEncoder.encodeAudioOcclusion(this.audioOcclusion);

    console.log('Writing Audio Occlusion file');
    await this.cwFile.write(path.resolve(this.outputDirPath, this.audioOcclusion.fileName), ymt);
  }

  private clearAudioOcclusion(): void {
    this.audioOcclusion = undefined;
  }

  private generateAudioDynamixData(): File {
    if (!this.interior) return;

    console.log('Generating Audio Dynamix Data');
    this.audioDynamixData = new AudioDynamixData(this.interior);

    return {
      name: this.audioDynamixData.fileName,
      path: path.resolve(this.outputDirPath, this.audioDynamixData.fileName),
    };
  }

  private async writeAudioDynamixData(): Promise<void> {
    if (!this.audioDynamixData) return;

    console.log('Encoding Audio Dynamix Data');
    const dat15 = this.cwEncoder.encodeAudioDynamixData(this.audioDynamixData);

    console.log('Writing Audio Dynamix Data file');
    await this.cwFile.write(path.resolve(this.outputDirPath, this.audioDynamixData.fileName), dat15);
  }

  private clearAudioDynamixData(): void {
    this.audioDynamixData = undefined;
  }

  private generateAudioGameData(): File {
    if (!this.interior) return;

    console.log('Generating Audio Game Data');
    this.audioGameData = new AudioGameData(this.interior);

    return {
      name: this.audioGameData.fileName,
      path: path.resolve(this.outputDirPath, this.audioGameData.fileName),
    };
  }

  private async writeAudioGameData(): Promise<void> {
    if (!this.audioGameData) return;

    console.log('Encoding Audio Game Data');
    const dat151 = this.cwEncoder.encodeAudioGameData(this.audioGameData);

    console.log('Writing Audio Game Data file');
    await this.cwFile.write(path.resolve(this.outputDirPath, this.audioGameData.fileName), dat151);
  }

  private clearAudioGameData(): void {
    this.audioGameData = undefined;
  }

  private getFiles(event: IpcMainEvent): File[] {
    const files: File[] = [];

    if (this.ymap) {
      files.push(this.ymap);
    }

    if (this.ytyp) {
      files.push(this.ytyp);
    }

    if (this.audioOcclusion) {
      files.push({
        name: this.audioOcclusion.fileName,
        path: path.resolve(this.outputDirPath, this.audioOcclusion.fileName),
      });
    }

    if (this.audioDynamixData) {
      files.push({
        name: this.audioDynamixData.fileName,
        path: path.resolve(this.outputDirPath, this.audioDynamixData.fileName),
      });
    }

    if (this.audioGameData) {
      files.push({
        name: this.audioGameData.fileName,
        path: path.resolve(this.outputDirPath, this.audioGameData.fileName),
      });
    }

    return files;
  }

  private getOutputDirPath(event: IpcMainEvent): string {
    return this.outputDirPath;
  }

  // Audio Occlusion data

  private getNodes(event: IpcMainEvent): Node[] {
    return this.audioOcclusion?.nodes;
  }

  private getPortalEntries(event: IpcMainEvent): PortalInfo[] {
    return this.audioOcclusion?.portalInfoList;
  }

  private getPortalsEntities(event: IpcMainEvent): PortalEntity[][] {
    return this.audioOcclusion?.portalsEntities;
  }

  private getAudioDynamixData(event: IpcMainEvent): AudioDynamixData {
    return this.audioDynamixData;
  }

  private getAudioGameData(event: IpcMainEvent): AudioGameData {
    return this.audioGameData;
  }

  private refreshAudioOcclusionNodes(event: IpcMainEvent): void {
    console.log("Refreshing occlusion nodes");

    this.audioOcclusion.refreshNodes();
  }

  private updateAudioOcclusion(event: IpcMainEvent, data: { [key in keyof AudioOcclusion]?: any }): void {
    if (!data) return;

    Object.assign(this.audioOcclusion, data);
  }

  private updateAudioDynamixData(event: IpcMainEvent, data: { [key in keyof AudioDynamixData]?: any }): void {
    if (!data) return;

    Object.assign(this.audioDynamixData, data);
  }

  private updateAudioGameData(event: IpcMainEvent, data: { [key in keyof AudioGameData]?: any }): void {
    if (!data) return;

    Object.assign(this.audioGameData, data);
  }

  private updatePortalsEntities(event: IpcMainEvent, data: PortalEntity[][]) {
    this.audioOcclusion.portalsEntities = data;
  }

  private updatePortalEntry(event: IpcMainEvent, portalIndex: number, enabled: boolean): void {
    this.audioOcclusion.portalInfoList[portalIndex].enabled = enabled;
  }

  private async selectOutputDirectory(event: IpcMainEvent): Promise<string> {
    const selection = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
    });

    if (selection.canceled) return;

    const [path] = selection.filePaths;

    this.outputDirPath = path;

    return path;
  }
}
