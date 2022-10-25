import type { SerializedProject } from '@/electron/common/types/project';

import { Interior } from './interior';

type ProjectConstructor = {
  name: string;
  path: string;
};

export class Project {
  public name: string;
  public path: string;

  public interiors: Interior[];

  constructor({ name, path }: ProjectConstructor) {
    this.name = name;
    this.path = path;
    this.interiors = [];
  }

  public addInterior(interior: Interior): void {
    this.interiors.push(interior);
  }

  public serialize(): SerializedProject {
    return {
      name: this.name,
      path: this.path,
      interiors: this.interiors.map(interior => interior.serialize()),
    };
  }
}
