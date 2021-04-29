import { Mlo } from '../ytyp';
import { MapData } from '../ymap';

import { joaat, convertToInt32 } from '../utils';

import { PortalEntity, PortalInfo } from './interfaces';

interface IAudioOcclusion {
  interior: Mlo;
  mapData: MapData;
}

export default class AudioOcclusion {
  private interior: Mlo;
  private mapData: MapData;

  public occlusionHash: number;

  public PortalInfoList: PortalInfo[];
  
  constructor({ interior, mapData }: IAudioOcclusion) {
    this.interior = interior;
    this.mapData = mapData;

    this.occlusionHash = this.generateOcclusionHash();
    this.PortalInfoList = this.generatePortalInfoList();
  }

  private get archetypeNameHash(): number {
    if (this.mapData.archetypeName.startsWith('hash_')) {
      const [, hexString] = this.mapData.archetypeName.split('_');

      return parseInt(hexString, 16);
    }

    return joaat(this.mapData.archetypeName, true);
  }

  private generateOcclusionHash(): number {
    const pos = this.mapData.position;

    return this.archetypeNameHash ^ (pos.x * 100) ^ (pos.y * 100) ^ (pos.z * 100);
  }

  private generatePortalInfoList(): PortalInfo[] {
    let portalInfoList = [];

    this.interior.rooms.forEach((room) => {
      const roomPortals = this.interior.getRoomPortals(room.index);

      // PortalIdx is relative to RoomIdx
      const roomPortalInfoList = roomPortals.map((portal, index) => {
        const portalEntityList: PortalEntity[] = portal.attachedObjects.map(attachedObjectHash => ({
          LinkType: 1,
          MaxOcclusion: 0.7,
          hash_E3674005: attachedObjectHash,
          IsDoor: false,
          IsGlass: false,
        }));


        const portalInfo = {
          InteriorProxyHash: this.occlusionHash,
          PortalIdx: index,
          RoomIdx: portal.from,
          DestInteriorHash: this.occlusionHash,
          DestRoomIdx: portal.to,
          PortalEntityList: portalEntityList,
        };

        return portalInfo;
      });

      portalInfoList = [...portalInfoList, ...roomPortalInfoList];
    });

    return portalInfoList;
  }
};