import path from 'path';

import { CodeWalker } from '../src/core/formats/codewalker';
import type { XML } from '../src/core/types';
import { CMapData, CMapTypes, isCMloArchetypeDef, isCMloInstanceDef } from '../src/core/game';

import { createNaOcclusionInteriorMetadata } from '../src/core';

const TESTS_DATA_PATH = path.resolve('tests', 'data');

const YMAP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'lr_sc1_03_interior_v_shop_247_milo_.ymap.xml');
const YTYP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'v_int_66.ytyp.xml');

let codeWalkerParser: CodeWalker;

describe('Generate interior audio cclusion', () => {
  beforeAll(() => {
    codeWalkerParser = new CodeWalker();
  });

  it('should do something', async () => {
    const rawMapData = await codeWalkerParser.readFile<XML.Ymap>(YMAP_FILE_PATH);
    const rawMapTypes = await codeWalkerParser.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    const mapData = new CMapData(rawMapData);
    const mapTypes = new CMapTypes(rawMapTypes);

    const archetype = mapTypes.archetypes.find(isCMloArchetypeDef);
    if (!archetype) {
      throw new Error(`Couldn't find a CMloArchetypeDef`);
    }

    const instance = mapData.entities.find(isCMloInstanceDef);
    if (!instance) {
      throw new Error(`Couldn't find a CMloInstanceDef`);
    }

    instance.setArchetypeDef(archetype);

    const occlusion = createNaOcclusionInteriorMetadata(instance);

    console.log(occlusion);
  });
});
