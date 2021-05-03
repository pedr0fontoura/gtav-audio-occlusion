import { XMLDataEntry, XMLEntry } from './index';

export interface PortalEntity {
  LinkType: XMLDataEntry<{ value: string | number }>;
  MaxOcclusion: XMLDataEntry<{ value: string | number }>;
  hash_E3674005: XMLDataEntry<{ value: string | number }>;
  IsDoor: XMLDataEntry<{ value: string | boolean }>;
  IsGlass: XMLDataEntry<{ value: string | boolean }>;
}

export interface PortalInfo {
  InteriorProxyHash: XMLDataEntry<{ value: string | number }>;
  PortalIdx: XMLDataEntry<{ value: string | number }>;
  RoomIdx: XMLDataEntry<{ value: string | number }>;
  DestInteriorHash: XMLDataEntry<{ value: string | number }>;
  DestRoomIdx: XMLDataEntry<{ value: string | number }>;
  PortalEntityList: XMLEntry<{ itemType: string | number }, PortalEntity[]>;
}

export interface PathNodeChild {
  PathNodeKey: XMLDataEntry<{ value: string | number }>;
  PortalInfoIdx: XMLDataEntry<{ value: string | number }>;
}

export interface PathNode {
  Key: XMLDataEntry<{ value: string | number }>;
  PathNodeChildList: XMLEntry<{ itemType: string | number }, PathNodeChild[]>;
}

export interface AudioOcclusionInteriorMetadata {
  hash_DE5DB4C2: {
    PortalInfoList: XMLEntry<{ itemType: string | number }, PortalInfo[]>;
    PathNodeList: XMLEntry<{ itemType: string | number }, PathNode[]>;
  };
}
