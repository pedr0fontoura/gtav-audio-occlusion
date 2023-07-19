import { XMLDataEntry } from './index';

interface SceneItem {
  Patch: string;
  Group: string;
}

interface Scene {
  $: {
    type: 'Scene';
    ntOffset: string | number;
  };
  Name: string;
  Flags: XMLDataEntry<{ value: string | number }>;
  Unk01: string;
  Items: {
    Item: SceneItem[];
  };
}

interface PatchItem {
  Category: string;
  Volume: XMLDataEntry<{ value: string | number }>;
  Unk03: XMLDataEntry<{ value: string | number }>;
  LPFCutoff: XMLDataEntry<{ value: string | number }>;
  HPFCutoff: XMLDataEntry<{ value: string | number }>;
  Unk06: XMLDataEntry<{ value: string | number }>;
  Unk07: XMLDataEntry<{ value: string | number }>;
  Unk08: XMLDataEntry<{ value: string | number }>;
  Unk09: XMLDataEntry<{ value: string | number }>;
  Unk10: XMLDataEntry<{ value: string | number }>;
  Unk11: XMLDataEntry<{ value: string | number }>;
}

interface Patch {
  $: {
    type: 'Patch';
    ntOffset: string | number;
  };
  Name: string;
  Flags: XMLDataEntry<{ value: string | number }>;
  FadeIn: XMLDataEntry<{ value: string | number }>;
  FadeOut: XMLDataEntry<{ value: string | number }>;
  PreDelay: XMLDataEntry<{ value: string | number }>;
  Duration: XMLDataEntry<{ value: string | number }>;
  ApplyFactorCurve: string;
  ApplyVariable: string;
  ApplySmoothRate: XMLDataEntry<{ value: string | number }>;
  Pactches: {
    Item: PatchItem[];
  };
}

export interface AudioDynamixData {
  Dat15: {
    Version: XMLDataEntry<{ value: string | number }>;
    Items: {
      Item: (Scene | Patch)[];
    };
  };
}