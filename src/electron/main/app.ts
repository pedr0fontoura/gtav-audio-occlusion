import { ipcMain, IpcMainEvent } from 'electron';
import path from 'path';
import { CodeWalkerEncoder, CodeWalkerFile } from '../../core/files/codewalker';
import { CMapData } from '../../core/files/codewalker/ymap';
import { CMloArchetypeDef } from '../../core/files/codewalker/ytyp';

import Interior from '../../core/classes/interior';
import AudioOcclusion, { PortalEntity } from '../../core/classes/audioOcclusion';
import AudioDynamixData from '../../core/classes/audioDynamixData';
import AudioGameData from '../../core/classes/audioGameData';

import * as XML from '../../core/types/xml';

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

export default class App {
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

    this.outputDirPath = path.resolve(process.cwd(), 'output');

    // Register events
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

    ipcMain.handle('getAudioOcclusion', this.getAudioOcclusion.bind(this));
    ipcMain.handle('getAudioDynamixData', this.getAudioDynamixData.bind(this));
    ipcMain.handle('getAudioGameData', this.getAudioGameData.bind(this));

    ipcMain.on('updateAudioOcclusion', this.updateAudioOcclusion.bind(this));
    ipcMain.on('updateAudioDynamixData', this.updateAudioDynamixData.bind(this));
    ipcMain.on('updateAudioGameData', this.updateAudioGameData.bind(this));

    ipcMain.on('updatePortalEntity', this.updatePortalEntity.bind(this));
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

    this.audioOcclusion = new AudioOcclusion(this.interior);

    return {
      name: this.audioOcclusion.fileName,
      path: path.resolve(this.outputDirPath, this.audioOcclusion.fileName),
    };
  }

  private async writeAudioOcclusion(): Promise<void> {
    if (!this.audioOcclusion) return;

    const ymt = this.cwEncoder.encodeAudioOcclusion(this.audioOcclusion);

    await this.cwFile.write(path.resolve(this.outputDirPath, this.audioOcclusion.fileName), ymt);
  }

  private clearAudioOcclusion(): void {
    this.audioOcclusion = undefined;
  }

  private generateAudioDynamixData(): File {
    if (!this.interior) return;

    this.audioDynamixData = new AudioDynamixData(this.interior);

    return {
      name: this.audioDynamixData.fileName,
      path: path.resolve(this.outputDirPath, this.audioDynamixData.fileName),
    };
  }

  private async writeAudioDynamixData(): Promise<void> {
    if (!this.audioDynamixData) return;

    const dat15 = this.cwEncoder.encodeAudioDynamixData(this.audioDynamixData);

    await this.cwFile.write(path.resolve(this.outputDirPath, this.audioDynamixData.fileName), dat15);
  }

  private clearAudioDynamixData(): void {
    this.audioDynamixData = undefined;
  }

  private generateAudioGameData(): File {
    if (!this.interior || !this.audioDynamixData) return;

    this.audioGameData = new AudioGameData(this.interior, this.audioDynamixData);

    return {
      name: this.audioGameData.fileName,
      path: path.resolve(this.outputDirPath, this.audioGameData.fileName),
    };
  }

  private async writeAudioGameData(): Promise<void> {
    if (!this.audioGameData) return;

    const dat151 = this.cwEncoder.encodeAudioGameData(this.audioGameData);

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

  private getAudioOcclusion(event: IpcMainEvent): AudioOcclusion {
    return this.audioOcclusion;
  }

  private getAudioDynamixData(event: IpcMainEvent): AudioDynamixData {
    return this.audioDynamixData;
  }

  private getAudioGameData(event: IpcMainEvent): AudioGameData {
    return this.audioGameData;
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

  private updatePortalEntity(
    event: IpcMainEvent,
    portalIndex: number,
    entityIndex: number,
    data: { [key in keyof PortalEntity]?: any },
  ) {
    Object.assign(this.audioOcclusion.portalsEntities[portalIndex][entityIndex], data);
  }
}
