import { XMLDataEntry, XMLEntry } from './index';

import { CEntityDef } from './ymap';

export type CMloRoomDef = {
  name: string;
  portalCount: XMLDataEntry<{ value: string }>;
};

export type CMloPortalDef = {
  roomFrom: XMLDataEntry<{ value: string }>;
  roomTo: XMLDataEntry<{ value: string }>;
  flags: XMLDataEntry<{ value: string }>;
  attachedObjects: string;
};

export type CArchetypeDef = {
  $: { type: string };
  name: string;
  lodDist: XMLDataEntry<{ value: string }>;
  flags: XMLDataEntry<{ value: string }>;
  bbMin: XMLDataEntry<{ x: string; y: string; z: string }>;
  bbMax: XMLDataEntry<{ x: string; y: string; z: string }>;
  bsCentre: XMLDataEntry<{ x: string; y: string; z: string }>;
};

export type CBaseArchetypeDef = CArchetypeDef & {
  $: { type: 'CBaseArchetypeDef' };
};

export type CMloArchetypeDef = CArchetypeDef & {
  $: { type: 'CMloArchetypeDef' };
  entities: {
    Item: CEntityDef | CEntityDef[];
  };
  rooms: XMLEntry<{ itemType: string }, CMloRoomDef | CMloRoomDef[]>;
  portals: XMLEntry<{ itemType: string }, CMloPortalDef | CMloPortalDef[]>;
};

export type Archetype = CBaseArchetypeDef | CMloArchetypeDef;

export interface Ytyp {
  CMapTypes: {
    archetypes: {
      Item: Archetype | Archetype[];
    };
  };
}

export interface MloEntity {
  name: string;
  hash: number;
  isDoor: boolean;
  isGlass: boolean;
}

export interface MloRoom {
  index: number;
  name: string;
  portalCount: number;
}

export interface MloPortal {
  index: number;
  from: number;
  to: number;
  attachedObjects: MloEntity[];
  flags: number;
}
