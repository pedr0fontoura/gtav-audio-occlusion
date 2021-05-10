import { CMloArchetypeDef } from '../files/codewalker/ytyp';
import { CMapData } from '../files/codewalker/ymap';
import AudioDynamixData from './audioDynamixData';

interface Interior {
  name: string;
  rooms: string[];
}

interface AmbientZone {
  name: string;
  outerPos: Vector3;
  outerSize: Vector3;
  innerPos: Vector3;
  innerSize: Vector3;
  unkHash01: string;
}

export interface InteriorRoom {
  name: string;
  mloRoom: string;
  hash1: string;
  unk02: number;
  unk03: number;
  unk04: number;
  unk05: number;
  unk06: string;
  unk07: number;
  unk08: number;
  unk09: number;
  unk10: number;
  unk11: number;
  unk12: number;
}

interface IAudioDynamixData {
  cMloArchetypeDef: CMloArchetypeDef;
  cMapData: CMapData;
  audioDynamixData: AudioDynamixData;
}

export default class AudioGameData {
  private cMloArchetypeDef: CMloArchetypeDef;
  private cMapData: CMapData;
  private audioDynamixData: AudioDynamixData;

  public interior: Interior;
  public ambientZone: AmbientZone;
  public interiorRooms: InteriorRoom[];

  constructor({ cMloArchetypeDef, cMapData, audioDynamixData }: IAudioDynamixData) {
    this.cMloArchetypeDef = cMloArchetypeDef;
    this.cMapData = cMapData;
    this.audioDynamixData = audioDynamixData;

    this.interior = this.getInterior();
    this.ambientZone = this.getAmbientZone();
    this.interiorRooms = this.getInteriorRooms();
  }

  private getInterior(): Interior {
    return {
      name: this.cMapData.archetypeName,
      rooms: this.cMloArchetypeDef.rooms
        .map(room => room.name)
        .filter(roomName => roomName !== 'limbo'),
    };
  }

  private getAmbientZone(): AmbientZone {
    const boxSize = {
      x: this.cMapData.entitiesExtentsMax.x - this.cMapData.entitiesExtentsMin.x,
      y: this.cMapData.entitiesExtentsMax.y - this.cMapData.entitiesExtentsMin.y,
      z: this.cMapData.entitiesExtentsMax.x - this.cMapData.entitiesExtentsMin.z,
    };

    const center = {
      x: this.cMapData.entitiesExtentsMin.x + boxSize.x / 2,
      y: this.cMapData.entitiesExtentsMin.y + boxSize.y / 2,
      z: this.cMapData.entitiesExtentsMin.z + boxSize.z / 2,
    };

    return {
      name: this.cMapData.archetypeName + '_az',
      outerPos: { x: center.x, y: center.y, z: center.z },
      outerSize: { x: boxSize.x + 1.0, y: boxSize.y + 1.0, z: boxSize.z + 1.0 },
      innerPos: { x: center.x, y: center.y, z: center.z },
      innerSize: { x: boxSize.x, y: boxSize.y, z: boxSize.z },
      unkHash01: this.audioDynamixData.scene.name,
    };
  }

  private getInteriorRooms(): InteriorRoom[] {
    return this.interior.rooms.map(roomName => ({
      name: roomName,
      mloRoom: roomName,
      hash1: this.ambientZone.name,
      unk02: 0,
      unk03: 0.5,
      unk04: 0,
      unk05: 0,
      unk06: 'null_sound',
      unk07: 0,
      unk08: 0,
      unk09: 0,
      unk10: 0.7,
      unk11: 0,
      unk12: 50,
    }));
  }
}
