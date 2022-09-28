import { joaat } from '../../utils';

import { CMloRoomDef } from '../CMloRoomDef';

import { naOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';

export class Node {
  public interiorMetadata: naOcclusionInteriorMetadata;

  public room: CMloRoomDef;

  public index: number;
  public key: number;

  public edges: Node[];

  constructor(interiorMetadata: naOcclusionInteriorMetadata, room: CMloRoomDef) {
    this.interiorMetadata = interiorMetadata;

    this.room = room;

    const { interiorProxyHash } = this.interiorMetadata;

    this.index = this.room.index;
    this.key = this.room.name === 'limbo' ? joaat('outside') : interiorProxyHash ^ joaat(this.room.name);

    this.edges = [];
  }
}
