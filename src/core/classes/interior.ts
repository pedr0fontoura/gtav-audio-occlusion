import { CMloArchetypeDef } from '../files/codewalker/ytyp';
import { CMapData } from '../files/codewalker/ymap';

export interface Entity {
  name: string;
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
  flags: number;
}

export default class Interior {
  public cMapData: CMapData;
  public cMloArchetypeDef: CMloArchetypeDef;

  public name: string;
  public isNameHashed: boolean;

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
      this.isNameHashed = true;

      console.warn('Please provide an .ymap with the unhashed CMloInstanceDef name to enable .dat files generation');
    } else {
      this.isNameHashed = false;
    }

    this.name = cMapData.archetypeName;

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
