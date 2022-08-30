import { XML } from '../types';

import { isXMLCMloRoomDef } from '../utils';

type RawCMloRoomDef = XML.CMloRoomDef;

export class CMloRoomDef {
  public name: string;
  public portalCount: number;

  constructor(raw: RawCMloRoomDef) {
    if (isXMLCMloRoomDef(raw)) {
      this.fromXMLCMloRoomDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMloRoomDef`);
  }

  fromXMLCMloRoomDef(data: RawCMloRoomDef): void {
    if (!isXMLCMloRoomDef(data)) return;

    const name = data.name;
    const portalCount = data.portalCount.$.value;

    this.name = name;
    this.portalCount = Number(portalCount);
  }
}
