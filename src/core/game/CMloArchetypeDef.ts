import { XML } from '../types';

import { isXMLCMloArchetypeDef } from '../utils';

import { CBaseArchetypeDef } from './CBaseArchetypeDef';
import { CEntityDef } from './CEntityDef';

type RawCMloArchetypeDef = XML.CMloArchetypeDef;

export class CMloArchetypeDef extends CBaseArchetypeDef {
  public entities: CEntityDef[];

  constructor(raw: RawCMloArchetypeDef) {
    super(raw);

    if (isXMLCMloArchetypeDef(raw)) {
      this.fromXMLCMloArchetypeDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMloArchetypeDef`);
  }

  fromXMLCMloArchetypeDef(data: RawCMloArchetypeDef): void {
    if (!isXMLCMloArchetypeDef(data)) return;

    const entityOrEntities = data.entities.Item;

    if (Array.isArray(entityOrEntities)) {
      this.entities = entityOrEntities.map(entity => new CEntityDef(entity));
    } else {
      this.entities = [new CEntityDef(entityOrEntities)];
    }
  }
}

export const isCMloArchetypeDef = (archetype: CBaseArchetypeDef): archetype is CMloArchetypeDef =>
  archetype.type === 'CMloArchetypeDef';
