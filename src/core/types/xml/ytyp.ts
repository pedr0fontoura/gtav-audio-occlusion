import { XMLDataEntry, XMLEntry } from './index';

interface CEntityDef {
  $: { type: string };
  archetypeName: string;
}

interface CMloRoomDef {
  name: string;
  portalCount: XMLDataEntry<{ value: string }>;
}

interface CMloPortalDef {
  roomFrom: XMLDataEntry<{ value: string }>;
  roomTo: XMLDataEntry<{ value: string }>;
  flags: XMLDataEntry<{ value: string }>;
  attachedObjects: string;
}

export interface CMloArchetypeDef {
  $: { type: string };
  entities: {
    Item: CEntityDef[];
  };
  rooms: XMLEntry<{ itemType: string }, CMloRoomDef[]>;
  portals: XMLEntry<{ itemType: string }, CMloPortalDef[]>;
}

export interface Ytyp {
  CMapTypes: {
    archetypes: {
      Item: CMloArchetypeDef | CMloArchetypeDef[];
    };
  };
}

export interface MloEntity {
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
