import { CMloArchetypeDef } from '../../files/codewalker/ytyp';
import { CMapData } from '../../files/codewalker/ymap';

import { joaat } from '../../utils';

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

interface IAudioOcclusion {
  cMloArchetypeDef: CMloArchetypeDef;
  cMapData: CMapData;
}

export default class AudioOcclusion {
  private cMloArchetypeDef: CMloArchetypeDef;
  private cMapData: CMapData;

  public occlusionHash: number;
  public portalsEntities: PortalEntity[][];
  public portalInfoList: PortalInfo[];
  public nodes: Node[];

  public pathNodeList: PathNodeItem[];

  constructor({ cMloArchetypeDef, cMapData }: IAudioOcclusion) {
    this.cMloArchetypeDef = cMloArchetypeDef;
    this.cMapData = cMapData;

    this.occlusionHash = this.getOcclusionHash();
    this.portalsEntities = this.getPortalsEntities();
    this.portalInfoList = this.getPortalInfoList();

    this.nodes = Node.getNodes(this.portalInfoList, this.cMloArchetypeDef, this.occlusionHash);
  }

  private getArchetypeNameHash(): number {
    if (this.cMapData.archetypeName.startsWith('hash_')) {
      const [, hexString] = this.cMapData.archetypeName.split('_');

      return parseInt(hexString, 16);
    }

    return joaat(this.cMapData.archetypeName, true);
  }

  private getOcclusionHash(): number {
    const pos = this.cMapData.position;

    return this.getArchetypeNameHash() ^ (pos.x * 100) ^ (pos.y * 100) ^ (pos.z * 100);
  }

  private getPortalsEntities(): PortalEntity[][] {
    return this.cMloArchetypeDef.portals.map(portal =>
      portal.attachedObjects.map(attachedObjectHash => ({
        linkType: 1,
        maxOcclusion: 0.7,
        hash_E3674005: attachedObjectHash,
        isDoor: false,
        isGlass: false,
      })),
    );
  }

  private getPortalInfoList(): PortalInfo[] {
    let portalInfoList: PortalInfo[] = [];

    this.cMloArchetypeDef.rooms.forEach(room => {
      const roomPortals = this.cMloArchetypeDef.getRoomPortals(room.index);

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
