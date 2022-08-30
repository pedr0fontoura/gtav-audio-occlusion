import type { XML } from '../types';

import { isXMLCEntityDef } from '../utils';

type RawCEntityDef = XML.CEntityDef;

export class CEntityDef {
  public type: string;
  public archetypeName: string;
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
      x: BigInt(position.x),
      y: BigInt(position.y),
      z: BigInt(position.z),
    };
  }
}
