import PathNodeItem from './pathNodeitem';
import { PortalInfo } from './index';

export default class PathNodeChildItem {
  public pathNode: PathNodeItem;
  public portalInfo: PortalInfo;

  constructor(pathNode: PathNodeItem, portalInfo: PortalInfo) {
    this.pathNode = pathNode;
    this.portalInfo = portalInfo;
  }
}
