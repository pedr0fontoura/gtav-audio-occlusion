import { XML } from '../types';

import { isXMLCMloArchetypeDef } from '../utils';

import { CBaseArchetypeDef } from './CBaseArchetypeDef';
import { CEntityDef } from './CEntityDef';
import { CMloRoomDef } from './CMloRoomDef';
import { CMloPortalDef } from './CMloPortalDef';

type RawCMloArchetypeDef = XML.CMloArchetypeDef;

export class CMloArchetypeDef extends CBaseArchetypeDef {
  public entities: CEntityDef[];
  public rooms: CMloRoomDef[];
  public portals: unknown[];

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
    const roomOrRooms = data.rooms.Item;
    const portalOrPortals = data.portals.Item;

    if (Array.isArray(entityOrEntities)) {
      this.entities = entityOrEntities.map(entity => new CEntityDef(entity));
    } else {
      this.entities = [new CEntityDef(entityOrEntities)];
    }

    if (Array.isArray(roomOrRooms)) {
      this.rooms = roomOrRooms.map(room => new CMloRoomDef(room));
    } else {
      this.rooms = [new CMloRoomDef(roomOrRooms)];
    }

    if (Array.isArray(portalOrPortals)) {
      this.portals = portalOrPortals.map(portal => new CMloPortalDef(portal));
    } else {
      this.portals = [new CMloPortalDef(portalOrPortals)];
    }
  }
}

export const isCMloArchetypeDef = (archetype: CBaseArchetypeDef): archetype is CMloArchetypeDef =>
  archetype.type === 'CMloArchetypeDef';
