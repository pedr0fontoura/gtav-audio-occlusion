import { ipcMain, Event } from 'electron';
import path from 'path';

import { err, isErr, ok, unwrapResult } from '@/electron/common';

import { ProjectAPI } from '@/electron/common/types/project';
import type { CreateProjectDTO } from '@/electron/common/types/project';
import type { CreateInteriorDTO } from '@/electron/common/types/interior';

import { isXMLFilePath, isMapDataFilePath, isMapTypesFilePath } from '@/electron/common/utils/files';

import { Ymap, Ytyp } from '@/core/types/xml';
import { getCMloInstanceDef } from '@/core/game';

import { Application } from './app';

import { Project } from './project';
import { Interior } from './interior';

import { forwardSerializedResult, sanitizePath, selectDirectory, selectFiles } from './utils';

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
    ipcMain.handle(ProjectAPI.WRITE_GENERATED_FILES, this.writeGeneratedFiles.bind(this));
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

    const interiorPath = path.resolve(project.path, sanitizePath(name));

    const interior = new Interior({
      identifier: name,
      path: interiorPath,
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
    this.currentProject = null;

    return ok(true);
  }

  public async writeInteriorsOcclusionMetadata(): Promise<Result<string, boolean>> {
    const projectResult = this.application.projectManager.getCurrentProject();

    if (isErr(projectResult)) {
      return projectResult;
    }

    const project = unwrapResult(projectResult);

    for (const interior of project.interiors) {
      const { naOcclusionInteriorMetadata, path } = interior;

      let filePath: string;

      try {
        filePath = await this.application.codeWalkerFormat.writeNaOcclusionInteriorMetadata(
          path,
          naOcclusionInteriorMetadata,
        );
      } catch {
        return err('FAILED_TO_WRITE_NA_OCCLUSION_INTERIOR_METADATA_FILE');
      }

      interior.naOcclusionInteriorMetadataPath = filePath;
    }

    return ok(true);
  }

  public async writeDat151(): Promise<Result<string, string>> {
    const projectResult = this.application.projectManager.getCurrentProject();

    if (isErr(projectResult)) {
      return projectResult;
    }

    const project = unwrapResult(projectResult);

    const audioGameData = project.interiors.flatMap(interior => interior.getAudioGameData());

    let filePath: string;

    try {
      filePath = await this.application.codeWalkerFormat.writeDat151(project.path, audioGameData);
    } catch {
      return err('FAILED_TO_WRITE_DAT_151_FILE');
    }

    project.interiors.forEach(interior => {
      interior.audioGameDataPath = filePath;
    });

    return ok(filePath);
  }

  public async writeGeneratedFiles(): Promise<Result<string, boolean>> {
    const [interiorsMetadataResult, dat151Result] = await Promise.all([
      this.writeInteriorsOcclusionMetadata(),
      this.writeDat151(),
    ]);

    if (isErr(interiorsMetadataResult)) {
      return interiorsMetadataResult;
    }

    if (isErr(dat151Result)) {
      return dat151Result;
    }

    return ok(true);
  }
}
