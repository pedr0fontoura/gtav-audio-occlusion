import { CMloArchetypeDef } from '../../files/codewalker/ytyp';
import { PortalInfo } from './index';

import Node from './node';
import PathNodeItem from './pathNodeitem';
import PathNodeChildItem from './pathNodeChildItem';
import Pair from './pair';

export enum PathType {
  Unk0,
  Unk1,
  Unk2,
  Unk3,
  Unk4,
  Unk5,
}

export default class Path {
  public static getPaths(nodes: Node[]): PathNodeItem[] {
    const pathNodeList: PathNodeItem[] = [];

    Path.getPathsOfType(pathNodeList, nodes, PathType.Unk1, PathType.Unk0);
    Path.getPathsOfType(pathNodeList, nodes, PathType.Unk2, PathType.Unk1);
    Path.getPathsOfType(pathNodeList, nodes, PathType.Unk3, PathType.Unk2);
    Path.getPathsOfType(pathNodeList, nodes, PathType.Unk4, PathType.Unk3);
    Path.getPathsOfType(pathNodeList, nodes, PathType.Unk5, PathType.Unk4);

    return pathNodeList;
  }

  public static findPathNodeInList(
    pathNodeList: PathNodeItem[],
    nodeFrom: Node,
    nodeTo: Node,
    pathType: PathType,
  ): PathNodeItem {
    const pathNodeItem = pathNodeList.find(
      pathNode => pathNode.nodeFrom == nodeFrom && pathNode.nodeTo == nodeTo && pathNode.pathType == pathType,
    );

    return pathNodeItem;
  }

  public static hasPathAlreadyBeenFound(pathNodeList: PathNodeItem[], nodeFrom: Node, nodeTo: Node): boolean {
    const pathNodeItem = Path.findPathNodeInList(pathNodeList, nodeFrom, nodeTo, PathType.Unk3);
    return !!pathNodeItem;
  }

  public static getRoutes(
    pathNodeList: PathNodeItem[],
    isLimboPair: boolean,
    nodeFrom: Node,
    nodeTo: Node,
    pathType: PathType,
    childPathType: PathType,
  ): void {
    const edges = isLimboPair ? nodeFrom.edges : nodeFrom.edges.filter(node => node.name !== 'limbo');

    pathNodeList
      .filter(pathNode => pathNode.pathType === childPathType)
      .forEach(pathNode => {
        if (pathType === PathType.Unk1) {
        }

        if (pathType === PathType.Unk2) {
        }

        if (pathType === PathType.Unk3) {
          if (pathNode.nodeFrom == nodeFrom && pathNode.nodeTo == nodeTo) {
            const existingPath = Path.findPathNodeInList(pathNodeList, nodeFrom, nodeTo, pathType);

            if (existingPath) {
              const pathNodeItem = existingPath;

              nodeFrom.portals.forEach(portalInfo => {
                if (portalInfo.destRoomIdx === nodeTo.index) {
                  const pathNodeChildItem = new PathNodeChildItem(
                    new PathNodeItem(nodeFrom, nodeFrom, childPathType),
                    portalInfo,
                  );
                  pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
                }
              });
            } else {
              const pathNodeItem = new PathNodeItem(nodeFrom, nodeTo, pathType);

              nodeFrom.portals.forEach(portalInfo => {
                if (portalInfo.destRoomIdx === nodeTo.index) {
                  const pathNodeChildItem = new PathNodeChildItem(
                    new PathNodeItem(nodeFrom, nodeFrom, childPathType),
                    portalInfo,
                  );
                  pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
                }
              });

              pathNodeList.push(pathNodeItem);
            }
          } else {
            edges.forEach(edge => {
              if (pathNode.nodeFrom == edge && pathNode.nodeTo == nodeTo) {
                const existingPath = Path.findPathNodeInList(pathNodeList, nodeFrom, nodeTo, pathType);

                if (existingPath) {
                  const pathNodeItem = existingPath;

                  nodeFrom.portals.forEach(portalInfo => {
                    if (portalInfo.destRoomIdx === edge.index) {
                      const pathNodeChildItem = new PathNodeChildItem(
                        new PathNodeItem(edge, nodeTo, childPathType),
                        portalInfo,
                      );
                      pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
                    }
                  });
                } else {
                  if (nodeFrom.inactiveEdges.includes(nodeTo.index)) return;

                  const pathNodeItem = new PathNodeItem(nodeFrom, nodeTo, pathType);

                  nodeFrom.portals.forEach(portalInfo => {
                    if (portalInfo.destRoomIdx === edge.index) {
                      const pathNodeChildItem = new PathNodeChildItem(
                        new PathNodeItem(edge, nodeTo, childPathType),
                        portalInfo,
                      );
                      pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
                    }
                  });

                  pathNodeList.push(pathNodeItem);
                }
              }
            });
          }
        }

        if (pathType === PathType.Unk4) {
        }

        if (pathType === PathType.Unk5) {
          edges.forEach(edge => {
            if (pathNode.nodeFrom == edge && pathNode.nodeTo == nodeTo) {
              const existingPath = Path.findPathNodeInList(pathNodeList, nodeFrom, nodeTo, pathType);
              const hasBeenFound = Path.hasPathAlreadyBeenFound(pathNodeList, nodeFrom, nodeTo);

              if (hasBeenFound) return;

              if (existingPath) {
                const pathNodeItem = existingPath;

                nodeFrom.portals.forEach(portalInfo => {
                  if (portalInfo.destRoomIdx === edge.index) {
                    const pathNodeChildItem = new PathNodeChildItem(
                      new PathNodeItem(edge, nodeTo, childPathType),
                      portalInfo,
                    );
                    pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
                  }
                });
              } else {
                if (nodeFrom.inactiveEdges.includes(nodeTo.index)) return;

                const pathNodeItem = new PathNodeItem(nodeFrom, nodeTo, pathType);

                nodeFrom.portals.forEach(portalInfo => {
                  if (portalInfo.destRoomIdx === edge.index) {
                    const pathNodeChildItem = new PathNodeChildItem(
                      new PathNodeItem(edge, nodeTo, childPathType),
                      portalInfo,
                    );
                    pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
                  }
                });

                pathNodeList.push(pathNodeItem);
              }
            }
          });
        }
      });
  }

  public static getPathsOfType(
    pathNodeList: PathNodeItem[],
    nodes: Node[],
    pathType: PathType,
    childPathType: PathType,
  ): void {
    if (pathType === PathType.Unk1) {
      nodes.forEach(node => {
        node.edges.forEach(edge => {
          if (node.inactiveEdges.includes(edge.index)) return;

          const pathNodeItem = new PathNodeItem(node, edge, pathType);

          node.portals.forEach(portalInfo => {
            if (portalInfo.destRoomIdx === edge.index) {
              const pathNodeChildItem = new PathNodeChildItem(new PathNodeItem(node, node, childPathType), portalInfo);
              pathNodeItem.pathNodeChildList.push(pathNodeChildItem);
            }
          });

          pathNodeList.push(pathNodeItem);
        });
      });
    } else {
      const pairs = Pair.getPairs(nodes);

      pairs.forEach(pair => {
        Path.getRoutes(pathNodeList, pair.isLimboPair, pair.nodeFrom, pair.nodeTo, pathType, childPathType);
        Path.getRoutes(pathNodeList, pair.isLimboPair, pair.nodeTo, pair.nodeFrom, pathType, childPathType);
      });
    }
  }
}
