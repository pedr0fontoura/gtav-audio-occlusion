import { XML } from '../types';
import { isXMLCMloRoomDef } from '../utils';

import { CMloArchetypeDef } from './CMloArchetypeDef';
import { CMloPortalDef } from './CMloPortalDef';

type RawCMloRoomDef = XML.CMloRoomDef;

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
        .filter(portal => portal.roomFrom.index === this.index)
        .sort((a, b) => a.roomFrom.index - b.roomFrom.index);
    }

    return this._portals;
  }

  constructor(interior: CMloArchetypeDef, raw: RawCMloRoomDef) {
    if (!interior) {
      throw new Error('A CMloRoomDef needs a parent CMloArchetypeDef');
    }

    this.interior = interior;

    if (isXMLCMloRoomDef(raw)) {
      this.fromXMLCMloRoomDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMloRoomDef`);
  }

  private fromXMLCMloRoomDef(data: RawCMloRoomDef): void {
    if (!isXMLCMloRoomDef(data)) return;

    const name = data.name;
    const portalCount = data.portalCount.$.value;

    this.name = name;
    this.portalCount = Number(portalCount);
  }
}
