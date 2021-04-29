import { XMLDataEntry, XMLEntry } from './index';

export interface CMloInstanceDef {
  archetypeName: string;
  position: XMLDataEntry<{ x: string; y: string; z: string; }>;
}

export interface YmapXML {
  CMapData: {
    entities: {
      Item: CMloInstanceDef;
    };
  };
}