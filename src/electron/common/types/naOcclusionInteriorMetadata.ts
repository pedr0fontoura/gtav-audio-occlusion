export type SerializedNaOcclusionPortalInfoMetadata = {
  interiorProxyHash: number;
  roomIdx: number;
  destInteriorHash: number;
  destRoomIdx: number;
};

export type SerializedNaOcclusionInteriorMetadata = {
  interiorProxyHash: number;
  portalInfoList: SerializedNaOcclusionPortalInfoMetadata[];
};
