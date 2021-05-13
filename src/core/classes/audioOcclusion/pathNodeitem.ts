import Node from './node';
import PathNodeChildItem from './pathNodeChildItem';

import { PathType } from './path';

import { convertToInt32 } from '../../utils';

export default class PathNodeItem {
  public key: number;

  public pathType: PathType;

  public nodeFrom: Node;
  public nodeTo: Node;

  public pathNodeChildList: PathNodeChildItem[];

  constructor(nodeFrom: Node, nodeTo: Node, pathType: PathType) {
    this.pathType = pathType;

    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;

    this.key =
      nodeFrom == nodeTo ? 0 : convertToInt32(this.nodeFrom.key - this.nodeTo.key + pathType);

    this.pathNodeChildList = [];
  }
}
