import { naOcclusionPathNodeMetadata } from './naOcclusionPathNodeMetadata';
import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';

export class naOcclusionPathNodeChildMetadata {
  public pathNode: naOcclusionPathNodeMetadata;
  public portalInfo: naOcclusionPortalInfoMetadata;

  constructor(pathNode: naOcclusionPathNodeMetadata, portalInfo: naOcclusionPortalInfoMetadata) {
    this.pathNode = pathNode;
    this.portalInfo = portalInfo;
  }
}
