import { CBaseArchetypeDefConstructor, CBaseArchetypeDef } from './CBaseArchetypeDef';
import { CEntityDef } from './CEntityDef';
import { CMloRoomDef } from './CMloRoomDef';
import { CMloPortalDef } from './CMloPortalDef';

type CMloArchetypeDefConstructor = CBaseArchetypeDefConstructor & {
  entities: CEntityDef[];
  rooms: CMloRoomDef[];
  portals: CMloPortalDef[];
};

export class CMloArchetypeDef extends CBaseArchetypeDef {
  public entities: CEntityDef[];
  public rooms: CMloRoomDef[];
  public portals: CMloPortalDef[];

  constructor(data: CMloArchetypeDefConstructor) {
    super(data);

    const { entities, rooms, portals } = data;

    this.entities = entities;
    this.rooms = rooms;
    this.portals = portals;
  }

  public getEntity(entity: number): CEntityDef {
    if (entity < 0 || entity >= this.entities.length) return;

    return this.entities[entity];
  }

  public getRoom(room: number): CMloRoomDef {
    if (room < 0 || room >= this.rooms.length) return;

    return this.rooms[room];
  }

  public getRoomPortals(room: number): CMloPortalDef[] {
    if (room < 0 || room >= this.rooms.length) return [];

    return this.portals
      .filter(portal => portal.roomFrom === room || portal.roomTo === room)
      .sort((a, b) => a.roomFrom - b.roomFrom)
      .map(portal => {
        if (portal.roomFrom === room) return portal;

        return new CMloPortalDef({
          roomFrom: portal.roomTo,
          roomTo: portal.roomFrom,
          flags: portal.flags,
          attachedEntities: portal.attachedEntities,
        });
      });
  }
}

export const isCMloArchetypeDef = (archetype: CBaseArchetypeDef): archetype is CMloArchetypeDef =>
  archetype.type === 'CMloArchetypeDef';
