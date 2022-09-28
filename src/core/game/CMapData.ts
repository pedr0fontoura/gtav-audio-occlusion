import { CEntityDef } from './CEntityDef';

type CMapDataConstructor = {
  entitiesExtentsMin: Vector3;
  entitiesExtentsMax: Vector3;
  entities: CEntityDef[];
};

export class CMapData {
  public entitiesExtentsMin: Vector3;
  public entitiesExtentsMax: Vector3;
  public entities: CEntityDef[];

  constructor({ entitiesExtentsMin, entitiesExtentsMax, entities }: CMapDataConstructor) {
    this.entitiesExtentsMin = entitiesExtentsMin;
    this.entitiesExtentsMax = entitiesExtentsMax;
    this.entities = entities;
  }
}
