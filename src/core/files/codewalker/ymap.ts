import { isCMloInstanceDef } from '../../utils';

import * as XML from '../../types/xml';
import Big from 'big.js';

export class CMapData {
  public entitiesExtentsMin: Vector3;
  public entitiesExtentsMax: Vector3;

  public archetypeName: string;
  public position: Vector3;

  public fileName: string;

  constructor(rawData: XML.Ymap, fileName: string) {
    this.entitiesExtentsMin = this.getEntitiesExtentsMin(rawData);
    this.entitiesExtentsMax = this.getEntitiesExtentsMax(rawData);

    let rawMloInstance: XML.CMloInstanceDef;

    const entitiesItem = rawData.CMapData.entities.Item;

    if (Array.isArray(entitiesItem)) {
      rawMloInstance = entitiesItem.find(isCMloInstanceDef);
    } else {
      if (isCMloInstanceDef(entitiesItem)) {
        rawMloInstance = entitiesItem;
      } else {
        throw new Error('No CMloInstanceDef found in the .ymap file');
      }
    }

    this.archetypeName = this.getArchetypeName(rawMloInstance);
    this.position = this.getPosition(rawMloInstance);

    this.fileName = fileName;
  }

  private getEntitiesExtentsMin(rawData: XML.Ymap): Vector3 {
    const pos = rawData.CMapData.entitiesExtentsMin.$;

    return {
      x: new Big(pos.x),
      y: new Big(pos.y),
      z: new Big(pos.z),
    };
  }

  private getEntitiesExtentsMax(rawData: XML.Ymap): Vector3 {
    const pos = rawData.CMapData.entitiesExtentsMax.$;

    return {
      x: new Big(pos.x),
      y: new Big(pos.y),
      z: new Big(pos.z),
    };
  }

  private getArchetypeName(mloInstance: XML.CMloInstanceDef): string {
    return mloInstance.archetypeName;
  }

  private getPosition(mloInstance: XML.CMloInstanceDef): Vector3 {
    const pos = mloInstance.position.$;

    return {
      x: new Big(pos.x),
      y: new Big(pos.y),
      z: new Big(pos.z),
    };
  }
}
