import { XMLDataEntry } from './index';

export interface CMloInstanceDef {
  archetypeName: string;
  position: XMLDataEntry<{ x: string; y: string; z: string }>;
}

export interface Ymap {
  CMapData: {
    entities: {
      Item: CMloInstanceDef;
    };
  };
}
