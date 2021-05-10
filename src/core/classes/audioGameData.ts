import { CMloArchetypeDef } from '../files/codewalker/ytyp';
import { CMapData } from '../files/codewalker/ymap';
import AudioDynamixData from './audioDynamixData';

interface Interior {
  Name: string;
  Rooms: string[];
}

interface AmbientZone {
  Name: string;
  OuterPos: Vector3;
  OuterSize: Vector3;
  InnerPos: Vector3;
  InnerSize: Vector3;
  UnkHash01: string;
}

export interface InteriorRoom {
  Name: string;
  MloRoom: string;
  Hash1: string;
  Unk02: number;
  Unk03: number;
  Unk04: number;
  Unk05: number;
  Unk06: string;
  Unk07: number;
  Unk08: number;
  Unk09: number;
  Unk10: number;
  Unk11: number;
  Unk12: number;
}

interface IAudioDynamixData {
  CMloArchetypeDef: CMloArchetypeDef;
  CMapData: CMapData;
  AudioDynamixData: AudioDynamixData;
}

export default class AudioGameData {
  private CMloArchetypeDef: CMloArchetypeDef;
  private CMapData: CMapData;
  private AudioDynamixData: AudioDynamixData;

  public Interior: Interior;
  public AmbientZone: AmbientZone;
  public InteriorRooms: InteriorRoom[];

  constructor({ CMloArchetypeDef, CMapData, AudioDynamixData }: IAudioDynamixData) {
    this.CMloArchetypeDef = CMloArchetypeDef;
    this.CMapData = CMapData;
    this.AudioDynamixData = AudioDynamixData;

    this.Interior = this.getInterior();
    this.AmbientZone = this.getAmbientZone();
    this.InteriorRooms = this.getInteriorRooms();
  }

  private getInterior(): Interior {
    return {
      Name: this.CMapData.archetypeName,
      Rooms: this.CMloArchetypeDef.rooms
        .map(room => room.name)
        .filter(roomName => roomName !== 'limbo'),
    };
  }

  private getAmbientZone(): AmbientZone {
    const boxSize = {
      x: this.CMapData.entitiesExtentsMax.x - this.CMapData.entitiesExtentsMin.x,
      y: this.CMapData.entitiesExtentsMax.y - this.CMapData.entitiesExtentsMin.y,
      z: this.CMapData.entitiesExtentsMax.x - this.CMapData.entitiesExtentsMin.z,
    };

    const center = {
      x: this.CMapData.entitiesExtentsMin.x + boxSize.x / 2,
      y: this.CMapData.entitiesExtentsMin.y + boxSize.y / 2,
      z: this.CMapData.entitiesExtentsMin.z + boxSize.z / 2,
    };

    return {
      Name: this.CMapData.archetypeName + '_az',
      OuterPos: { x: center.x, y: center.y, z: center.z },
      OuterSize: { x: boxSize.x + 1.0, y: boxSize.y + 1.0, z: boxSize.z + 1.0 },
      InnerPos: { x: center.x, y: center.y, z: center.z },
      InnerSize: { x: boxSize.x, y: boxSize.y, z: boxSize.z },
      UnkHash01: this.AudioDynamixData.scene.name,
    };
  }

  private getInteriorRooms(): InteriorRoom[] {
    return this.Interior.Rooms.map(roomName => ({
      Name: roomName,
      MloRoom: roomName,
      Hash1: this.AmbientZone.Name,
      Unk02: 0,
      Unk03: 0.5,
      Unk04: 0,
      Unk05: 0,
      Unk06: 'null_sound',
      Unk07: 0,
      Unk08: 0,
      Unk09: 0,
      Unk10: 0.7,
      Unk11: 0,
      Unk12: 50,
    }));
  }
}
