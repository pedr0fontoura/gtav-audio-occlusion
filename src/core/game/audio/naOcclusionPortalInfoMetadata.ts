import { naOcclusionPortalEntityMetadata } from './naOcclusionPortalEntityMetadata';

type naOcclusionPortalInfoMetadataConstructor = {
  interiorProxyHash: number;
  portalIdx: number;
  roomIdx: number;
  destInteriorHash: number;
  destRoomIdx: number;
  portalEntityList: naOcclusionPortalEntityMetadata[];
};

export class naOcclusionPortalInfoMetadata {
  public interiorProxyHash: number;

  public portalIdx: number;
  public roomIdx: number;

  public destInteriorHash: number;
  public destRoomIdx: number;

  public portalEntityList: naOcclusionPortalEntityMetadata[];

  // The constructor should only receive an CMloPortalDef
  constructor({
    interiorProxyHash,
    portalIdx,
    roomIdx,
    destInteriorHash,
    destRoomIdx,
    portalEntityList,
  }: naOcclusionPortalInfoMetadataConstructor) {
    this.interiorProxyHash = interiorProxyHash;
    this.portalIdx = portalIdx;
    this.roomIdx = roomIdx;
    this.destInteriorHash = destInteriorHash;
    this.destRoomIdx = destRoomIdx;
    this.portalEntityList = portalEntityList;
  }
}
