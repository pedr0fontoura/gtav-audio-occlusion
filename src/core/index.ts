import { CMloInstanceDef } from './game';
import { naOcclusionInteriorMetadata, InteriorAudioGameData, InteriorRoomAudioGameData } from './game/audio';

export const createNaOcclusionInteriorMetadata = (interior: CMloInstanceDef): naOcclusionInteriorMetadata => {
  return new naOcclusionInteriorMetadata({ interior });
};

export const createInteriorAudioGameData = (interior: CMloInstanceDef): InteriorAudioGameData => {
  return new InteriorAudioGameData(interior.archetype);
};

export const createInteriorRoomAudioGameDataList = (interior: CMloInstanceDef): InteriorRoomAudioGameData[] => {
  const { archetype } = interior;

  return archetype.rooms.map(room => new InteriorRoomAudioGameData(archetype, room));
};
