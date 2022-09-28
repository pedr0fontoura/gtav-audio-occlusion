import { CEntityDef } from './CEntityDef';
import { CMloArchetypeDef } from './CMloArchetypeDef';

export class CMloInstanceDef extends CEntityDef {
  public archetype: CMloArchetypeDef;
}

export const isCMloInstanceDef = (entity: CEntityDef): entity is CMloInstanceDef => entity.type === 'CMloInstanceDef';
