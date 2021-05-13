import Interior from './interior';

interface Scene {
  name: string;
}

interface Patch {
  name: string;
}

export default class AudioDynamixData {
  public fileName: string;

  public scene: Scene;
  public patch: Patch;

  constructor(interior: Interior) {
    this.fileName = `${interior.name}_mix.dat15.rel.xml`;

    this.scene = {
      name: interior.name + '_scene',
    };
    this.patch = {
      name: interior.name + '_patch',
    };
  }
}
