import { XMLDataEntry, XMLEntry } from './index';

interface CMloRoomDef {
  name: string;
  portalCount: XMLDataEntry<{ value: string }>;
}

interface CMloPortalDef {
  roomFrom: XMLDataEntry<{ value: string }>;
  roomTo: XMLDataEntry<{ value: string }>;
  attachedObjects: string;
}

export interface CMloArchetypeDef {
  $: { type: string };
  rooms: XMLEntry<{ itemType: string }, CMloRoomDef[]>;
  portals: XMLEntry<{ itemType: string }, CMloPortalDef[]>;
}

export interface YtypXML {
  CMapTypes: {
    archetypes: {
      Item: CMloArchetypeDef[];
    };
  };
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
  attachedObjects?: any;
}