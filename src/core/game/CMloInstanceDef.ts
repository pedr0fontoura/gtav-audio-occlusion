import { CEntityDef } from './CEntityDef';

export class CMloInstanceDef extends CEntityDef {}

export const isCMloInstanceDef = (entity: CEntityDef): entity is CMloInstanceDef => entity.type === 'CMloInstanceDef';
