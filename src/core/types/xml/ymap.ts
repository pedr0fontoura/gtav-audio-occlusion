import { XMLDataEntry } from './index';

interface GenericEntityDef {
  $: { type: string };
  archetypeName: string;
  position: XMLDataEntry<{ x: string; y: string; z: string }>;
}

export type CMloInstanceDef = GenericEntityDef & {
  $: { type: 'CMloInstanceDef' };
};

export type CEntityDef = CMloInstanceDef | GenericEntityDef;

export interface Ymap {
  CMapData: {
    entitiesExtentsMin: XMLDataEntry<{ x: string; y: string; z: string }>;
    entitiesExtentsMax: XMLDataEntry<{ x: string; y: string; z: string }>;
    entities: {
      Item: CEntityDef | CEntityDef[];
    };
  };
}
