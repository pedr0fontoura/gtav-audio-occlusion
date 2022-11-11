export type SerializedNaOcclusionPortalEntityMetadata = {
  entityModelName: string;
  entityModelHashKey: number;
  linkType: number;
  maxOcclusion: number;
  isDoor: boolean;
  isGlass: boolean;
};

export type SerializedNaOcclusionPortalInfoMetadata = {
  interiorProxyHash: number;
  roomIdx: number;
  destInteriorHash: number;
  destRoomIdx: number;
  portalEntityList: SerializedNaOcclusionPortalEntityMetadata[];
};

export type SerializedNaOcclusionInteriorMetadata = {
  interiorProxyHash: number;
  portalInfoList: SerializedNaOcclusionPortalInfoMetadata[];
};
