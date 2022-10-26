import { CMapData, CMapTypes, CMloInstanceDef } from '@/core/game';
import { naOcclusionInteriorMetadata } from '@/core/game/audio';
import { createNaOcclusionInteriorMetadata } from '@/core/';

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

  public naOcclusionInteriorMetadata: naOcclusionInteriorMetadata | undefined;

  constructor({ identifier, mapDataFilePath, mapTypesFilePath, mapData, mapTypes, mloInstance }: InteriorConstructor) {
    this.identifier = identifier;

    this.mapDataFilePath = mapDataFilePath;
    this.mapTypesFilePath = mapTypesFilePath;

    this.mapData = mapData;
    this.mapTypes = mapTypes;
    this.mloInstance = mloInstance;

    this.naOcclusionInteriorMetadata = createNaOcclusionInteriorMetadata(mloInstance);
  }

  public serialize(): SerializedInterior {
    const { identifier, mapDataFilePath, mapTypesFilePath, naOcclusionInteriorMetadata } = this;

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
        })),
      },
    };
  }
}
