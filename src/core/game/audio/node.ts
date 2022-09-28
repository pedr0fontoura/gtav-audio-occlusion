import { joaat } from '../../utils';

import { CMloRoomDef } from '../CMloRoomDef';

import { naOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';
import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';

export class Node {
  public interiorProxyHash: number;
  public room: CMloRoomDef;

  public index: number;
  public key: number;

  public portalInfoList: naOcclusionPortalInfoMetadata[];

  public edges: Node[];

  constructor(interiorMetadata: naOcclusionInteriorMetadata, room: CMloRoomDef) {
    this.interiorProxyHash = interiorMetadata.interiorProxyHash;

    this.room = room;

    this.index = this.room.index;
    this.key = this.room.name === 'limbo' ? joaat('outside') : this.interiorProxyHash ^ joaat(this.room.name);

    this.portalInfoList = interiorMetadata.portalInfoList.filter(
      ({ roomIdx, destRoomIdx }) => roomIdx === this.index || destRoomIdx === this.index,
    );

    this.edges = [];
  }
}
