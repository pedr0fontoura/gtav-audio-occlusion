import path from 'path';

import { CodeWalker } from '../src/core/formats/codewalker';
import type { XML } from '../src/core/types';
import { naOcclusionInteriorMetadata } from '../src/core/game/audio';
import { isCMloArchetypeDef, isCMloInstanceDef } from '../src/core/game';

import { createNaOcclusionInteriorMetadata } from '../src/core';

const TESTS_DATA_PATH = path.resolve('tests', 'data');

const YMAP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'lr_sc1_03_interior_v_shop_247_milo_.ymap.xml');
const YTYP_FILE_PATH = path.resolve(TESTS_DATA_PATH, 'v_int_66.ytyp.xml');

let codeWalkerParser: CodeWalker;
let interiorMetadata: naOcclusionInteriorMetadata;

describe('Generate interior audio cclusion', () => {
  beforeAll(async () => {
    codeWalkerParser = new CodeWalker();

    const rawMapData = await codeWalkerParser.readFile<XML.Ymap>(YMAP_FILE_PATH);
    const rawMapTypes = await codeWalkerParser.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    const mapData = codeWalkerParser.parseCMapData(rawMapData);
    const mapTypes = codeWalkerParser.parseCMapTypes(rawMapTypes);

    const archetype = mapTypes.archetypes.find(isCMloArchetypeDef);

    if (!archetype) {
      throw new Error(`Couldn't find a CMloArchetypeDef`);
    }

    const instance = mapData.entities.find(isCMloInstanceDef);
    if (!instance) {
      throw new Error(`Couldn't find a CMloInstanceDef`);
    }

    instance.setArchetypeDef(archetype);

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

    console.log(`Generated paths: ${pathNodesKeys}`);

    const includesAllPathNodes = expectedPathNodes.every(pathNode => pathNodesKeys.includes(pathNode));

    if (!includesAllPathNodes) {
      const missingPaths = expectedPathNodes.filter(pathNode => !pathNodesKeys.includes(pathNode));

      console.warn(`Missing paths: ${missingPaths}`);
    }

    expect(includesAllPathNodes).toBeTruthy();
  });
});
