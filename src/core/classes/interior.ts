import { CMloArchetypeDef } from '../files/codewalker/ytyp';
import { CMapData } from '../files/codewalker/ymap';

export interface Entity {
  hash: number;
  isDoor: boolean;
  isGlass: boolean;
}

export interface Room {
  index: number;
  name: string;
  portalCount: number;
}

export interface Portal {
  index: number;
  from: number;
  to: number;
  attachedObjects: Entity[];
}

export default class Interior {
  public cMapData: CMapData;
  public cMloArchetypeDef: CMloArchetypeDef;

  public name: string;

  public position: Vector3;

  public entitiesExtentsMin: Vector3;
  public entitiesExtentsMax: Vector3;

  public entities: Entity[];
  public rooms: Room[];
  public portals: Portal[];

  constructor(cMapData: CMapData, cMloArchetypeDef: CMloArchetypeDef) {
    this.cMapData = cMapData;
    this.cMloArchetypeDef = cMloArchetypeDef;

    if (this.cMapData.archetypeName.includes('hash_')) {
      const extensionIndex = this.cMloArchetypeDef.fileName.indexOf('.ytyp');
      this.name = this.cMloArchetypeDef.fileName.substring(0, extensionIndex);
    } else {
      this.name = cMapData.archetypeName;
    }

    this.position = this.cMapData.position;

    this.entitiesExtentsMin = this.cMapData.entitiesExtentsMin;
    this.entitiesExtentsMax = this.cMapData.entitiesExtentsMax;

    this.entities = this.cMloArchetypeDef.entities;
    this.rooms = this.cMloArchetypeDef.rooms;
    this.portals = this.cMloArchetypeDef.portals;
  }

  public getRoomPortals(room: number): Portal[] {
    const filteredPortals = this.portals.filter(portal => portal.from === room || portal.to === room);

    return filteredPortals.map(portal => {
      if (portal.to === room) {
        const reversePortal = {
          ...portal,
          from: portal.to,
          to: portal.from,
        };

        return reversePortal;
      }

      return portal;
    });
  }
}