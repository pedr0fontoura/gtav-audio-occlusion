import { CMapData, CMapTypes, CMloInstanceDef } from '@/core/game';
import { naOcclusionInteriorMetadata } from '@/core/game/audio';

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

  public audioOcclusion: naOcclusionInteriorMetadata | undefined;

  constructor({ identifier, mapDataFilePath, mapTypesFilePath, mapData, mapTypes, mloInstance }: InteriorConstructor) {
    this.identifier = identifier;
    this.mapDataFilePath = mapDataFilePath;
    this.mapTypesFilePath = mapTypesFilePath;
    this.mapData = mapData;
    this.mapTypes = mapTypes;
    this.mloInstance = mloInstance;
  }

  public serialize(): SerializedInterior {
    return {
      identifier: this.identifier,
      mapDataFilePath: this.mapDataFilePath,
      mapTypesFilePath: this.mapTypesFilePath,
    };
  }
}
