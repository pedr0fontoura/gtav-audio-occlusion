import { XML } from '../types';

import { isXMLCMloPortalDef } from '../utils';
import { CEntityDef } from './CEntityDef';

type RawCMloPortalDef = XML.CMloPortalDef;

export class CMloPortalDef {
  public roomFrom: number;
  public roomTo: number;
  public flags: number;
  public attachedEntities: number[];

  constructor(raw: RawCMloPortalDef) {
    if (isXMLCMloPortalDef(raw)) {
      this.fromXMLCMloPortalDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMloPortalDef`);
  }

  private fromXMLCMloPortalDef(data: RawCMloPortalDef): void {
    if (!isXMLCMloPortalDef(data)) return;

    const roomFrom = data.roomFrom.$.value;
    const roomTo = data.roomTo.$.value;
    const flags = data.flags.$.value;
    const attachedObjects = data.attachedObjects;

    this.roomFrom = Number(roomFrom);
    this.roomTo = Number(roomTo);
    this.flags = Number(flags);
    this.attachedEntities = attachedObjects
      .split(/\s/)
      .filter(entity => !!entity)
      .map(entity => Number(entity));
  }

  public getPortalEntities = (entities: CEntityDef[]): CEntityDef[] => {
    return this.attachedEntities.map(entity => entities[entity]);
  };
}
