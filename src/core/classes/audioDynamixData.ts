import { CMapData } from '../files/codewalker/ymap';

interface Scene {
  name: string;
}

interface Patch {
  name: string;
}

interface IAudioDynamixData {
  CMapData: CMapData;
}

export default class AudioDynamixData {
  private CMapData: CMapData;

  public scene: Scene;
  public patch: Patch;

  constructor({ CMapData }: IAudioDynamixData) {
    this.CMapData = CMapData;

    this.scene = {
      name: this.CMapData.archetypeName + '_scene',
    };
    this.patch = {
      name: this.CMapData.archetypeName + '_patch',
    };
  }
}
