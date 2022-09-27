import type { XML } from '../types';

import { isXMLCEntityDef } from '../utils';

import type { CBaseArchetypeDef } from './CBaseArchetypeDef';
import type { CMloArchetypeDef } from './CMloArchetypeDef';

type RawCEntityDef = XML.CEntityDef;

export class CEntityDef {
  public type: string;

  public archetypeName: string;
  public archetype: CBaseArchetypeDef | CMloArchetypeDef | undefined;

  public position: Vector3;

  constructor(raw: RawCEntityDef) {
    if (isXMLCEntityDef(raw)) {
      this.fromXMLCEntityDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CEntityDef`);
  }

  private fromXMLCEntityDef(data: RawCEntityDef): void {
    if (!isXMLCEntityDef(data)) return;

    const type = data.$.type;
    const archetypeName = data.archetypeName;
    const position = data.position.$;

    this.type = type;
    this.archetypeName = archetypeName;
    this.position = {
      x: Number(position.x),
      y: Number(position.y),
      z: Number(position.z),
    };
  }

  public setArchetypeDef(archetype: CBaseArchetypeDef): void {
    if (this.archetype) {
      return console.warn('Entity already have an archetype');
    }

    if (this.archetypeName !== archetype.name) {
      return console.warn(`${archetype.name} archetype doesn't match entity's archetype name ${this.archetypeName}`);
    }

    this.archetype = archetype;
  }
}
