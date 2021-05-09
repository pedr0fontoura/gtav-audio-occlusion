import { ipcMain, IpcMainEvent } from 'electron';
import { CodeWalkerEncoder, CodeWalkerFile } from '../../core/files/codewalker';
import { CMapData } from '../../core/files/codewalker/ymap';
import { CMloArchetypeDef } from '../../core/files/codewalker/ytyp';

import AudioOcclusion from '../../core/classes/audioOcclusion';
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

export default class Controller {
  private cwFile: CodeWalkerFile;
  private cwEncoder: CodeWalkerEncoder;

  public ymap: File;
  public ytyp: File;

  public CMapData: CMapData;
  public CMloArchetypeDef: CMloArchetypeDef;

  public AudioOcclusion: AudioOcclusion;
  public AudioDynamixData: AudioDynamixData;
  public AudioGameData: AudioGameData;

  constructor() {
    this.cwFile = new CodeWalkerFile();
    this.cwEncoder = new CodeWalkerEncoder();

    // Register events
    ipcMain.on('importFile', this.importFile.bind(this));
    ipcMain.on('removeFile', this.removeFile.bind(this));

    ipcMain.handle('generateAudioOcclusion', this.generateAudioOcclusion.bind(this));
    ipcMain.on('writeAudioOcclusion', this.writeAudioOcclusion.bind(this));
    ipcMain.on('clearAudioOcclusion', this.clearAudioOcclusion.bind(this));

    ipcMain.handle('generateAudioDynamixData', this.generateAudioDynamixData.bind(this));
    ipcMain.on('writeAudioDynamixData ', this.writeAudioDynamixData.bind(this));
    ipcMain.on('clearAudioDynamixData', this.clearAudioDynamixData.bind(this));

    ipcMain.handle('generateAudioGameData', this.generateAudioGameData.bind(this));
    ipcMain.on('writeAudioGameData', this.writeAudioGameData.bind(this));
    ipcMain.on('clearAudioGameData', this.clearAudioGameData.bind(this));

    ipcMain.handle('getFiles', this.getFiles.bind(this));

    ipcMain.handle('getAudioOcclusion', this.getAudioOcclusion.bind(this));
    ipcMain.handle('getAudioDynamixData', this.getAudioDynamixData.bind(this));
    ipcMain.handle('getAudioGameData', this.getAudioGameData.bind(this));
  }

  private clearGeneratedResources(): void {
    this.AudioOcclusion = undefined;
    this.AudioDynamixData = undefined;
    this.AudioGameData = undefined;
  }

  private async importFile(event: IpcMainEvent, file: string): Promise<void> {
    let parsedFile: File;

    if (file) {
      parsedFile = JSON.parse(file);
    }

    console.log(parsedFile);

    if (!this.CMapData && parsedFile.path.includes('.ymap')) {
      this.ymap = parsedFile;
      const parsedYmap = await this.cwFile.read<XML.Ymap>(parsedFile.path);

      this.CMapData = new CMapData(parsedYmap);
    }

    if (!this.CMloArchetypeDef && parsedFile.path.includes('.ytyp')) {
      this.ytyp = parsedFile;
      const parsedYtyp = await this.cwFile.read<XML.Ytyp>(parsedFile.path);

      this.CMloArchetypeDef = new CMloArchetypeDef(parsedYtyp);
    }
  }

  private removeFile(event: IpcMainEvent, file: string): void {
    let parsedFile: File;

    if (file) {
      parsedFile = JSON.parse(file);
    }

    if (parsedFile.path.includes('.ymap')) {
      this.ymap = undefined;
      this.CMapData = undefined;
      this.clearGeneratedResources();
    }

    if (parsedFile.path.includes('.ytyp')) {
      this.ytyp = undefined;
      this.CMloArchetypeDef = undefined;
      this.clearGeneratedResources();
    }

    if (parsedFile.path.includes('.ymt')) {
      this.AudioOcclusion = undefined;
    }

    if (parsedFile.path.includes('_mix.dat15')) {
      this.AudioDynamixData = undefined;
    }

    if (parsedFile.path.includes('_game.dat15')) {
      this.AudioGameData = undefined;
    }
  }

