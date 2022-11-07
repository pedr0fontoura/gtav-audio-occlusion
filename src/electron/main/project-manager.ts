import { ipcMain, Event } from 'electron';

import { err, isErr, ok } from '@/electron/common';

import { ProjectAPI } from '@/electron/common/types/project';
import type { CreateProjectDTO } from '@/electron/common/types/project';
import type { CreateInteriorDTO } from '@/electron/common/types/interior';

import { isXMLFilePath, isMapDataFilePath, isMapTypesFilePath } from '@/electron/common/utils/files';

import { Ymap, Ytyp } from '@/core/types/xml';
import { getCMloInstanceDef } from '@/core/game';

import { Project } from './project';

import { selectDirectory, selectFiles } from './files';
import { Interior } from './interior';
import { Application } from './app';
import { forwardSerializedResult } from './utils';

const MAP_DATA_FILE_FILTERS = [{ name: '#map files', extensions: ['ymap.xml'] }];
const MAP_TYPES_FILE_FILTERS = [{ name: '#typ files', extensions: ['ytyp.xml'] }];

export class ProjectManager {
  private application: Application;

  public currentProject: Project | null;

  constructor(application: Application) {
    this.application = application;

    this.currentProject = null;

    ipcMain.handle(ProjectAPI.CREATE_PROJECT, this.createProject.bind(this));
    ipcMain.handle(ProjectAPI.GET_CURRENT_PROJECT, () => forwardSerializedResult(this.getCurrentProject()));
    ipcMain.handle(ProjectAPI.CLOSE_PROJECT, this.closeProject.bind(this));
    ipcMain.handle(ProjectAPI.SELECT_PROJECT_PATH, this.selectProjectPath.bind(this));
    ipcMain.handle(ProjectAPI.SELECT_MAP_DATA_FILE, this.selectMapDataFile.bind(this));
    ipcMain.handle(ProjectAPI.SELECT_MAP_TYPES_FILE, this.selectMapTypesFile.bind(this));
  }

  public getCurrentProject(): Result<string, Project> {
    return ok(this.currentProject);
  }

  public async selectProjectPath(): Promise<Result<string, string>> {
    const [directoryPath] = await selectDirectory();

    return ok(directoryPath);
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

  public async addInteriorToProject(
    project: Project,
    { name, mapDataFilePath, mapTypesFilePath }: CreateInteriorDTO,
  ): Promise<Result<string, boolean>> {
    let mapDataFile: Ymap;
    let mapTypesFile: Ytyp;

    try {
      mapDataFile = await this.application.codeWalkerFormat.readFile<Ymap>(mapDataFilePath);
    } catch {
      return err('FAILED_READING_#MAP_FILE');
    }

    try {
      mapTypesFile = await this.application.codeWalkerFormat.readFile<Ytyp>(mapTypesFilePath);
    } catch {
      return err('FAILED_READING_#TYP_FILE');
    }

    const mapData = this.application.codeWalkerFormat.parseCMapData(mapDataFile);
    const mapTypes = this.application.codeWalkerFormat.parseCMapTypes(mapTypesFile);

    const mloInstance = getCMloInstanceDef(mapData, mapTypes);

    if (!mloInstance) {
      return err('C_MLO_INSTANCE_DEF_NOT_FOUND');
    }

    const interior = new Interior({
      identifier: name,
      mapDataFilePath,
      mapTypesFilePath,
      mapData,
      mapTypes,
      mloInstance,
    });

    project.addInterior(interior);

    return ok(true);
  }

  public async createProject(_: Event, { name, path, interior }: CreateProjectDTO): Promise<Result<string, boolean>> {
    this.currentProject = new Project({ name, path });

    const result = await this.addInteriorToProject(this.currentProject, interior);

    if (isErr(result)) {
      return result;
    }

    return ok(true);
  }

  public closeProject(): Result<string, boolean> {
    this.currentProject = undefined;

    return ok(true);
  }
}
