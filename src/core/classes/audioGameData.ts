import Interior from './interior';

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
  public fileName: string;

  public interiorName: string;
  public interiorRooms: InteriorRoom[];

  constructor(interior: Interior) {
    this.fileName = interior.isNameHashed ? `int_game.dat151.rel.xml` : `${interior.name}_game.dat151.rel.xml`;

    this.interiorName = interior.name;
    this.interiorRooms = this.getInteriorRooms(interior);
  }

  private getInteriorRooms(interior: Interior): InteriorRoom[] {
    return interior.rooms.map(room => ({
      name: room.name,
      mloRoom: room.name,
      hash1: null,
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
