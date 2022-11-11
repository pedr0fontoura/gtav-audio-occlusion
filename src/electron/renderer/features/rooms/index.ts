import { SerializedInteriorRoomAudioGameData } from '@/electron/common/types/audioGameData';
import { InteriorAPI } from '@/electron/common/types/interior';

export * from './components/Rooms';

const { API } = window;

export const updateInteriorRoomAudioGameData = async (
  identifier: string,
  roomIndex: number,
  data: Partial<SerializedInteriorRoomAudioGameData>,
): Promise<void> => {
  console.log(`Updated InteriorRoomAudioGameData ${roomIndex}: `, data);

  API.send(InteriorAPI.UPDATE_INTERIOR_ROOM_AUDIO_GAME_DATA, identifier, roomIndex, data);
};
