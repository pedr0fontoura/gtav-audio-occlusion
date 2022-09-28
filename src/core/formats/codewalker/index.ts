import fs from 'fs/promises';
import { Parser, Builder } from 'xml2js';

import type { XML } from '../../types';

import {
  CMapData,
  CEntityDef,
  CArchetypeDef,
  CMloArchetypeDef,
  CBaseArchetypeDef,
  CMapTypes,
  CMloRoomDef,
  CMloPortalDef,
} from '../../game';

import {
  isXMLCEntityDef,
  isXMLCMapData,
  isXMLCArchetypeDef,
  isXMLCMloRoomDef,
  isXMLCMloArchetypeDef,
  isXMLCMapTypes,
  isXMLCMloPortalDef,
} from './typeGuards';

export class CodeWalker {
  private parser: Parser;
  private builder: Builder;

  constructor() {
    this.parser = new Parser({ explicitArray: false });
    this.builder = new Builder({ headless: true });
  }

  public async readFile<T>(filePath: string): Promise<T> {
    if (!filePath.includes('.xml')) {
      throw new Error('File is not a xml file');
    }

    let rawData: Buffer;

    try {
      rawData = await fs.readFile(filePath);
    } catch {
      throw new Error('Error reading xml file');
    }

    const parsedXML: T = await this.parser.parseStringPromise(rawData);

    return parsedXML;
  }

  public parseCEntityDef(data: XML.CEntityDef): CEntityDef {
    if (!isXMLCEntityDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's CEntityDef`);
    }

    const type = data.$.type;
    const archetypeName = data.archetypeName;
    const position = {
      x: Number(data.position.$.x),
      y: Number(data.position.$.y),
      z: Number(data.position.$.z),
    };

    return new CEntityDef({ type, archetypeName, position });
  }

  public parseCMapData(data: XML.Ymap): CMapData {
    if (!isXMLCMapData(data)) {
      throw new Error(`Couldn't parse CodeWalker's CMapData`);
    }

    const entitiesExtentsMin = {
      x: Number(data.CMapData.entitiesExtentsMin.$.x),
      y: Number(data.CMapData.entitiesExtentsMin.$.y),
      z: Number(data.CMapData.entitiesExtentsMin.$.z),
    };

    const entitiesExtentsMax = {
      x: Number(data.CMapData.entitiesExtentsMin.$.x),
      y: Number(data.CMapData.entitiesExtentsMin.$.y),
      z: Number(data.CMapData.entitiesExtentsMin.$.z),
    };

    let entities: CEntityDef[];

    if (Array.isArray(data.CMapData.entities.Item)) {
      entities = data.CMapData.entities.Item.map(entity => this.parseCEntityDef(entity));
    } else {
      entities = [this.parseCEntityDef(data.CMapData.entities.Item)];
    }

    return new CMapData({
      entitiesExtentsMin,
      entitiesExtentsMax,
      entities,
    });
  }

  public parseCBaseArchetypeDef(data: XML.Archetype): CBaseArchetypeDef {
    if (!isXMLCArchetypeDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's CBaseArchetypeDef`);
    }

    const type = data.$.type;
    const name = data.name;

    return new CBaseArchetypeDef({ type, name });
  }

  public parseCMloRoomDef(interior: CMloArchetypeDef, data: XML.CMloRoomDef): CMloRoomDef {
    if (!isXMLCMloRoomDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's CMloRoomDef`);
    }

    const name = data.name;
    const portalCount = Number(data.portalCount.$.value);

    return new CMloRoomDef({ interior, name, portalCount });
  }

  public parseCMloPortalDef(interior: CMloArchetypeDef, data: XML.CMloPortalDef): CMloPortalDef {
    if (!isXMLCMloPortalDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's CMloPortalDef`);
    }

    const roomFrom = Number(data.roomFrom.$.value);
    const roomTo = Number(data.roomTo.$.value);
    const flags = Number(data.flags.$.value);
    const attachedEntities = data.attachedObjects
      .split(/\s/)
      .filter(entity => !!entity)
      .map(entity => Number(entity));

    return new CMloPortalDef({ interior, roomFrom, roomTo, flags, attachedEntities });
  }

  public parseCMloArchetypeDef(data: XML.Archetype): CMloArchetypeDef {
    if (!isXMLCMloArchetypeDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's CMloArchetypeDef`);
    }

    const type = data.$.type;
    const name = data.name;

    const archetype = new CMloArchetypeDef({ type, name });

    const entityOrEntities = data.entities.Item;
    const roomOrRooms = data.rooms.Item;
    const portalOrPortals = data.portals.Item;

    if (Array.isArray(entityOrEntities)) {
      archetype.entities = entityOrEntities.map(entity => this.parseCEntityDef(entity));
    } else {
      archetype.entities = [this.parseCEntityDef(entityOrEntities)];
    }

    if (Array.isArray(roomOrRooms)) {
      archetype.rooms = roomOrRooms.map(room => this.parseCMloRoomDef(archetype, room));
    } else {
      archetype.rooms = [this.parseCMloRoomDef(archetype, roomOrRooms)];
    }

    if (Array.isArray(portalOrPortals)) {
      archetype.portals = portalOrPortals.map(portal => this.parseCMloPortalDef(archetype, portal));
    } else {
      archetype.portals = [this.parseCMloPortalDef(archetype, portalOrPortals)];
    }

    return archetype;
  }

  public parseCArchetypeDef(data: XML.Archetype): CArchetypeDef {
    if (!isXMLCArchetypeDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's Archetype`);
    }

    if (isXMLCMloArchetypeDef(data)) {
      return this.parseCMloArchetypeDef(data);
    }

    return this.parseCBaseArchetypeDef(data);
  }

  public parseCMapTypesArchetypes(data: XML.Archetype[]): CArchetypeDef[] {
    return data.filter(archetype => isXMLCArchetypeDef(archetype)).map(archetype => this.parseCArchetypeDef(archetype));
  }

  public parseCMapTypes(data: XML.Ytyp): CMapTypes {
    if (!isXMLCMapTypes(data)) {
      throw new Error(`Couldn't parse CodeWalker's CMapTypes`);
    }

    let archetypes: CArchetypeDef[];

    if (Array.isArray(data.CMapTypes.archetypes.Item)) {
      archetypes = this.parseCMapTypesArchetypes(data.CMapTypes.archetypes.Item);
    } else {
      archetypes = [this.parseCArchetypeDef(data.CMapTypes.archetypes.Item)];
    }

    return new CMapTypes({ archetypes });
  }

  public async writeFile(filePath: string, data: any): Promise<void> {
    if (!filePath.includes('.xml')) {
      throw new Error('Can only write xml files');
    }

    const XMLHeader = `<?xml version="1.0" encoding="UTF-8"?>\r\n`;

    const XML = this.builder.buildObject(data);

    await fs.writeFile(filePath, XMLHeader + XML);
  }
}
