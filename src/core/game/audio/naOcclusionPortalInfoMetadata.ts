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

    this.interiorProxyHash = interiorMetadata.interiorProxyHash;
    this.roomIdx = this.portal.roomFrom.index;

    this.destInteriorHash = this.interiorProxyHash;
    this.destRoomIdx = this.portal.roomTo.index;

    this.portalEntityList = this.portal.attachedEntities.map(
      entity => new naOcclusionPortalEntityMetadata({ linkType: 1, entity }),
    );
  }
}
