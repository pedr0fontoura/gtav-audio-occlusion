import { CMloArchetypeDef } from '../../CMloArchetypeDef';
import { CMloRoomDef } from '../../CMloRoomDef';

import { getInteriorRoomName } from '../utils';

export class InteriorRoomAudioGameData {
  public name: string;

  public flags: number;

  public mloRoom: string;
  public zone: string;

  public unk02: number;
  public unk03: number;
  public reverb: number;
  public echo: number;

  public sound: string;

  public unk07: number;
  public unk08: number;
  public unk09: number;
  public unk10: number;
  public unk11: number;
  public unk12: number;

  public unk13: string;
  public soundSet: string;

  constructor(cMloArchetypeDef: CMloArchetypeDef, cMloRoomDef: CMloRoomDef) {
    this.name = getInteriorRoomName(cMloArchetypeDef.name, cMloRoomDef);

    this.flags = 0xaaaaaaaa;

    this.mloRoom = cMloRoomDef.name;
    this.zone = undefined;

    this.unk02 = 0;
    this.unk03 = 0.35;
    this.reverb = 0;
    this.echo = 0;

    this.sound = 'null_sound';

    this.unk07 = 0;
    this.unk08 = 0;
    this.unk09 = 0;
    this.unk10 = 0.7;
    this.unk11 = 0;
    this.unk12 = 50;

    this.unk13 = undefined; // Static emitter hash?
    this.soundSet = 'hash_D4855127';
  }
}

export const isInteriorRoomAudioGameData = (value: unknown): value is InteriorRoomAudioGameData =>
  value instanceof InteriorRoomAudioGameData;
