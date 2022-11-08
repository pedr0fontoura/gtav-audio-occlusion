import path from 'path';
import fs from 'fs/promises';

import { CodeWalkerFormat } from '../src/core/formats/codewalker';
import type { XML } from '../src/core/types';
import { AudioGameData } from '../src/core/game/audio';
import { getCMloInstanceDef } from '../src/core/game';

import { createInteriorAudioGameData, createInteriorRoomAudioGameDataList } from '../src/core';

const TESTS_DATA_PATH = path.resolve('tests', 'data');

const YMAP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'lr_sc1_03_interior_v_shop_247_milo_.ymap.xml');
const YTYP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'v_int_66.ytyp.xml');

let codeWalkerFormat: CodeWalkerFormat;
let audioGameData: AudioGameData;

const doesFileExist = async (filePath: string) => {
  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
};

describe('Interior audio game data', () => {
  beforeAll(async () => {
    codeWalkerFormat = new CodeWalkerFormat();

    const rawMapData = await codeWalkerFormat.readFile<XML.Ymap>(YMAP_FILE_PATH);
    const rawMapTypes = await codeWalkerFormat.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    const mapData = codeWalkerFormat.parseCMapData(rawMapData);
    const mapTypes = codeWalkerFormat.parseCMapTypes(rawMapTypes);

    const instance = getCMloInstanceDef(mapData, mapTypes);

    audioGameData = [createInteriorAudioGameData(instance), ...createInteriorRoomAudioGameDataList(instance)];
  });

  it('should be able to write the interior audio game data', async () => {
    const filePath = path.resolve('tests', 'game.dat151.rel.xml');

    codeWalkerFormat.writeDat151(filePath, audioGameData);

    expect(await doesFileExist(filePath)).toBeTruthy();

    await fs.unlink(filePath);
  });
});
