export type SerializedNaOcclusionPortalEntityMetadata = {
  entityModelName: string;
  entityModelHashKey: number;
  linkType: number;
  maxOcclusion: number;
  isDoor: boolean;
  isGlass: boolean;
};

export type SerializedNaOcclusionPortalInfoMetadata = {
  enabled: boolean;
  portalIndex: number;
  infoIndex: number;
  interiorProxyHash: number;
  portalIdx: number;
  roomIdx: number;
  destInteriorHash: number;
  destRoomIdx: number;
  portalEntityList: SerializedNaOcclusionPortalEntityMetadata[];
};

export type SerializedNaOcclusionInteriorMetadata = {
  interiorProxyHash: number;
  portalInfoList: SerializedNaOcclusionPortalInfoMetadata[];
};
