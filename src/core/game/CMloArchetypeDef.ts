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
  public portals: CMloPortalDef[];

  constructor(raw: RawCMloArchetypeDef) {
    super(raw);

    if (isXMLCMloArchetypeDef(raw)) {
      this.fromXMLCMloArchetypeDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMloArchetypeDef`);
  }

  private fromXMLCMloArchetypeDef(data: RawCMloArchetypeDef): void {
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
      this.rooms = roomOrRooms.map(room => new CMloRoomDef(this, room));
    } else {
      this.rooms = [new CMloRoomDef(this, roomOrRooms)];
    }

    if (Array.isArray(portalOrPortals)) {
      this.portals = portalOrPortals.map(portal => new CMloPortalDef(this, portal));
    } else {
      this.portals = [new CMloPortalDef(this, portalOrPortals)];
    }
  }

  public getEntity = (entity: number): CEntityDef => {
    if (entity < 0 || entity >= this.entities.length) return;

    return this.entities[entity];
  };

  public getRoom = (room: number): CMloRoomDef => {
    if (room < 0 || room >= this.rooms.length) return;

    return this.rooms[room];
  };
}

export const isCMloArchetypeDef = (archetype: CBaseArchetypeDef): archetype is CMloArchetypeDef =>
  archetype.type === 'CMloArchetypeDef';
