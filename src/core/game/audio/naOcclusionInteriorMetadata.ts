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

    return joaat(archetype.name) ^ (position.x * 100) ^ (position.y * 100) ^ ((position.z * 100) & 0xffffffff);
  }

  public getPortalInfoList(): naOcclusionPortalInfoMetadata[] {
    const { archetype } = this.interior;

    let portalInfoList: naOcclusionPortalInfoMetadata[] = [];

    archetype.rooms.forEach((room, roomIndex) => {
      const roomPortals = archetype.getRoomPortals(roomIndex);

      const roomPortalInfoList = roomPortals
        .filter(portal => !isBitSet(portal.flags, 2))
        .map((portal, portalIdx) => new naOcclusionPortalInfoMetadata(this, portal, portalIdx));

      portalInfoList.push(...roomPortalInfoList);
    });

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

  private getPathNodes(
    pathNodeList: naOcclusionPathNodeMetadata[],
    nodeFrom: Node,
    nodeTo: Node,
    pathType: number,
    childPathType: number,
  ): void {
    const existingPathNode = findPathNode(pathNodeList, nodeFrom, nodeTo, pathType);

    if (!existingPathNode) {
      const createdPathNode = new naOcclusionPathNodeMetadata(nodeFrom, nodeTo, pathType);

      createdPathNode.addChildFromRelevantPortals(nodeFrom, nodeTo, childPathType);

      addPathNodeToList(pathNodeList, createdPathNode);
    } else {
      existingPathNode.addChildFromRelevantPortals(nodeFrom, nodeTo, pathType);
    }
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
          this.getPathNodes(pathNodeList, nodeFrom, nodeTo, pathType, childPathType);
        } else {
          for (const edge of edges) {
            if (pathNode.isRelevant(edge, nodeTo)) {
              this.getPathNodes(pathNodeList, nodeFrom, nodeTo, pathType, childPathType);
            }
          }
        }
      }

      if (pathType === 4 || pathType === 5) {
        for (const edge of edges) {
          if (pathNode.isRelevant(edge, nodeTo)) {
            const hasBeenFound = hasPathAlreadyBeenFound(pathNodeList, edge, nodeTo);

            if (hasBeenFound) continue;

            this.getPathNodes(pathNodeList, edge, nodeTo, pathType, childPathType);
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

          pathNode.addChildFromRelevantPortals(node, node, childPathType);

          addPathNodeToList(pathNodeList, pathNode);
        }
      }
    } else {
      const pairs = Pair.getPairs(this.nodes);

      for (const pair of pairs) {
        this.getRoutesBetweenNodes(pathNodeList, pair.nodeFrom, pair.nodeTo, pathType, childPathType);
        this.getRoutesBetweenNodes(pathNodeList, pair.nodeTo, pair.nodeFrom, pathType, childPathType);
      }
    }
  }

  public getPathNodeList(): naOcclusionPathNodeMetadata[] {
    const pathNodeList: naOcclusionPathNodeMetadata[] = [];

    this.getPathsOfType(pathNodeList, 1, 0);
    this.getPathsOfType(pathNodeList, 2, 1);
    this.getPathsOfType(pathNodeList, 3, 2);
    this.getPathsOfType(pathNodeList, 4, 2);
    this.getPathsOfType(pathNodeList, 5, 4);

    return pathNodeList;
  }

  public findPortalInfoIdx(portalInfo: naOcclusionPortalInfoMetadata): number {
    return this.portalInfoList.findIndex(
      ({ interiorProxyHash, portalIdx, roomIdx, destRoomIdx }) =>
        interiorProxyHash === portalInfo.interiorProxyHash &&
        portalIdx === portalInfo.portalIdx &&
        roomIdx === portalInfo.roomIdx &&
        destRoomIdx === portalInfo.destRoomIdx,
    );
  }
}
