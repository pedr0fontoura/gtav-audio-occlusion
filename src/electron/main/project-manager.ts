import { ipcMain, Event } from 'electron';

import { err, isErr, ok } from '@/electron/common';

import { ProjectAPI } from '@/electron/common/types/project';
import type { CreateProjectDTO, SerializedProject } from '@/electron/common/types/project';
import type { CreateInteriorDTO } from '@/electron/common/types/interior';

import { isXMLFilePath, isMapDataFilePath, isMapTypesFilePath } from '@/electron/common/utils/files';

import { CodeWalkerFormat } from '@/core/formats/codewalker';
import { Ymap, Ytyp } from '@/core/types/xml';
import { isCMloInstanceDef } from '@/core/game';

import { Project } from './project';

import { selectFiles } from './files';
import { Interior } from './interior';

const MAP_DATA_FILE_FILTERS = [{ name: '#map files', extensions: ['ymap.xml'] }];
const MAP_TYPES_FILE_FILTERS = [{ name: '#typ files', extensions: ['ytyp.xml'] }];

export class ProjectManager {
  private codeWalkerFormat: CodeWalkerFormat;

  public currentProject: Project | undefined;

  constructor(codeWalkerFormat: CodeWalkerFormat) {
    this.codeWalkerFormat = codeWalkerFormat;

    ipcMain.handle(ProjectAPI.CREATE_PROJECT, this.createProject.bind(this));
    ipcMain.handle(ProjectAPI.GET_CURRENT_PROJECT, this.getCurrentProject.bind(this));
    ipcMain.handle(ProjectAPI.SELECT_MAP_DATA_FILE, this.selectMapDataFile.bind(this));
    ipcMain.handle(ProjectAPI.SELECT_MAP_TYPES_FILE, this.selectMapTypesFile.bind(this));
  }

  public getCurrentProject(): Result<string, SerializedProject | undefined> {
    if (!this.currentProject) {
      return ok(undefined);
    }

    return ok(this.currentProject.serialize());
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
      mapDataFile = await this.codeWalkerFormat.readFile<Ymap>(mapDataFilePath);
    } catch {
      return err('FAILED_READING_#MAP_FILE');
    }

    try {
      mapTypesFile = await this.codeWalkerFormat.readFile<Ytyp>(mapTypesFilePath);
    } catch {
      return err('FAILED_READING_#TYP_FILE');
    }

    const mapData = this.codeWalkerFormat.parseCMapData(mapDataFile);
    const mapTypes = this.codeWalkerFormat.parseCMapTypes(mapTypesFile);
    const mloInstance = mapData.entities.find(isCMloInstanceDef);

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
}
