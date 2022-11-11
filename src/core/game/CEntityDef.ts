import type { CArchetypeDef } from './CMapTypes';

type CEntityDefConstructor = {
  type: string;
  archetypeName: string;
  position: Vector3;
};

export class CEntityDef {
  public type: string;

  public archetypeName: string;
  public archetype: CArchetypeDef | undefined;

  public position: Vector3;

  constructor({ type, archetypeName, position }: CEntityDefConstructor) {
    this.type = type;
    this.archetypeName = archetypeName;
    this.position = position;
  }

  public setArchetypeDef(archetype: CArchetypeDef): void {
    if (this.archetype) {
      return console.warn('Entity already have an archetype');
    }

    if (this.archetypeName !== archetype.name) {
      return console.warn(`${archetype.name} archetype doesn't match entity's archetype name ${this.archetypeName}`);
    }

    this.archetype = archetype;
  }
}
