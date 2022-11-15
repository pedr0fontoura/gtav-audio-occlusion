import { Node } from '../../classes/node';
import { Pair } from '../../classes/pair';

import { joaat, isBitSet } from '../../utils';

import { isCMloArchetypeDef } from '../CMloArchetypeDef';
import type { CMloInstanceDef } from '../CMloInstanceDef';

import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';
import { naOcclusionPathNodeMetadata } from './naOcclusionPathNodeMetadata';

import { findPathNode, addPathNodeToList, hasPathAlreadyBeenFound } from './utils';

type naOcclusionInteriorMetadataConstructor = {
  interior: CMloInstanceDef;
};

export class naOcclusionInteriorMetadata {
  public interior: CMloInstanceDef;

  public interiorProxyHash: number;

  public portalInfoList: naOcclusionPortalInfoMetadata[];

  public nodes: Node[];
  public pathNodeList: naOcclusionPathNodeMetadata[];

  constructor({ interior }: naOcclusionInteriorMetadataConstructor) {
    if (!interior.archetype) {
      throw new Error('CMloInstanceDef archetype is not set');
    }

    if (!isCMloArchetypeDef(interior.archetype)) {
      throw new Error('Interior archetype is not a CMloArchetypeDef');
    }

    this.interior = interior;

    this.interiorProxyHash = naOcclusionInteriorMetadata.getInteriorProxyHash(this.interior);

    this.portalInfoList = this.getPortalInfoList();

    this.nodes = this.getNodes();
    this.pathNodeList = this.getPathNodeList();
  }

  static getInteriorProxyHash(interior: CMloInstanceDef): number {
    const { archetype, position } = interior;

    return (joaat(archetype.name) ^ (position.x * 100) ^ (position.y * 100) ^ (position.z * 100)) & 0xffffffff;
  }

  public getPortalInfoList(): naOcclusionPortalInfoMetadata[] {
    const { archetype } = this.interior;

    const portalInfoList: naOcclusionPortalInfoMetadata[] = [];

    for (let roomIndex = 0; roomIndex < archetype.rooms.length; roomIndex++) {
      let portalIdx = -1; // portal index relative to room

      for (let portalIndex = 0; portalIndex < archetype.portals.length; portalIndex++) {
        const portal = archetype.portals[portalIndex];

        if (isBitSet(portal.flags, 2)) continue;

        if (portal.roomFrom !== roomIndex && portal.roomTo !== roomIndex) continue;

        portalIdx++;

        const isPortalFromThisRoom = portal.roomFrom === roomIndex;

        const roomFrom = isPortalFromThisRoom ? portal.roomFrom : portal.roomTo;
        const roomTo = isPortalFromThisRoom ? portal.roomTo : portal.roomFrom;

        portalInfoList.push(
          new naOcclusionPortalInfoMetadata({
            portal,
            portalIndex,
            infoIndex: portalInfoList.length,
            interiorMetadata: this,
            portalIdx,
            roomFrom,
            roomTo,
          }),
        );
      }
    }

    return portalInfoList;
  }

  public getNodes(): Node[] {
    const { archetype } = this.interior;

    const nodes = archetype.rooms.map((room, index) => new Node(this, room, index));

    for (const node of nodes) {
      const edges = new Set<Node>();

      archetype.getRoomPortals(node.index).forEach(portal => {
        if (portal.roomFrom === node.index) {
          return edges.add(nodes.find(node => node.index === portal.roomTo));
        }

        if (portal.roomTo === node.index) {
          return edges.add(nodes.find(node => node.index === portal.roomFrom));
        }
      });

      node.edges = Array.from(edges);
    }

    return nodes;
  }

