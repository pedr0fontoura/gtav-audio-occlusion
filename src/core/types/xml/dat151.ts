import { XMLDataEntry } from './index';

export interface AmbientZoneListAudioGameData {
  $: { type: 'AmbientZoneList'; ntOffset: string | number };
  Name: string;
  Zones: {
    Item: string[];
  };
}

export interface InteriorAudioGameData {
  $: { type: 'Interior'; ntOffset: string | number };
  Name: string;
  Unk0: XMLDataEntry<{ value: string }>;
  Unk1: XMLDataEntry<{ value: string }>;
  Unk2: XMLDataEntry<{ value: string }>;
  Rooms: {
    Item: string[];
  };
}

export interface AmbientZoneAudioGameData {
  $: { type: 'AmbientZone'; ntOffset: string | number };
  Name: string;
  Flags0: XMLDataEntry<{ value: string }>;
  Shape: string;
  Flags1: XMLDataEntry<{ value: string }>;
  OuterPos: XMLDataEntry<{ x: string | number; y: string | number; z: string | number }>;
  OuterSize: XMLDataEntry<{ x: string | number; y: string | number; z: string | number }>;
  OuterVec1: XMLDataEntry<{
    x: string | number;
    y: string | number;
    z: string | number;
    w: string | number;
  }>;
  OuterVec2: XMLDataEntry<{
    x: string | number;
    y: string | number;
    z: string | number;
    w: string | number;
  }>;
  OuterAngle: XMLDataEntry<{ value: string | number }>;
  OuterVec3: XMLDataEntry<{ x: string | number; y: string | number; z: string | number }>;
  InnerPos: XMLDataEntry<{ x: string | number; y: string | number; z: string | number }>;
  InnerSize: XMLDataEntry<{ x: string | number; y: string | number; z: string | number }>;
  InnerVec1: XMLDataEntry<{
    x: string | number;
    y: string | number;
    z: string | number;
    w: string | number;
  }>;
  InnerVec2: XMLDataEntry<{
    x: string | number;
    y: string | number;
    z: string | number;
    w: string | number;
  }>;
  InnerAngle: XMLDataEntry<{ value: string | number }>;
  InnerVec3: XMLDataEntry<{ x: string | number; y: string | number; z: string | number }>;
  UnkVec1: XMLDataEntry<{
    x: string | number;
    y: string | number;
    z: string | number;
    w: string | number;
  }>;
  UnkVec2: XMLDataEntry<{
    x: string | number;
    y: string | number;
    z: string | number;
    w: string | number;
  }>;
  UnkHash0: string;
  UnkHash1: string;
  UnkVec3: XMLDataEntry<{ x: string | number; y: string | number; z: string | number }>;
  Flags2: XMLDataEntry<{ value: string | number }>;
  Unk14: XMLDataEntry<{ value: string | number }>;
  Unk15: XMLDataEntry<{ value: string | number }>;
  Unk16: XMLDataEntry<{ value: string | number }>;
  Hashes: {
    Item: string[];
  };
  ExtParams: string;
}

export interface InteriorRoomAudioGameData {
  $: { type: 'InteriorRoom'; ntOffset: string | number };
  Name: string;
  Flags0: XMLDataEntry<{ value: string }>;
  MloRoom: string;
  Zone: string;
  Unk02: XMLDataEntry<{ value: string | number }>;
  Unk03: XMLDataEntry<{ value: string | number }>;
  Reverb: XMLDataEntry<{ value: string | number }>;
  Echo: XMLDataEntry<{ value: string | number }>;
  Sound: string;
  Unk07: XMLDataEntry<{ value: string | number }>;
  Unk08: XMLDataEntry<{ value: string | number }>;
  Unk09: XMLDataEntry<{ value: string | number }>;
  Unk10: XMLDataEntry<{ value: string | number }>;
  Unk11: XMLDataEntry<{ value: string | number }>;
  Unk12: XMLDataEntry<{ value: string | number }>;
  Unk13: string;
  SoundSet: string;
}

export type AudioGameData = Array<
  AmbientZoneListAudioGameData | InteriorAudioGameData | AmbientZoneAudioGameData | InteriorRoomAudioGameData
>;

export interface Dat151File {
  Dat151: {
    Version: XMLDataEntry<{ value: string | number }>;
    Items: {
      Item: Array<
        AmbientZoneListAudioGameData | InteriorAudioGameData | AmbientZoneAudioGameData | InteriorRoomAudioGameData
      >;
    };
  };
}
