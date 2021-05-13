import { CMloArchetypeDef } from '../../files/codewalker/ytyp';
import { PortalInfo } from './index';

import Node from './node';
import PathNodeItem from './pathNodeitem';
import PathNodeChildItem from './pathNodeChildItem';
import Pairs from './pair';

export enum PathType {
  Unk0,
  Unk1,
  Unk2,
  Unk3,
  Unk4,
  Unk5,
}

export default class Path {
  public static getPaths(nodes: Node[], portalInfoList: PortalInfo[]): PathNodeItem[] {
    const pathNodeList: PathNodeItem[] = [];

    nodes.forEach(node => {
      node.edges.forEach(edge => {
        const pathNodeItem = new PathNodeItem(node, edge, PathType.Unk1);

        node.portals.forEach(portalInfo => {
          if (portalInfo.destRoomIdx === edge.index) {
            const portalInfoIdx = portalInfoList.findIndex(
              item =>
                item.index === portalInfo.index && item.destRoomIdx === portalInfo.destRoomIdx,
            );

            const pathNodeChildItem = new PathNodeChildItem(0, portalInfoIdx);

            pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
          }
        });

        pathNodeList.push(pathNodeItem);
      });
    });

    return pathNodeList;
  }
}
