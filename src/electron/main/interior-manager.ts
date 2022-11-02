import { ipcMain, Event } from 'electron';

import { isErr, ok, unwrapResult } from '@/electron/common';

import { InteriorAPI } from '@/electron/common/types/interior';

import { forwardSerializedResult } from '@/electron/main/utils';

import { Interior } from './interior';
import { ProjectManager } from './project-manager';

export class InteriorManager {
  private projectManager: ProjectManager;

  constructor(projectManager: ProjectManager) {
    this.projectManager = projectManager;

    ipcMain.handle(InteriorAPI.GET_INTERIOR, (event: Event, identifier: string) =>
      forwardSerializedResult(this.getInterior(identifier)),
    );
  }

  public getInterior(identifier: string): Result<string, Interior> {
    const result = this.projectManager.getCurrentProject();

    if (isErr(result)) {
      return result;
    }

    const currentProject = unwrapResult(result);

    const interior = currentProject.interiors.find(interior => interior.identifier === identifier);

    return ok(interior);
  }
}
