export type SerializedInteriorAudioGameData = {
  name: string;
  unk0: number;
  unk1: number;
  unk2: number;
  rooms: string[];
};

export type SerializedInteriorRoomAudioGameData = {
  name: string;

  flags: number;

  mloRoom: string;
  zone: string;

  unk02: number;
  unk03: number;
  reverb: number;
  echo: number;

  sound: string;

  unk07: number;
  unk08: number;
  unk09: number;
  unk10: number;
  unk11: number;
  unk12: number;

  unk13: string;
  soundSet: string;
};
