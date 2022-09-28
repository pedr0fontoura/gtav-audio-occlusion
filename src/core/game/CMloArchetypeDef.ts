import { CBaseArchetypeDefConstructor, CBaseArchetypeDef } from './CBaseArchetypeDef';
import { CEntityDef } from './CEntityDef';
import { CMloRoomDef } from './CMloRoomDef';
import { CMloPortalDef } from './CMloPortalDef';

export class CMloArchetypeDef extends CBaseArchetypeDef {
  private _entities: CEntityDef[];

  public get entities(): CEntityDef[] {
    if (!this._entities) {
      console.warn('CMloArchetypeDef entities not set yet');
      return [];
    }

    return this._entities;
  }

  public set entities(entities: CEntityDef[]) {
    if (this._entities) return;

    this._entities = entities;
  }

  private _rooms: CMloRoomDef[];

  public get rooms(): CMloRoomDef[] {
    if (!this._rooms) {
      console.warn('CMloArchetypeDef rooms not set yet');
      return [];
    }

    return this._rooms;
  }

  public set rooms(rooms: CMloRoomDef[]) {
    if (this._rooms) return;

    this._rooms = rooms;
  }

  private _portals: CMloPortalDef[];

  public get portals(): CMloPortalDef[] {
    if (!this._portals) {
      console.warn('CMloArchetypeDef portals not set yet');
      return [];
    }

    return this._portals;
  }

  public set portals(portals: CMloPortalDef[]) {
    if (this._portals) return;

    this._portals = portals;
  }

  constructor(data: CBaseArchetypeDefConstructor) {
    super(data);
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
