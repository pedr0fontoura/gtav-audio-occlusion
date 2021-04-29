import fs from 'fs/promises';
import { Parser } from 'xml2js';

import { convertToInt32, joaat } from './utils';

import { YtypXML, CMloArchetypeDef, MloEntity, MloRoom, MloPortal } from './types/ytyp';

export class Mlo {
  private rawData: YtypXML;
  private rawArchetype: CMloArchetypeDef; 

  private _entities: MloEntity[];
  private _rooms: MloRoom[];
  private _portals: MloPortal[];

  constructor(data: YtypXML) {
    this.rawData = data;

    // Interior archeType is the last one on the list
    const archetypesLength = this.rawData.CMapTypes.archetypes.Item.length;

    this.rawArchetype = this.rawData.CMapTypes.archetypes.Item[archetypesLength - 1];
  }

  public get entities(): MloEntity[] {
    if (this._entities) return this._entities;

    this._entities = this.rawArchetype.entities.Item.map(rawMloEntity => {
      let hash: number;

      if (rawMloEntity.archetypeName.startsWith('hash_')) {
        const [, hexString] = rawMloEntity.archetypeName.split('_');
  
        hash = parseInt(hexString, 16);
      } else {
        hash = joaat(rawMloEntity.archetypeName);
      }

      return {
        hash: convertToInt32(hash),
      };
    });

    return this._entities;
  }

  public get rooms(): MloRoom[] {
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

  public get portals(): MloPortal[] {
    if (this._portals) return this._portals;

    this._portals = this.rawArchetype.portals.Item.map((rawMloPortal, index) => {
      const from = parseInt(rawMloPortal.roomFrom.$.value);
      const to = parseInt(rawMloPortal.roomTo.$.value);
      const attachedObjects = rawMloPortal.attachedObjects
        .split(' ')
        .filter(entity => !!entity)
        .map(entityIdx => {
          const parsedEntityIdx = parseInt(entityIdx);

          return this.entities[parsedEntityIdx].hash;
        });

      return {
        index,
        from,
        to,
        attachedObjects,
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