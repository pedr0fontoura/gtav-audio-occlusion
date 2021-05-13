import AudioDynamixData from './audioDynamixData';

import Interior from './interior';

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

export default class AudioGameData {
  private interior: Interior;
  private audioDynamixData: AudioDynamixData;

  public fileName: string;

  public ambientZone: AmbientZone;

  public interiorName: string;
  public interiorRooms: InteriorRoom[];

  constructor(interior: Interior, audioDynamixData: AudioDynamixData) {
    this.interior = interior;
    this.audioDynamixData = audioDynamixData;

    this.fileName = `${this.interior.name}_game.dat151.rel.xml`;

    this.ambientZone = this.getAmbientZone();

    this.interiorName = this.interior.name;
    this.interiorRooms = this.getInteriorRooms();
  }

  private getAmbientZone(): AmbientZone {
    const boxSize = {
      x: this.interior.entitiesExtentsMax.x - this.interior.entitiesExtentsMin.x,
      y: this.interior.entitiesExtentsMax.y - this.interior.entitiesExtentsMin.y,
      z: this.interior.entitiesExtentsMax.x - this.interior.entitiesExtentsMin.z,
    };

    const center = {
      x: this.interior.entitiesExtentsMin.x + boxSize.x / 2,
      y: this.interior.entitiesExtentsMin.y + boxSize.y / 2,
      z: this.interior.entitiesExtentsMin.z + boxSize.z / 2,
    };

    return {
      name: this.interior.name + '_az',
      outerPos: { x: center.x, y: center.y, z: center.z },
      outerSize: { x: boxSize.x + 1.0, y: boxSize.y + 1.0, z: boxSize.z + 1.0 },
      innerPos: { x: center.x, y: center.y, z: center.z },
      innerSize: { x: boxSize.x, y: boxSize.y, z: boxSize.z },
      unkHash01: this.audioDynamixData.scene.name,
    };
  }

  private getInteriorRooms(): InteriorRoom[] {
    return this.interior.rooms.map(room => ({
      name: room.name,
      mloRoom: room.name,
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
