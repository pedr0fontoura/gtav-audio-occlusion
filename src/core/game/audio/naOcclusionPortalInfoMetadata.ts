import { naOcclusionPortalEntityMetadata } from './naOcclusionPortalEntityMetadata';

export class naOcclusionPortalInfoMetadata {
  public interiorProxyHash: number;

  public portalIdx: number;
  public roomIdx: number;

  public destInteriorHash: number;
  public destRoomHash: number;

  public portalEntityList: naOcclusionPortalEntityMetadata[];
}
