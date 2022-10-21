import { ipcMain } from 'electron';

import { err, ok } from '@/electron/common';
import { ProjectAPI } from '@/electron/common/types/project';
import { isXMLFilePath, isMapDataFilePath, isMapTypesFilePath } from '@/electron/common/utils/files';

import { selectFiles } from './files';

const MAP_DATA_FILE_FILTERS = [{ name: '#map files', extensions: ['ymap.xml'] }];
const MAP_TYPES_FILE_FILTERS = [{ name: '#typ files', extensions: ['ytyp.xml'] }];

export class ProjectManager {
  constructor() {
    ipcMain.handle(ProjectAPI.SELECT_MAP_DATA_FILE, this.selectMapDataFile);
    ipcMain.handle(ProjectAPI.SELECT_MAP_TYPES_FILE, this.selectMapTypesFile);
  }

  public async selectMapDataFile(): Promise<Result<string, string>> {
    const filePaths = await selectFiles(MAP_DATA_FILE_FILTERS);

    const filteredPaths = filePaths.filter(isXMLFilePath);

    const mapDataFilePath = filteredPaths.find(isMapDataFilePath);

    if (!mapDataFilePath) {
      return err('INVALID_FILE');
    }

    return ok(mapDataFilePath);
  }

  public async selectMapTypesFile(): Promise<Result<string, string>> {
    const filePaths = await selectFiles(MAP_TYPES_FILE_FILTERS);

    const filteredPaths = filePaths.filter(isXMLFilePath);

    const mapTypesFilePath = filteredPaths.find(isMapTypesFilePath);

    if (!mapTypesFilePath) {
      return err('INVALID_FILE');
    }

    return ok(mapTypesFilePath);
  }
}
