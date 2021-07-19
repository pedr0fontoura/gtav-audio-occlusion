import { XMLDataEntry } from './index';

interface GenericEntityDef {
  $: { type: 'CEntityDef' };
}

export interface CMloInstanceDef {
  $: { type: 'CMloInstanceDef' };
  archetypeName: string;
  position: XMLDataEntry<{ x: string; y: string; z: string }>;
}

export type EntitiesEntry = CMloInstanceDef | GenericEntityDef;

export interface Ymap {
  CMapData: {
    entitiesExtentsMin: XMLDataEntry<{ x: string; y: string; z: string }>;
    entitiesExtentsMax: XMLDataEntry<{ x: string; y: string; z: string }>;
    entities: {
      Item: EntitiesEntry | EntitiesEntry[];
    };
  };
}
