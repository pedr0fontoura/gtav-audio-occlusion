import fs from 'fs/promises';
import { Parser } from 'xml2js';

import { YtypXML, CMloArchetypeDef, MloRoom, MloPortal } from './types/ytyp';

export class Mlo {
  private rawData: YtypXML;
  private rawArchetype: CMloArchetypeDef; 
  
  private _rooms: MloRoom[];
  private _portals: MloPortal[];

  constructor(data: YtypXML) {
    this.rawData = data;

    // Interior archeType is the last one on the list
    const archetypesLength = this.rawData.CMapTypes.archetypes.Item.length;

    this.rawArchetype = this.rawData.CMapTypes.archetypes.Item[archetypesLength - 1];
  }

  public get rooms() {
    if (this._rooms) return this._rooms;

    this._rooms = this.rawArchetype.rooms.Item.map((rawMloRoom, index) => {
      const name = rawMloRoom.name;
      const portalCount = parseInt(rawMloRoom.portalCount.$.value);

      return {
        index,
        name,
        portalCount
      };
    });

    return this._rooms;
  }

  public get portals() {
    if (this._portals) return this._portals;

    this._portals = this.rawArchetype.portals.Item.map((rawMloPortal, index) => {
      const from = parseInt(rawMloPortal.roomFrom.$.value);
      const to = parseInt(rawMloPortal.roomTo.$.value);
      const attachedObjects = rawMloPortal.attachedObjects;

      return {
        index,
        from,
        to,
        attachedObjects
      };
    });

    return this._portals;
  }

  public getRoomPortals(room: number): MloPortal[] {
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

export class YtypLoader {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({ explicitArray: false });
  }

  public async parseXML(filePath: string): Promise<YtypXML> {
    let rawData: Buffer;

    try {
      rawData = await fs.readFile(filePath);
    } catch(err) {
      throw new Error('Error reading file');
    }

    const parsedXML: YtypXML = await this.parser.parseStringPromise(rawData);

    return parsedXML;
  }
}