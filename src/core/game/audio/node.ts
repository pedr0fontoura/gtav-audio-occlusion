import { joaat } from '../../utils';

import { CMloRoomDef } from '../CMloRoomDef';

import { naOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';

export class Node {
  public interiorProxyHash: number;

  public room: CMloRoomDef;

  public index: number;
  public key: number;

  public edges: Node[];

  constructor(interiorMetadata: naOcclusionInteriorMetadata, room: CMloRoomDef) {
    this.interiorProxyHash = interiorMetadata.interiorProxyHash;

    this.room = room;

    this.index = this.room.index;
    this.key = this.room.name === 'limbo' ? joaat('outside') : this.interiorProxyHash ^ joaat(this.room.name);

    this.edges = [];
  }
}
