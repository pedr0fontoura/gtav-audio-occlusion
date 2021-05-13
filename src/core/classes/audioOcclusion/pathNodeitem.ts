import Node from './node';
import PathNodeChildItem from './pathNodeChildItem';

import { convertToInt32 } from '../../utils';

export default class PathNodeItem {
  public key: number;

  public pathType: number;

  public nodeFrom: Node;
  public nodeTo: Node;

  public pathNodeChildList: PathNodeChildItem[];

  constructor(nodeFrom: Node, nodeTo: Node, pathType: number) {
    this.pathType = pathType;

    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;

    this.key = nodeFrom.index === nodeTo.index ? 0 : convertToInt32(this.nodeFrom.key - this.nodeTo.key) + pathType;

    this.pathNodeChildList = [];
  }
}
