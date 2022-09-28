import { joaat, isBitSet } from '../../utils';

import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';
import { naOcclusionPathNodeMetadata } from './naOcclusionPathNodeMetadata';
import { Node } from './node';

import { isCMloArchetypeDef } from '../CMloArchetypeDef';
import type { CMloInstanceDef } from '../CMloInstanceDef';

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

  static getInteriorProxyHash = (interior: CMloInstanceDef): number => {
    const { archetype, position } = interior;

    return joaat(archetype.name) ^ (position.x * 100) ^ (position.y * 100) ^ ((position.z * 100) & 0xffffffff);
  };

  public getPortalInfoList = (): naOcclusionPortalInfoMetadata[] => {
    const { archetype } = this.interior;

    let portalInfoList: naOcclusionPortalInfoMetadata[] = [];

    archetype.rooms.forEach(room => {
      const roomPortals = room.portals;

      const roomPortalInfoList = roomPortals
        .filter(portal => !isBitSet(portal.flags, 2))
        .map((portal, portalIdx) => new naOcclusionPortalInfoMetadata(this, portal, portalIdx));

      portalInfoList.push(...roomPortalInfoList);
    });

    return portalInfoList;
  };

  public getNodes = (): Node[] => {
    const { archetype } = this.interior;

    const nodes = archetype.rooms.map(room => new Node(this, room));

    for (const node of nodes) {
      const edges = new Set<Node>();

      node.room.portals.forEach(portal => {
        if (portal.roomFrom.index === node.index) {
          return edges.add(nodes.find(node => node.index === portal.roomTo.index));
        }

        if (portal.roomTo.index === node.index) {
          return edges.add(nodes.find(node => node.index === portal.roomFrom.index));
        }
      });

      node.edges = Array.from(edges);
    }

    return nodes;
  };

  private getPathsOfType = (pathType: number, childPathType: number): naOcclusionPathNodeMetadata[] => {
    const pathNodes: naOcclusionPathNodeMetadata[] = [];

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

          pathNodes.push(pathNode);
        }
      }
    }

    return pathNodes;
  };

  public getPathNodeList = (): naOcclusionPathNodeMetadata[] => {
    return [...this.getPathsOfType(1, 0)];
  };
}
