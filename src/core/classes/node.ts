import { joaat } from '../utils';

import { CMloRoomDef } from '../game/CMloRoomDef';

import { naOcclusionInteriorMetadata } from '../game/audio/naOcclusionInteriorMetadata';
import { naOcclusionPortalInfoMetadata } from '../game/audio/naOcclusionPortalInfoMetadata';

export class Node {
  public interiorProxyHash: number;

  public room: CMloRoomDef;

  public index: number;
  public key: number;

  public portalInfoList: naOcclusionPortalInfoMetadata[];

  public edges: Node[];

  constructor(interiorMetadata: naOcclusionInteriorMetadata, room: CMloRoomDef, index: number) {
    this.interiorProxyHash = interiorMetadata.interiorProxyHash;

    this.room = room;

    this.index = index;
    this.key = this.room.name === 'limbo' ? joaat('outside') : this.interiorProxyHash ^ joaat(this.room.name);

    this.portalInfoList = interiorMetadata.portalInfoList.filter(
      ({ roomIdx, destRoomIdx }) => roomIdx === this.index || destRoomIdx === this.index,
    );

    this.edges = [];
  }

  public findRelevantPortalInfoList = (nodeTo: Node): naOcclusionPortalInfoMetadata[] => {
    return this.portalInfoList.filter(portalInfo => portalInfo.destRoomIdx === nodeTo.index);
  };
}
