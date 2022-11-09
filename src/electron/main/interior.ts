import { CMapData, CMapTypes, CMloInstanceDef } from '@/core/game';
import { naOcclusionInteriorMetadata } from '@/core/game/audio';
import { InteriorAudioGameData, InteriorRoomAudioGameData } from '@/core/game/audio';

import {
  createNaOcclusionInteriorMetadata,
  createInteriorAudioGameData,
  createInteriorRoomAudioGameDataList,
} from '@/core';

import { SerializedInterior } from '@/electron/common/types/interior';

type InteriorConstructor = {
  identifier: string;
  path: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
  mapData: CMapData;
  mapTypes: CMapTypes;
  mloInstance: CMloInstanceDef;
};

export class Interior {
  public identifier: string;
  public path: string;

  public mapDataFilePath: string;
  public mapTypesFilePath: string;

  public mapData: CMapData;
  public mapTypes: CMapTypes;
  public mloInstance: CMloInstanceDef;

  public naOcclusionInteriorMetadata: naOcclusionInteriorMetadata;
  public interiorAudioGameData: InteriorAudioGameData;
  public interiorRoomAudioGameDataList: InteriorRoomAudioGameData[];

  public naOcclusionInteriorMetadataPath: string;
  public audioGameDataPath: string;

  constructor({
    identifier,
    path,
    mapDataFilePath,
    mapTypesFilePath,
    mapData,
    mapTypes,
    mloInstance,
  }: InteriorConstructor) {
    this.identifier = identifier;

    this.path = path;

    this.mapDataFilePath = mapDataFilePath;
    this.mapTypesFilePath = mapTypesFilePath;

    this.mapData = mapData;
    this.mapTypes = mapTypes;
    this.mloInstance = mloInstance;

    this.naOcclusionInteriorMetadata = createNaOcclusionInteriorMetadata(mloInstance);
    this.interiorAudioGameData = createInteriorAudioGameData(mloInstance);
    this.interiorRoomAudioGameDataList = createInteriorRoomAudioGameDataList(mloInstance);

    this.naOcclusionInteriorMetadataPath = undefined;
    this.audioGameDataPath = undefined;
  }

  public serialize(): SerializedInterior {
    const {
      identifier,
      path,
      mapDataFilePath,
      mapTypesFilePath,
      naOcclusionInteriorMetadata,
      interiorAudioGameData,
      interiorRoomAudioGameDataList,
      naOcclusionInteriorMetadataPath,
      audioGameDataPath,
    } = this;

    const { interiorProxyHash, portalInfoList } = naOcclusionInteriorMetadata;

    return {
      identifier,
      path,
      mapDataFilePath,
      mapTypesFilePath,
      naOcclusionInteriorMetadata: {
        interiorProxyHash,
        portalInfoList: portalInfoList.map(portalInfo => ({
          interiorProxyHash: portalInfo.interiorProxyHash,
          roomIdx: portalInfo.roomIdx,
          destInteriorHash: portalInfo.destInteriorHash,
          destRoomIdx: portalInfo.destRoomIdx,
          portalEntityList: portalInfo.portalEntityList.map(portalEntity => ({
            entityModelName: portalEntity.entity.archetypeName,
            entityModelHashKey: portalEntity.entityModelHashKey,
            linkType: portalEntity.linkType,
            maxOcclusion: portalEntity.maxOcclusion,
            isDoor: portalEntity.isDoor,
            isGlass: portalEntity.isGlass,
          })),
        })),
      },
      interiorAudioGameData,
      interiorRoomAudioGameDataList,
      naOcclusionInteriorMetadataPath,
      audioGameDataPath,
    };
  }
}
