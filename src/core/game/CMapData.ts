import type { XML } from '../types';

import { isXMLCMapData } from '../utils';

import { CEntityDef } from './CEntityDef';

type RawCMapData = XML.Ymap;

export class CMapData {
  public entitiesExtentsMin: Vector3;
  public entitiesExtentsMax: Vector3;
  public entities: CEntityDef[];

  constructor(raw: RawCMapData) {
    if (isXMLCMapData(raw)) {
      this.fromXMLCMapData(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMapData`);
  }

  private fromXMLCMapData(data: RawCMapData): void {
    if (!isXMLCMapData(data)) return;

    const entitiesExtentsMin = data.CMapData.entitiesExtentsMin.$;
    const entitiesExtentsMax = data.CMapData.entitiesExtentsMin.$;
    const entityOrEntities = data.CMapData.entities.Item;

    this.entitiesExtentsMin = {
      x: BigInt(entitiesExtentsMin.x),
      y: BigInt(entitiesExtentsMin.y),
      z: BigInt(entitiesExtentsMin.z),
    };

    this.entitiesExtentsMax = {
      x: BigInt(entitiesExtentsMax.x),
      y: BigInt(entitiesExtentsMax.y),
      z: BigInt(entitiesExtentsMax.z),
    };

    if (Array.isArray(entityOrEntities)) {
      this.entities = entityOrEntities.map(entity => new CEntityDef(entity));
    } else {
      this.entities = [new CEntityDef(entityOrEntities)];
    }
  }
}
