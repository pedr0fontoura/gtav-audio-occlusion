import Node from './node';
import PathNodeItem from './pathNodeitem';
import PathNodeChildItem from './pathNodeChildItem';
import Pair from './pair';

export default class Path {
  public static getPaths(nodes: Node[]): PathNodeItem[] {
    const pathNodeList: PathNodeItem[] = [];

    Path.getPathsOfType(pathNodeList, nodes, 1, 0);
    Path.getPathsOfType(pathNodeList, nodes, 2, 1);
    Path.getPathsOfType(pathNodeList, nodes, 3, 2);
    Path.getPathsOfType(pathNodeList, nodes, 4, 3);
    Path.getPathsOfType(pathNodeList, nodes, 5, 4);

    return pathNodeList;
  }

  public static getPathsOfType(
    pathNodeList: PathNodeItem[],
    nodes: Node[],
    pathType: number,
    childPathType: number,
  ): void {
    if (pathType === 1) {
      nodes.forEach(node => {
        node.edges.forEach(edge => {
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

  public static findPathNodeInList(
    pathNodeList: PathNodeItem[],
    nodeFrom: Node,
    nodeTo: Node,
    pathType: number,
  ): PathNodeItem {
    const pathNodeItem = pathNodeList.find(
      pathNode =>
        pathNode.nodeFrom.index === nodeFrom.index &&
        pathNode.nodeTo.index === nodeTo.index &&
        pathNode.pathType === pathType,
    );

    return pathNodeItem;
  }

  public static hasPathAlreadyBeenFound(pathNodeList: PathNodeItem[], nodeFrom: Node, nodeTo: Node): boolean {
    const pathNodeItem = pathNodeList.find(
      pathNode =>
        pathNode.nodeFrom.index === nodeFrom.index && pathNode.nodeTo.index === nodeTo.index && pathNode.pathType === 3,
    );
    return !!pathNodeItem;
  }

  public static getRoutes(
    pathNodeList: PathNodeItem[],
    isLimboPair: boolean,
    nodeFrom: Node,
    nodeTo: Node,
    pathType: number,
    childPathType: number,
  ): void {
    const edges = isLimboPair ? nodeFrom.edges : nodeFrom.edges.filter(node => node.name !== 'limbo');

    pathNodeList
      .filter(pathNode => pathNode.pathType === childPathType)
      .forEach(pathNode => {
        if (pathType === 1 || pathType === 2 || pathType === 3) {
          if (pathNode.nodeFrom.index === nodeFrom.index && pathNode.nodeTo.index === nodeTo.index) {
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
              if (pathNode.nodeFrom.index === edge.index && pathNode.nodeTo.index === nodeTo.index) {
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

        if (pathType === 4 || pathType === 5) {
          edges.forEach(edge => {
            if (pathNode.nodeFrom.index === edge.index && pathNode.nodeTo.index === nodeTo.index) {
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
}
