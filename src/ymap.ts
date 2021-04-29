import fs from 'fs/promises';
import { Parser } from 'xml2js';

import { Vector3 } from './types';
import { YmapXML, CMloInstanceDef } from './types/ymap';

export class MapData {
  public archetypeName: string;
  public position: Vector3;

  constructor(rawData: YmapXML) {
    const rawMloInstance = rawData.CMapData.entities.Item;

    this.archetypeName = this.extractArchetypeName(rawMloInstance);
    this.position = this.extractPosition(rawMloInstance);
  }

  private extractArchetypeName(mloInstance: CMloInstanceDef): string {
    return mloInstance.archetypeName;
  }

  private extractPosition(mloInstance: CMloInstanceDef): Vector3 {
    const pos = mloInstance.position.$;

    return {
      x: parseFloat(pos.x),
      y: parseFloat(pos.y),
      z: parseFloat(pos.z),
    };
  }
}

export class YmapLoader {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({ explicitArray: false });
  }

  public async parseXML(filePath: string): Promise<YmapXML> {
    let rawData: Buffer;

    try {
      rawData = await fs.readFile(filePath);
    } catch (err) {
      throw new Error('Error reading file');
    }

    const parsedXML: YmapXML = await this.parser.parseStringPromise(rawData);

    return parsedXML;
  }
}
