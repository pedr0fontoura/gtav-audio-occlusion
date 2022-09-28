import { convertToInt32 } from '../../utils';

import { naOcclusionPathNodeChildMetadata } from './naOcclusionPathNodeChildMetadata';
import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';
import { Node } from '../../classes/node';

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

  public isRelevant = (nodeFrom: Node, nodeTo: Node): boolean => {
    return this.nodeFrom.index === nodeFrom.index && this.nodeTo.index === nodeTo.index;
  };

  public addChild(nodeFrom: Node, nodeTo: Node, pathType: number, portalInfo: naOcclusionPortalInfoMetadata): void {
    const pathNodeChild = new naOcclusionPathNodeChildMetadata(
      new naOcclusionPathNodeMetadata(nodeFrom, nodeTo, pathType),
      portalInfo,
    );

    this.pathNodeChildList.push(pathNodeChild);
  }

  public addChildFromRelevantPortals = (nodeFrom: Node, nodeTo: Node, pathType: number): void => {
    for (const relevantPortalInfo of nodeFrom.findRelevantPortalInfoList(nodeTo)) {
      this.addChild(nodeFrom, nodeTo, pathType, relevantPortalInfo);
    }
  };
}