  private generateAudioOcclusion(): File {
    if (!this.CMapData || !this.CMloArchetypeDef) return;

    this.AudioOcclusion = new AudioOcclusion({
      CMapData: this.CMapData,
      CMloArchetypeDef: this.CMloArchetypeDef,
    });

    return {
      name: `${this.AudioOcclusion.occlusionHash}.ymt.pso.xml`,
      path: `${this.AudioOcclusion.occlusionHash}.ymt.pso.xml`,
    };
  }

  private async writeAudioOcclusion(): Promise<void> {
    if (!this.AudioOcclusion) return;

    const ymt = this.cwEncoder.encodeAudioOcclusion(this.AudioOcclusion);

    await this.cwFile.write(`${this.AudioOcclusion.occlusionHash}.ymt.pso.xml`, ymt);
  }

  private clearAudioOcclusion(): void {
    this.AudioOcclusion = undefined;
  }

  private generateAudioDynamixData(): File {
    if (!this.CMapData) return;

    this.AudioDynamixData = new AudioDynamixData({
      CMapData: this.CMapData,
    });

    return {
      name: `${this.CMapData.archetypeName}_mix.dat15.rel.xml`,
      path: `${this.CMapData.archetypeName}_mix.dat15.rel.xml`,
    };
  }

  private async writeAudioDynamixData(): Promise<void> {
    if (!this.AudioDynamixData) return;

    const dat15 = this.cwEncoder.encodeAudioDynamixData(this.AudioDynamixData);

    await this.cwFile.write(`${this.CMapData.archetypeName}_mix.dat15.rel.xml`, dat15);
  }

  private clearAudioDynamixData(): void {
    this.AudioDynamixData = undefined;
  }

  private generateAudioGameData(): File {
    if (!this.CMapData || !this.CMloArchetypeDef || !this.AudioDynamixData) return;

    this.AudioGameData = new AudioGameData({
      CMapData: this.CMapData,
      CMloArchetypeDef: this.CMloArchetypeDef,
      AudioDynamixData: this.AudioDynamixData,
    });

    return {
      name: `${this.CMapData.archetypeName}_game.dat151.rel.xml`,
      path: `${this.CMapData.archetypeName}_game.dat151.rel.xml`,
    };
  }

  private async writeAudioGameData(): Promise<void> {
    if (!this.AudioGameData) return;

    const dat151 = this.cwEncoder.encodeAudioGameData(this.AudioGameData);

    await this.cwFile.write(`${this.CMapData.archetypeName}_game.dat151.rel.xml`, dat151);
  }

  private clearAudioGameData(): void {
    this.AudioGameData = undefined;
  }

  private getAudioOcclusion(event: IpcMainEvent): AudioOcclusion {
    return this.AudioOcclusion;
  }

  private getAudioDynamixData(event: IpcMainEvent): AudioDynamixData {
    return this.AudioDynamixData;
  }

  private getAudioGameData(event: IpcMainEvent): AudioGameData {
    return this.AudioGameData;
  }

  private getFiles(event: IpcMainEvent): File[] {
    const files: File[] = [];

    if (this.ymap) {
      files.push(this.ymap);
    }

    if (this.ytyp) {
      files.push(this.ytyp);
    }

    if (this.AudioOcclusion) {
      files.push({
        name: `${this.AudioOcclusion.occlusionHash}.ymt.pso.xml`,
        path: `${this.AudioOcclusion.occlusionHash}.ymt.pso.xml`,
      });
    }

    if (this.AudioDynamixData) {
      files.push({
        name: `${this.CMapData.archetypeName}_mix.dat15.rel.xml`,
        path: `${this.CMapData.archetypeName}_mix.dat15.rel.xml`,
      });
    }

    if (this.AudioGameData) {
      files.push({
        name: `${this.CMapData.archetypeName}_game.dat151.rel.xml`,
        path: `${this.CMapData.archetypeName}_game.dat151.rel.xml`,
      });
    }

    return files;
  }
}
