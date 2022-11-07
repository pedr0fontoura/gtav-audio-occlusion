import { SerializedNaOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';
import { SerializedInteriorAudioGameData, SerializedInteriorRoomAudioGameData } from './audioGameData';

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
  interiorAudioGameData: SerializedInteriorAudioGameData;
  interiorRoomAudioGameDataList: SerializedInteriorRoomAudioGameData[];
};

export enum InteriorAPI {
  GET_INTERIOR = 'interior/get',
  UPDATE_PORTAL_INFO_ENTITY = 'interior/updatePortalInfoEntity',
}
