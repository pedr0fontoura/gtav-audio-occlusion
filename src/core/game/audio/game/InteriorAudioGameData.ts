import { CMloArchetypeDef } from '../../CMloArchetypeDef';

import { getInteriorRoomName } from '../utils';

export class InteriorAudioGameData {
  public name: string;

  public unk0: number;
  public unk1: number;
  public unk2: number;

  public rooms: string[];

  constructor(cMloArchetypeDef: CMloArchetypeDef) {
    this.name = cMloArchetypeDef.name;

    this.unk0 = 0xaaaaa044;
    this.unk1 = 0xd4855127;
    this.unk2 = 0x00000000;

    this.rooms = cMloArchetypeDef.rooms.map(room => getInteriorRoomName(this.name, room));
  }
}

export const isInteriorAudioGameData = (value: unknown): value is InteriorAudioGameData =>
  value instanceof InteriorAudioGameData;
