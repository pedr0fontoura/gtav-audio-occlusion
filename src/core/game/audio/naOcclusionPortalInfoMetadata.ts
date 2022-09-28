import { CMloPortalDef } from '../CMloPortalDef';

import { naOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';
import { naOcclusionPortalEntityMetadata } from './naOcclusionPortalEntityMetadata';

export class naOcclusionPortalInfoMetadata {
  private portal: CMloPortalDef;

  public interiorProxyHash: number;

  public portalIdx: number;
  public roomIdx: number;

  public destInteriorHash: number;
  public destRoomIdx: number;

  public portalEntityList: naOcclusionPortalEntityMetadata[];

  constructor(interiorMetadata: naOcclusionInteriorMetadata, portal: CMloPortalDef, portalIdx: number) {
    this.portal = portal;

    this.portalIdx = portalIdx;

    const { interiorProxyHash, interior } = interiorMetadata;

    this.interiorProxyHash = interiorProxyHash;
    this.roomIdx = this.portal.roomFrom;

    this.destInteriorHash = this.interiorProxyHash;
    this.destRoomIdx = this.portal.roomTo;

    this.portalEntityList = this.portal.attachedEntities.map(
      entity => new naOcclusionPortalEntityMetadata({ linkType: 1, entity: interior.archetype.getEntity(entity) }),
    );
  }
}
