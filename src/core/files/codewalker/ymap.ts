import * as XML from '../../types/xml';

export class CMapData {
  public archetypeName: string;
  public position: Vector3;

  constructor(rawData: XML.Ymap) {
    const rawMloInstance = rawData.CMapData.entities.Item;

    this.archetypeName = this.extractArchetypeName(rawMloInstance);
    this.position = this.extractPosition(rawMloInstance);
  }

  private extractArchetypeName(mloInstance: XML.CMloInstanceDef): string {
    return mloInstance.archetypeName;
  }

  private extractPosition(mloInstance: XML.CMloInstanceDef): Vector3 {
    const pos = mloInstance.position.$;

    return {
      x: parseFloat(pos.x),
      y: parseFloat(pos.y),
      z: parseFloat(pos.z),
    };
  }
}
