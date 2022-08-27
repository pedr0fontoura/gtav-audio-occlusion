import Interior from '../interior';
import { PortalInfo } from './index';

import { joaat } from '../../utils';

interface MloRoom {
  index: number;
  name: string;
}

export default class Node {
  public index: number;
  public name: string;
  public key: number;

  public portals: PortalInfo[];
  public edges: Node[];

  public inactiveEdges: number[];

  constructor(room: MloRoom, occlusionHash: number) {
    this.index = room.index;
    this.name = room.name;
    this.key = room.name === 'limbo' ? joaat('outside') : occlusionHash ^ joaat(room.name);

    this.portals = [];
    this.edges = [];

    this.inactiveEdges = [];
  }

  public static getNodes(portalInfoList: PortalInfo[], interior: Interior, occlusionHash: number): Node[] {
    const nodes = interior.rooms.map(room => {
      const node = new Node(room, occlusionHash);

      node.portals = portalInfoList.filter(portal => portal.roomIdx === node.index && portal.enabled);

      return node;
    });

    for (const node of nodes) {
      for (const neighbor of nodes) {
        for (const nodePortal of node.portals) {
          if (nodePortal.destRoomIdx === neighbor.index) {
            if (!node.edges.includes(neighbor)) {
              node.edges.push(neighbor);
            }
          }
        }
      }
    }

    return nodes;
  }
}
