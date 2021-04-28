import { XMLDataEntry, XMLEntry } from './index';

interface PortalInfo {
  InteriorProxyHash: XMLDataEntry<{ value: string; }>;
  PortalIdx: XMLDataEntry<{ value: string; }>;
  RoomIdx: XMLDataEntry<{ value: string; }>;
  DestInteriorHash: XMLDataEntry<{ value: string; }>;
  DestRoomIdx: XMLDataEntry<{ value: string; }>;
  PortalEntityList: XMLDataEntry<{ value: string; }>;
}

interface PathNodeChild {
  PathNodeKey: XMLEntry<{ value: string }>;
  PortalInfoIdx: XMLEntry<{ value: string }>;
}

interface PathNode {
  Key: XMLDataEntry<{ value: string }>;
  PathNodeChildList: XMLEntry<{ value: string }, PathNodeChild[]>;
}

export interface AudioOcclusionFile {
  hash_DE5DB4C2: {
    PortalInfoList: XMLEntry<{ itemType: string; }, PortalInfo[]>;
    PathNodeList: XMLEntry<{ itemType: string; }, PathNode[]>;
  };
}