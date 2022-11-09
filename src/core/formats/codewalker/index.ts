import path from 'path';
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
import { convertToInt32, parseHexToString, doesFileExist } from '../../utils';

import {
  naOcclusionInteriorMetadata,
  AudioGameData,
  InteriorAudioGameData,
  InteriorRoomAudioGameData,
  isInteriorAudioGameData,
  isInteriorRoomAudioGameData,
} from '../../game/audio';

import {
  isXMLCEntityDef,
  isXMLCMapData,
  isXMLCArchetypeDef,
  isXMLCMloRoomDef,
  isXMLCMloArchetypeDef,
  isXMLCMapTypes,
  isXMLCMloPortalDef,
} from './typeGuards';

export * from './typeGuards';

export class CodeWalkerFormat {
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

  public parseCMloRoomDef(data: XML.CMloRoomDef): CMloRoomDef {
    if (!isXMLCMloRoomDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's CMloRoomDef`);
    }

    const name = data.name;
    const portalCount = Number(data.portalCount.$.value);

    return new CMloRoomDef({ name, portalCount });
  }

  public parseCMloPortalDef(data: XML.CMloPortalDef): CMloPortalDef {
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

    return new CMloPortalDef({ roomFrom, roomTo, flags, attachedEntities });
  }

  public parseCMloArchetypeDef(data: XML.Archetype): CMloArchetypeDef {
    if (!isXMLCMloArchetypeDef(data)) {
      throw new Error(`Couldn't parse CodeWalker's CMloArchetypeDef`);
    }

    const type = data.$.type;
    const name = data.name;

    const entityOrEntities = data.entities.Item;
    const roomOrRooms = data.rooms.Item;
    const portalOrPortals = data.portals.Item;

    let entities: CEntityDef[];
    let rooms: CMloRoomDef[];
    let portals: CMloPortalDef[];

    if (Array.isArray(entityOrEntities)) {
      entities = entityOrEntities.map(entity => this.parseCEntityDef(entity));
    } else {
      entities = [this.parseCEntityDef(entityOrEntities)];
    }

    if (Array.isArray(roomOrRooms)) {
      rooms = roomOrRooms.map(room => this.parseCMloRoomDef(room));
    } else {
      rooms = [this.parseCMloRoomDef(roomOrRooms)];
    }

    if (Array.isArray(portalOrPortals)) {
      portals = portalOrPortals.map(portal => this.parseCMloPortalDef(portal));
    } else {
      portals = [this.parseCMloPortalDef(portalOrPortals)];
    }

    return new CMloArchetypeDef({ type, name, entities, rooms, portals });
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

  private async writeFile(filePath: string, data: any): Promise<void> {
    if (!filePath.includes('.xml')) {
      throw new Error('Can only write xml files');
    }

    const XMLHeader = `<?xml version="1.0" encoding="UTF-8"?>\r\n`;

    const XML = this.builder.buildObject(data);

    const directory = path.resolve(filePath, '..');

    const doesDirectoryExists = await doesFileExist(directory);

    if (!doesDirectoryExists) {
      await fs.mkdir(directory);
    }

    await fs.writeFile(filePath, XMLHeader + XML);
  }

  public async writeNaOcclusionInteriorMetadata(
    targetPath: string,
    interiorMetadata: naOcclusionInteriorMetadata,
  ): Promise<string> {
    const { portalInfoList, pathNodeList, interiorProxyHash } = interiorMetadata;

    const portalInfoListObject: XML.PortalInfo[] = portalInfoList.map(portalInfo => {
      const { portalEntityList } = portalInfo;

      const portalEntityListObject = portalEntityList.map(portalEntity => ({
        LinkType: {
          $: { value: portalEntity.linkType },
        },
        MaxOcclusion: {
          $: { value: portalEntity.maxOcclusion },
        },
        EntityModelHashkey: {
          $: { value: convertToInt32(portalEntity.entityModelHashKey) },
        },
        IsDoor: {
          $: { value: portalEntity.isDoor },
        },
        IsGlass: {
          $: { value: portalEntity.isGlass },
        },
      }));

      return {
        InteriorProxyHash: {
          $: { value: convertToInt32(portalInfo.interiorProxyHash) },
        },
        PortalIdx: {
          $: { value: portalInfo.portalIdx },
        },
        RoomIdx: {
          $: { value: portalInfo.roomIdx },
        },
        DestInteriorHash: {
          $: { value: convertToInt32(portalInfo.destInteriorHash) },
        },
        DestRoomIdx: {
          $: { value: portalInfo.destRoomIdx },
        },
        PortalEntityList: {
          $: { itemType: 'naOcclusionPortalEntityMetadata' },
          Item: portalEntityListObject,
        },
      };
    });

    const pathNodeListObject: XML.PathNode[] = pathNodeList.map(pathNode => {
      const pathNodeChildListObject = {
        $: { itemType: 'naOcclusionPathNodeChildMetadata' },
        Item: pathNode.pathNodeChildList.map(pathNodeChild => {
          return {
            PathNodeKey: {
              $: {
                value: convertToInt32(pathNodeChild.pathNode.key),
              },
            },
            PortalInfoIdx: {
              $: {
                value: interiorMetadata.findPortalInfoIdx(pathNodeChild.portalInfo),
              },
            },
          };
        }),
      };

      return {
        Key: {
          $: {
            value: convertToInt32(pathNode.key),
          },
        },
        PathNodeChildList: pathNodeChildListObject,
      };
    });

    const naOcclusionInteriorMetadataObject: XML.AudioOcclusionInteriorMetadata = {
      naOcclusionInteriorMetadata: {
        PortalInfoList: {
          $: { itemType: 'naOcclusionPortalInfoMetadata' },
          Item: portalInfoListObject,
        },
        PathNodeList: {
          $: { itemType: 'naOcclusionPathNodeMetadata' },
          Item: pathNodeListObject,
        },
      },
    };

    const filePath = path.resolve(targetPath, `${interiorProxyHash}.ymt.pso.xml`);

    await this.writeFile(filePath, naOcclusionInteriorMetadataObject);

    return filePath;
  }

  private buildInteriorAudioGameData(interiorAudioGameData: InteriorAudioGameData): XML.InteriorAudioGameData {
    const { name, unk0, unk1, unk2, rooms } = interiorAudioGameData;

    return {
      $: { type: 'Interior', ntOffset: 0 },
      Name: name,
      Unk0: { $: { value: parseHexToString(unk0) } },
      Unk1: { $: { value: parseHexToString(unk1) } },
      Unk2: { $: { value: parseHexToString(unk2) } },
      Rooms: {
        Item: rooms,
      },
    };
  }

  private buildInteriorRoomAudioGameData(
    interiorRoomAudioGameData: InteriorRoomAudioGameData,
  ): XML.InteriorRoomAudioGameData {
    const {
      name,
      flags,
      mloRoom,
      zone,
      unk02,
      unk03,
      reverb,
      echo,
      sound,
      unk07,
      unk08,
      unk09,
      unk10,
      unk11,
      unk12,
      unk13,
      soundSet,
    } = interiorRoomAudioGameData;

    return {
      $: { type: 'InteriorRoom', ntOffset: 0 },
      Name: name,
      Flags0: { $: { value: parseHexToString(flags) } },
      MloRoom: mloRoom,
      Zone: zone,
      Unk02: { $: { value: unk02 } },
      Unk03: { $: { value: unk03 } },
      Reverb: { $: { value: reverb } },
      Echo: { $: { value: echo } },
      Sound: sound,
      Unk07: { $: { value: unk07 } },
      Unk08: { $: { value: unk08 } },
      Unk09: { $: { value: unk09 } },
      Unk10: { $: { value: unk10 } },
      Unk11: { $: { value: unk11 } },
      Unk12: { $: { value: unk12 } },
      Unk13: unk13,
      SoundSet: soundSet,
    };
  }

  private buildAudioGameData(audioGameData: AudioGameData): XML.AudioGameData {
    return audioGameData.map(data => {
      if (isInteriorAudioGameData(data)) {
        return this.buildInteriorAudioGameData(data);
      }

      if (isInteriorRoomAudioGameData(data)) {
        return this.buildInteriorRoomAudioGameData(data);
      }
    });
  }

  public async writeDat151(targetPath: string, audioGameData: AudioGameData): Promise<string> {
    const dat151Object: XML.Dat151File = {
      Dat151: {
        Version: { $: { value: '35636732' } },
        Items: {
          Item: this.buildAudioGameData(audioGameData),
        },
      },
    };

    const filePath = path.resolve(targetPath, 'game.dat151.rel.xml');

    await this.writeFile(filePath, dat151Object);

    return filePath;
  }
}
