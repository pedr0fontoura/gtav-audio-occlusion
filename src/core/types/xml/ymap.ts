import { XMLDataEntry } from './index';

export interface CMloInstanceDef {
  archetypeName: string;
  position: XMLDataEntry<{ x: string; y: string; z: string }>;
}

export interface Ymap {
  CMapData: {
    entitiesExtentsMin: XMLDataEntry<{ x: string; y: string; z: string }>;
    entitiesExtentsMax: XMLDataEntry<{ x: string; y: string; z: string }>;
    entities: {
      Item: CMloInstanceDef;
    };
  };
}