  private getRoutesBetweenNodes(
    pathNodeList: naOcclusionPathNodeMetadata[],
    nodeFrom: Node,
    nodeTo: Node,
    pathType: number,
    childPathType: number,
  ): void {
    const isLimboPair = nodeFrom.index === 0 || nodeTo.index === 0;

    const edges = isLimboPair ? nodeFrom.edges : nodeFrom.edges.filter(node => node.index !== 0);

    const filteredPathNodeList = pathNodeList.filter(pathNode => pathNode.pathType === childPathType);

    for (const pathNode of filteredPathNodeList) {
      if (pathType === 1 || pathType === 2 || pathType === 3) {
        if (pathNode.isRelevant(nodeFrom, nodeTo)) {
          const existingPathNode = findPathNode(pathNodeList, nodeFrom, nodeTo, pathType);

          if (existingPathNode) {
            nodeFrom.portalInfoList.forEach(portalInfo => {
              if (portalInfo.destRoomIdx !== nodeTo.index) return;

              existingPathNode.addChild(nodeFrom, nodeFrom, childPathType, portalInfo);
            });
          } else {
            const createdPathNode = new naOcclusionPathNodeMetadata(nodeFrom, nodeTo, pathType);

            nodeFrom.portalInfoList.forEach(portalInfo => {
              if (portalInfo.destRoomIdx !== nodeTo.index) return;

              createdPathNode.addChild(nodeFrom, nodeFrom, childPathType, portalInfo);
            });

            addPathNodeToList(pathNodeList, createdPathNode);
          }
        } else {
          for (const edge of edges) {
            if (pathNode.isRelevant(edge, nodeTo)) {
              const existingPathNode = findPathNode(pathNodeList, nodeFrom, nodeTo, pathType);

              if (existingPathNode) {
                nodeFrom.portalInfoList.forEach(portalInfo => {
                  if (portalInfo.destRoomIdx !== edge.index) return;

                  existingPathNode.addChild(edge, nodeTo, childPathType, portalInfo);
                });
              } else {
                const createdPathNode = new naOcclusionPathNodeMetadata(nodeFrom, nodeTo, pathType);

                nodeFrom.portalInfoList.forEach(portalInfo => {
                  if (portalInfo.destRoomIdx !== edge.index) return;

                  createdPathNode.addChild(edge, nodeTo, childPathType, portalInfo);
                });

                addPathNodeToList(pathNodeList, createdPathNode);
              }
            }
          }
        }
      }

      if (pathType === 4 || pathType === 5) {
        for (const edge of edges) {
          if (pathNode.isRelevant(edge, nodeTo)) {
            const hasBeenFound = hasPathAlreadyBeenFound(pathNodeList, nodeFrom, nodeTo);

            if (hasBeenFound) continue;

            const existingPathNode = findPathNode(pathNodeList, nodeFrom, nodeTo, pathType);

            if (existingPathNode) {
              nodeFrom.portalInfoList.forEach(portalInfo => {
                if (portalInfo.destRoomIdx !== edge.index) return;

                existingPathNode.addChild(edge, nodeTo, childPathType, portalInfo);
              });
            } else {
              const createdPathNode = new naOcclusionPathNodeMetadata(nodeFrom, nodeTo, pathType);

              nodeFrom.portalInfoList.forEach(portalInfo => {
                if (portalInfo.destRoomIdx !== edge.index) return;

                createdPathNode.addChild(edge, nodeTo, childPathType, portalInfo);
              });

              addPathNodeToList(pathNodeList, createdPathNode);
            }
          }
        }
      }
    }
  }

  private getPathsOfType(pathNodeList: naOcclusionPathNodeMetadata[], pathType: number, childPathType: number): void {
    // Link node to edges through portal (direct link)
    if (pathType === 1) {
      for (const node of this.nodes) {
        for (const edge of node.edges) {
          const pathNode = new naOcclusionPathNodeMetadata(node, edge, pathType);

          for (const portalInfo of node.portalInfoList) {
            if (portalInfo.destRoomIdx === edge.index) {
              pathNode.addChild(node, node, childPathType, portalInfo);
            }
          }

          pathNodeList.push(pathNode);
        }
      }
    } else {
      const pairs = Pair.getPairs(this.nodes);

      for (const pair of pairs) {
        this.getRoutesBetweenNodes(pathNodeList, pair.nodeFrom, pair.nodeTo, pathType, childPathType);
      }
    }
  }

  public getPathNodeList(): naOcclusionPathNodeMetadata[] {
    const pathNodeList: naOcclusionPathNodeMetadata[] = [];

    this.getPathsOfType(pathNodeList, 1, 0);
    this.getPathsOfType(pathNodeList, 2, 1);
    this.getPathsOfType(pathNodeList, 3, 2);
    this.getPathsOfType(pathNodeList, 4, 3);
    this.getPathsOfType(pathNodeList, 5, 4);

    return pathNodeList;
  }
}
