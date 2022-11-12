import { ipcMain, Event } from 'electron';

import { isErr, ok, unwrapResult } from '@/electron/common';

import { InteriorAPI } from '@/electron/common/types/interior';
import { SerializedNaOcclusionPortalEntityMetadata } from '@/electron/common/types/naOcclusionInteriorMetadata';
import { SerializedInteriorAudioGameData } from '@/electron/common/types/audioGameData';

import { forwardSerializedResult } from '@/electron/main/utils';

import { Application } from './app';

import { Interior } from './interior';

export class InteriorManager {
  private application: Application;

  constructor(application: Application) {
    this.application = application;

    ipcMain.handle(InteriorAPI.GET_INTERIOR, (event: Event, identifier: string) =>
      forwardSerializedResult(this.getInterior(identifier)),
    );
    ipcMain.on(
      InteriorAPI.UPDATE_PORTAL_INFO_ENTITY,
      (
        event: Event,
        identifier: string,
        portalInfoIndex: number,
        entityIndex: number,
        data: Partial<SerializedNaOcclusionPortalEntityMetadata>,
      ) => this.updatePortalEntity(identifier, portalInfoIndex, entityIndex, data),
    );
    ipcMain.on(
      InteriorAPI.UPDATE_INTERIOR_ROOM_AUDIO_GAME_DATA,
      (event: Event, identifier: string, roomIndex: number, data: Partial<SerializedInteriorAudioGameData>) =>
        this.updateInteriorRoomAudioGameData(identifier, roomIndex, data),
    );
  }

  public getInterior(identifier: string): Result<string, Interior> {
    const result = this.application.projectManager.getCurrentProject();

    if (isErr(result)) {
      return result;
    }

    const currentProject = unwrapResult(result);

    const interior = currentProject.interiors.find(interior => interior.identifier === identifier);

    return ok(interior ?? null);
  }

  public updatePortalEntity(
    identifier: string,
    portalInfoIndex: number,
    entityIndex: number,
    data: Partial<SerializedNaOcclusionPortalEntityMetadata>,
  ): void {
    const result = this.getInterior(identifier);
    if (isErr(result)) return;

    const interior = unwrapResult(result);
    if (!interior) return;

    const { naOcclusionInteriorMetadata } = interior;

    const portalInfo = naOcclusionInteriorMetadata.portalInfoList[portalInfoIndex];
    if (!portalInfo) return;

    const portalEntity = portalInfo.portalEntityList[entityIndex];

    Object.assign(portalEntity, data);
  }

  public updateInteriorRoomAudioGameData(
    identifier: string,
    roomIndex: number,
    data: Partial<SerializedInteriorAudioGameData>,
  ): void {
    const result = this.getInterior(identifier);
    if (isErr(result)) return;

    const interior = unwrapResult(result);
    if (!interior) return;

    const { interiorRoomAudioGameDataList } = interior;

    const interiorRoomAudioGameData = interiorRoomAudioGameDataList[roomIndex];
    if (!interiorRoomAudioGameData) return;

    Object.assign(interiorRoomAudioGameData, data);
  }
}
