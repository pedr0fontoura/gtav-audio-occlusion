import { InteriorAudioGameData } from './InteriorAudioGameData';
import { InteriorRoomAudioGameData } from './InteriorRoomAudioGameData';

export * from './InteriorAudioGameData';
export * from './InteriorRoomAudioGameData';

export type AudioGameData = Array<InteriorAudioGameData | InteriorRoomAudioGameData>;
