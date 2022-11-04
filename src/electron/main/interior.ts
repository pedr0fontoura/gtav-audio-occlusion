import { CMapData, CMapTypes, CMloInstanceDef } from '@/core/game';
import { naOcclusionInteriorMetadata } from '@/core/game/audio';
import { InteriorAudioGameData } from '@/core/game/audio/InteriorAudioGameData';
import { InteriorRoomAudioGameData } from '@/core/game/audio/InteriorRoomAudioGameData';

import {
  createNaOcclusionInteriorMetadata,
  createInteriorAudioGameData,
  createInteriorRoomAudioGameDataList,
} from '@/core';

import { SerializedInterior } from '@/electron/common/types/interior';

type InteriorConstructor = {
  identifier: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
  mapData: CMapData;
  mapTypes: CMapTypes;
  mloInstance: CMloInstanceDef;
};

export class Interior {
  public identifier: string;

  public mapDataFilePath: string;
  public mapTypesFilePath: string;

  public mapData: CMapData;
  public mapTypes: CMapTypes;
  public mloInstance: CMloInstanceDef;

  public naOcclusionInteriorMetadata: naOcclusionInteriorMetadata;
  public interiorAudioGameData: InteriorAudioGameData;
  public interiorRoomAudioGameDataList: InteriorRoomAudioGameData[];

  constructor({ identifier, mapDataFilePath, mapTypesFilePath, mapData, mapTypes, mloInstance }: InteriorConstructor) {
    this.identifier = identifier;

    this.mapDataFilePath = mapDataFilePath;
    this.mapTypesFilePath = mapTypesFilePath;

    this.mapData = mapData;
    this.mapTypes = mapTypes;
    this.mloInstance = mloInstance;

    this.naOcclusionInteriorMetadata = createNaOcclusionInteriorMetadata(mloInstance);
    this.interiorAudioGameData = createInteriorAudioGameData(mloInstance);
    this.interiorRoomAudioGameDataList = createInteriorRoomAudioGameDataList(mloInstance);
  }

  public serialize(): SerializedInterior {
    const {
      identifier,
      mapDataFilePath,
      mapTypesFilePath,
      naOcclusionInteriorMetadata,
      interiorAudioGameData,
      interiorRoomAudioGameDataList,
    } = this;

    const { interiorProxyHash, portalInfoList } = naOcclusionInteriorMetadata;

    return {
      identifier,
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
    };
  }
}
