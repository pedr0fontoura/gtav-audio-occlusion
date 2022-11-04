import { CMloInstanceDef } from './game';
import { naOcclusionInteriorMetadata } from './game/audio';
import { InteriorAudioGameData } from './game/audio/InteriorAudioGameData';
import { InteriorRoomAudioGameData } from './game/audio/InteriorRoomAudioGameData';

export const createNaOcclusionInteriorMetadata = (interior: CMloInstanceDef): naOcclusionInteriorMetadata => {
  return new naOcclusionInteriorMetadata({ interior });
};

export const createInteriorAudioGameData = (interior: CMloInstanceDef): InteriorAudioGameData => {
  return new InteriorAudioGameData(interior.archetype);
};

export const createInteriorRoomsAudioGameData = (interior: CMloInstanceDef): InteriorRoomAudioGameData[] => {
  const { archetype } = interior;

  return archetype.rooms.map(room => new InteriorRoomAudioGameData(archetype, room));
};
