import { CMapData } from '../files/codewalker/ymap';

interface Scene {
  name: string;
}

interface Patch {
  name: string;
}

interface IAudioDynamixData {
  cMapData: CMapData;
}

export default class AudioDynamixData {
  private cMapData: CMapData;

  public scene: Scene;
  public patch: Patch;

  constructor({ cMapData }: IAudioDynamixData) {
    this.cMapData = cMapData;

    this.scene = {
      name: this.cMapData.archetypeName + '_scene',
    };
    this.patch = {
      name: this.cMapData.archetypeName + '_patch',
    };
  }
}
