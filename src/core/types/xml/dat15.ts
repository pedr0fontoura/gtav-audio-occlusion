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
  Unk01: string;
  Unk02: XMLDataEntry<{ value: string | number }>;
  Unk03: XMLDataEntry<{ value: string | number }>;
  Unk04: XMLDataEntry<{ value: string | number }>;
  Unk05: XMLDataEntry<{ value: string | number }>;
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
  Unk01: XMLDataEntry<{ value: string | number }>;
  Unk02: XMLDataEntry<{ value: string | number }>;
  Unk03: XMLDataEntry<{ value: string | number }>;
  Unk04: XMLDataEntry<{ value: string | number }>;
  Unk05: string;
  Unk06: string;
  Unk07: XMLDataEntry<{ value: string | number }>;
  Items: {
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
