import fs from 'fs/promises';
import { Parser } from 'xml2js';

import { Vector3 } from './types';
import { YmapXML, CMloInstanceDef } from './types/ymap';

export class MapData {
  private rawData: YmapXML;
  private rawMlo: CMloInstanceDef;

  private _archetypeName: string;
  private _position: Vector3;


  constructor(data: YmapXML) {
    this.rawData = data;

    this.rawMlo = this.rawData.CMapData.entities.Item;
  }

  public get archetypeName(): string {
    if (this._archetypeName) return this._archetypeName;

    this._archetypeName = this.rawMlo.archetypeName;

    return this._archetypeName;
  }

  public get position(): Vector3 {
    if (this._position) return this._position;

    const pos = this.rawMlo.position.$;

    this._position = {
      x: parseFloat(pos.x),
      y: parseFloat(pos.y),
      z: parseFloat(pos.z),
    };

    return this._position;
  }
};

export class YmapLoader {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({ explicitArray: false });
  }

  public async parseXML(filePath: string): Promise<YmapXML> {
    let rawData: Buffer;

    try {
      rawData = await fs.readFile(filePath);
    } catch(err) {
      throw new Error('Error reading file');
    }

    const parsedXML: YmapXML = await this.parser.parseStringPromise(rawData);

    return parsedXML;
  }
}