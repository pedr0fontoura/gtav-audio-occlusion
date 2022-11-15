import { CMloPortalDef } from '../CMloPortalDef';

import { naOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';
import { naOcclusionPortalEntityMetadata } from './naOcclusionPortalEntityMetadata';

type naOcclusionPortalInfoMetadataConstructor = {
  portal: CMloPortalDef;
  portalIndex: number;
  infoIndex: number;
  interiorMetadata: naOcclusionInteriorMetadata;
  portalIdx: number;
  roomFrom: number;
  roomTo: number;
};

export class naOcclusionPortalInfoMetadata {
  private portal: CMloPortalDef;

  public enabled: boolean;

  public portalIndex: number; // relative to CMloArchetypeDef
  public infoIndex: number; // relative to naOcclusionInteriorMetadata portalInfoList

  public interiorProxyHash: number;
  public portalIdx: number; // relative to roomIdx
  public roomIdx: number;
  public destInteriorHash: number;
  public destRoomIdx: number;

  public portalEntityList: naOcclusionPortalEntityMetadata[];

  constructor({
    portal,
    portalIndex,
    infoIndex,
    interiorMetadata,
    portalIdx,
    roomFrom,
    roomTo,
  }: naOcclusionPortalInfoMetadataConstructor) {
    const { interiorProxyHash, interior } = interiorMetadata;

    this.enabled = true;

    this.portal = portal;
    this.portalIndex = portalIndex;
    this.infoIndex = infoIndex;

    this.interiorProxyHash = interiorProxyHash;
    this.portalIdx = portalIdx;
    this.roomIdx = roomFrom;
    this.destInteriorHash = this.interiorProxyHash;
    this.destRoomIdx = roomTo;

    this.portalEntityList = this.portal.attachedEntities.map(
      entity => new naOcclusionPortalEntityMetadata({ linkType: 1, entity: interior.archetype.getEntity(entity) }),
    );
  }
}
