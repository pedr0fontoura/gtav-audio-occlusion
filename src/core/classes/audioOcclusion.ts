import { CMloArchetypeDef } from '../files/codewalker/ytyp';
import { CMapData } from '../files/codewalker/ymap';

import { joaat, convertToInt32 } from '../utils';

export interface PortalEntity {
  linkType: number;
  maxOcclusion: number;
  hash_E3674005: number;
  isDoor: boolean;
  isGlass: boolean;
}

interface PortalInfo {
  index: number;
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

interface PathNodeChild {
  pathNodeKey: number;
  portalInfoIdx: number;
}

export interface PathNode {
  key: number;
  pathNodeChildList: PathNodeChild[];
}

interface IAudioOcclusion {
  cMloArchetypeDef: CMloArchetypeDef;
  cMapData: CMapData;
}

export default class AudioOcclusion {
  private cMloArchetypeDef: CMloArchetypeDef;
  private cMapData: CMapData;

  // Tool specific data
  public portalsEntities: PortalEntity[][];
  public pathNodesDirections: PathNodeDirection[];

  // Actual game data
  public occlusionHash: number;
  public portalInfoList: PortalInfo[];
  public pathNodeList: PathNode[];

  constructor({ cMloArchetypeDef, cMapData }: IAudioOcclusion) {
    this.cMloArchetypeDef = cMloArchetypeDef;
    this.cMapData = cMapData;

    this.occlusionHash = this.generateOcclusionHash();
    this.portalsEntities = this.getPortalsEntities();
    this.portalInfoList = this.generatePortalInfoList();
    this.pathNodesDirections = this.getPathNodesDirections();
  }

  private getArchetypeNameHash(): number {
    if (this.cMapData.archetypeName.startsWith('hash_')) {
      const [, hexString] = this.cMapData.archetypeName.split('_');

      return parseInt(hexString, 16);
    }

    return joaat(this.cMapData.archetypeName, true);
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

  private generateOcclusionHash(): number {
    const pos = this.cMapData.position;

    return this.getArchetypeNameHash() ^ (pos.x * 100) ^ (pos.y * 100) ^ (pos.z * 100);
  }

  private generatePortalInfoList(): PortalInfo[] {
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

    return portalInfoList;
  }

  private getPathNodesDirections(): PathNodeDirection[] {
    const pathNodeDirections: PathNodeDirection[] = [];

    this.portalInfoList.forEach(portalInfo => {
      const pathNodeDirection = {
        portal: portalInfo.index,
        from: portalInfo.roomIdx,
        to: portalInfo.destRoomIdx,
      };

      const directionExists = pathNodeDirections.findIndex(direction => {
        return direction.from === pathNodeDirection.from && direction.to === pathNodeDirection.to;
      });

      if (directionExists !== -1) return;

      pathNodeDirections.push(pathNodeDirection);
    });

    return pathNodeDirections;
  }

  private getRoomOcclusionHash(roomIndex: number): number {
    const room = this.cMloArchetypeDef.rooms[roomIndex];

    if (!room) throw new Error(`Room don't exist`);

    if (room.name === 'limbo') {
      return joaat('outside', true);
    }

    return this.occlusionHash ^ joaat(room.name, true);
  }

  private generatePathNodeList(): PathNode[] {
    const pathNodeList: PathNode[] = [];

    this.pathNodesDirections.forEach(direction => {
      const startRoomHash = this.getRoomOcclusionHash(direction.from);
      const endRoomHash = this.getRoomOcclusionHash(direction.to);

      const pathNodeChildList: PathNodeChild[] = [];

      this.portalInfoList.forEach((portalInfo, index) => {
        if (portalInfo.roomIdx === direction.from && portalInfo.destRoomIdx === direction.to) {
          pathNodeChildList.push({
            pathNodeKey: 0,
            portalInfoIdx: index,
          });
        }
      });

      // pathNode for each audio channel
      for (let i = 1; i <= 3; i++) {
        const pathNode = {
          key: convertToInt32(startRoomHash - endRoomHash) + i,
          pathNodeChildList: pathNodeChildList,
        };

        pathNodeList.push(pathNode);
      }
    });

    return pathNodeList;
  }

  public beforeEncode(): void {
    this.portalInfoList = this.generatePortalInfoList();
    this.pathNodeList = this.generatePathNodeList();
  }
}
