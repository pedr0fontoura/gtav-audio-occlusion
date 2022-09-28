import { convertToInt32 } from '../../utils';

import { naOcclusionPathNodeChildMetadata } from './naOcclusionPathNodeChildMetadata';
import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';
import { Node } from './node';

export class naOcclusionPathNodeMetadata {
  public nodeFrom: Node;
  public nodeTo: Node;

  public pathType: number;

  public key: number;

  public pathNodeChildList: naOcclusionPathNodeChildMetadata[];

  constructor(nodeFrom: Node, nodeTo: Node, pathType: number) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;

    this.pathType = pathType;

    this.key = nodeFrom.index === nodeTo.index ? 0 : convertToInt32(this.nodeFrom.key - this.nodeTo.key) + pathType;

    this.pathNodeChildList = [];
  }

  public addChild(nodeFrom: Node, nodeTo: Node, pathType: number, portalInfo: naOcclusionPortalInfoMetadata): void {
    const pathNodeChild = new naOcclusionPathNodeChildMetadata(
      new naOcclusionPathNodeMetadata(nodeFrom, nodeTo, pathType),
      portalInfo,
    );

    this.pathNodeChildList.push(pathNodeChild);
  }
}
