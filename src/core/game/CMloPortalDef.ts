import { XML } from '../types';
import { isXMLCMloPortalDef } from '../utils';

import { CMloArchetypeDef } from './CMloArchetypeDef';
import { CEntityDef } from './CEntityDef';
import { CMloRoomDef } from './CMloRoomDef';

type RawCMloPortalDef = XML.CMloPortalDef;

export class CMloPortalDef {
  private interior: CMloArchetypeDef;

  public roomFrom: CMloRoomDef;
  public roomTo: CMloRoomDef;
  public flags: number;
  public attachedEntities: CEntityDef[];

  constructor(interior: CMloArchetypeDef, raw: RawCMloPortalDef) {
    if (!interior) {
      throw new Error('A CMloPortalDef needs a parent CMloArchetypeDef');
    }

    this.interior = interior;

    if (isXMLCMloPortalDef(raw)) {
      this.fromXMLCMloPortalDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMloPortalDef`);
  }

  private fromXMLCMloPortalDef(data: RawCMloPortalDef): void {
    if (!isXMLCMloPortalDef(data)) return;

    const roomFrom = Number(data.roomFrom.$.value);
    const roomTo = Number(data.roomTo.$.value);
    const flags = Number(data.flags.$.value);
    const attachedObjects = data.attachedObjects;

    this.roomFrom = this.interior.getRoom(roomFrom);
    this.roomTo = this.interior.getRoom(roomTo);
    this.flags = flags;
    this.attachedEntities = attachedObjects
      .split(/\s/)
      .filter(entity => !!entity)
      .map(entity => Number(entity))
      .map(entity => this.interior.getEntity(entity));
  }
}
