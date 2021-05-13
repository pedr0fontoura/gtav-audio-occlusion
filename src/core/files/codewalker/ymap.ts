import * as XML from '../../types/xml';

export class CMapData {
  public entitiesExtentsMin: Vector3;
  public entitiesExtentsMax: Vector3;

  public archetypeName: string;
  public position: Vector3;

  public fileName: string;

  constructor(rawData: XML.Ymap, fileName: string) {
    const rawMloInstance = rawData.CMapData.entities.Item;

    this.entitiesExtentsMin = this.getEntitiesExtentsMin(rawData);
    this.entitiesExtentsMax = this.getEntitiesExtentsMax(rawData);

    this.archetypeName = this.getArchetypeName(rawMloInstance);
    this.position = this.getPosition(rawMloInstance);

    this.fileName = fileName;
  }

  private getEntitiesExtentsMin(rawData: XML.Ymap): Vector3 {
    const pos = rawData.CMapData.entitiesExtentsMin.$;

    return {
      x: parseFloat(pos.x),
      y: parseFloat(pos.y),
      z: parseFloat(pos.z),
    };
  }

  private getEntitiesExtentsMax(rawData: XML.Ymap): Vector3 {
    const pos = rawData.CMapData.entitiesExtentsMax.$;

    return {
      x: parseFloat(pos.x),
      y: parseFloat(pos.y),
      z: parseFloat(pos.z),
    };
  }

  private getArchetypeName(mloInstance: XML.CMloInstanceDef): string {
    return mloInstance.archetypeName;
  }

  private getPosition(mloInstance: XML.CMloInstanceDef): Vector3 {
    const pos = mloInstance.position.$;

    return {
      x: parseFloat(pos.x),
      y: parseFloat(pos.y),
      z: parseFloat(pos.z),
    };
  }
}
