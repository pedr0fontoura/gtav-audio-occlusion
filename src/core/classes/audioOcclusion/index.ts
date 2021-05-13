import { joaat } from '../../utils';

import Interior from '../interior';

import Node from './node';
import PathNodeItem from './pathNodeitem';
import Path from './path';

export interface PortalEntity {
  linkType: number;
  maxOcclusion: number;
  hash_E3674005: number;
  isDoor: boolean;
  isGlass: boolean;
}

export interface PortalInfo {
  index: number;
  infoIdx: number;
  interiorProxyHash: number;
  portalIdx: number;
  roomIdx: number;
  destInteriorHash: number;
  destRoomIdx: number;
  portalEntityList: PortalEntity[];
}

export interface PathNodeDirection {
  portal: number;
  from: number;
  to: number;
}

export default class AudioOcclusion {
  private interior: Interior;

  public occlusionHash: number;
  public portalsEntities: PortalEntity[][];
  public portalInfoList: PortalInfo[];
  public nodes: Node[];

  public pathNodeList: PathNodeItem[];

  constructor(interior: Interior) {
    this.interior = interior;

    this.occlusionHash = this.getOcclusionHash();
    this.portalsEntities = this.getPortalsEntities();
    this.portalInfoList = this.getPortalInfoList();

    this.nodes = Node.getNodes(this.portalInfoList, this.interior, this.occlusionHash);
  }

  private getOcclusionHash(): number {
    const pos = this.interior.position;

    return joaat(this.interior.name, true) ^ (pos.x * 100) ^ (pos.y * 100) ^ (pos.z * 100);
  }

  private getPortalsEntities(): PortalEntity[][] {
    return this.interior.portals.map(portal =>
      portal.attachedObjects.map(attachedObject => ({
        linkType: 1,
        maxOcclusion: 0.7,
        hash_E3674005: attachedObject.hash,
        isDoor: attachedObject.isDoor,
        isGlass: attachedObject.isGlass,
      })),
    );
  }

  private getPortalInfoList(): PortalInfo[] {
    let portalInfoList: PortalInfo[] = [];

    this.interior.rooms.forEach(room => {
      const roomPortals = this.interior.getRoomPortals(room.index);

      roomPortals.sort((a, b) => {
        return a.index - b.index;
      });

      // PortalIdx is relative to RoomIdx
      const roomPortalInfoList = roomPortals.map((portal, index) => {
        const portalEntityList = this.portalsEntities[portal.index];

        const portalInfo = {
          index: portal.index,
          infoIdx: 0,
          interiorProxyHash: this.occlusionHash,
          portalIdx: index,
          roomIdx: portal.from,
          destInteriorHash: this.occlusionHash,
          destRoomIdx: portal.to,
          portalEntityList: portalEntityList,
        };

        return portalInfo;
      });

      portalInfoList = [...portalInfoList, ...roomPortalInfoList];
    });

    portalInfoList.forEach((portalInfo, index) => {
      portalInfo.infoIdx = index;
    });

    return portalInfoList;
  }

  public beforeEncode(): void {
    this.pathNodeList = Path.getPaths(this.nodes);
  }
}
