import { CMloArchetypeDef } from './CMloArchetypeDef';
import { CMloPortalDef } from './CMloPortalDef';

type CMloRoomDefConstructor = {
  interior: CMloArchetypeDef;
  name: string;
  portalCount: number;
};

export class CMloRoomDef {
  private interior: CMloArchetypeDef;

  public name: string;

  private _index: number;

  get index(): number {
    if (isNaN(this._index)) {
      this._index = this.interior.rooms.findIndex(room => room.name === this.name);
    }

    return this._index;
  }

  public portalCount: number;

  private _portals: CMloPortalDef[];

  get portals(): CMloPortalDef[] {
    if (!this._portals) {
      this._portals = this.interior.portals
        .filter(portal => portal.roomFrom.index === this.index || portal.roomTo.index === this.index)
        .sort((a, b) => a.roomFrom.index - b.roomFrom.index)
        .map(portal => {
          if (portal.roomFrom.index === this.index) return portal;

          return new CMloPortalDef({
            interior: this.interior,
            roomFrom: portal.roomTo,
            roomTo: portal.roomFrom,
            flags: portal.flags,
            attachedEntities: portal.attachedEntities,
          });
        });
    }

    return this._portals;
  }

  constructor({ interior, name, portalCount }: CMloRoomDefConstructor) {
    if (!interior) {
      throw new Error('A CMloRoomDef needs a parent CMloArchetypeDef');
    }

    this.interior = interior;

    this.name = name;
    this.portalCount = portalCount;
  }
}
