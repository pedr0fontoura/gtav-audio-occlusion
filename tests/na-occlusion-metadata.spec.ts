import path from 'path';
import fs from 'fs/promises';

import { CodeWalkerFormat } from '../src/core/formats/codewalker';
import type { XML } from '../src/core/types';
import { naOcclusionInteriorMetadata } from '../src/core/game/audio';
import { getCMloInstanceDef } from '../src/core/game';

import { createNaOcclusionInteriorMetadata } from '../src/core';

const TESTS_DATA_PATH = path.resolve('tests', 'data');

const YMAP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'lr_sc1_03_interior_v_shop_247_milo_.ymap.xml');
const YTYP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'v_int_66.ytyp.xml');

let codeWalkerFormat: CodeWalkerFormat;
let interiorMetadata: naOcclusionInteriorMetadata;

const doesFileExist = async (filePath: string) => {
  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
};

describe('Interior audio occlusion', () => {
  beforeAll(async () => {
    codeWalkerFormat = new CodeWalkerFormat();

    const rawMapData = await codeWalkerFormat.readFile<XML.Ymap>(YMAP_FILE_PATH);
    const rawMapTypes = await codeWalkerFormat.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    const mapData = codeWalkerFormat.parseCMapData(rawMapData);
    const mapTypes = codeWalkerFormat.parseCMapTypes(rawMapTypes);

    const instance = getCMloInstanceDef(mapData, mapTypes);

    interiorMetadata = createNaOcclusionInteriorMetadata(instance);
  });

  it('should be able to generate v_shop_247 path nodes correctly', async () => {
    const expectedPathNodes = [
      2124924646,
      -2124924644,
      -1174415892,
      1174415894,
      2124924647,
      -2124924643,
      950508754,
      -950508750,
      -1174415891,
      1174415895,
      2124924648,
      -2124924642,
      950508755,
      -950508749,
      -1174415890,
      1174415896,
    ];

    const pathNodesKeys = interiorMetadata.pathNodeList.map(pathNode => pathNode.key);

    const includesAllPathNodes = expectedPathNodes.every(pathNode => pathNodesKeys.includes(pathNode));

    expect(includesAllPathNodes).toBeTruthy();
  });

  it('should be able to write the interior audio occlusion metadata', async () => {
    const targetPath = path.resolve('tests');

    const filePath = await codeWalkerFormat.writeNaOcclusionInteriorMetadata(targetPath, interiorMetadata);

    expect(await doesFileExist(filePath)).toBeTruthy();

    await fs.unlink(filePath);
  });
});
