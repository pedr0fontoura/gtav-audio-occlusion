export interface PortalEntity {
  LinkType: number;
  MaxOcclusion: number;
  hash_E3674005: number;
  IsDoor: boolean;
  IsGlass: boolean;
};

export interface PortalInfo {
  InteriorProxyHash: number;
  PortalIdx: number;
  RoomIdx: number;
  DestInteriorHash: number;
  DestRoomIdx: number;
  PortalEntityList: PortalEntity[];
};