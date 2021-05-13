import Interior from './interior';

interface Scene {
  name: string;
}

interface Patch {
  name: string;
}

export default class AudioDynamixData {
  public scene: Scene;
  public patch: Patch;

  constructor(interior: Interior) {
    this.scene = {
      name: interior.name + '_scene',
    };
    this.patch = {
      name: interior.name + '_patch',
    };
  }
}
