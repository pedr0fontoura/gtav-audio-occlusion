import { SerializedNaOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';

export type CreateInteriorDTO = {
  name: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
};

export type SerializedInterior = {
  identifier: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
  naOcclusionInteriorMetadata: SerializedNaOcclusionInteriorMetadata;
};

export enum InteriorAPI {
  GET_INTERIOR = 'interior/get',
}
