import path from 'path';

import { CodeWalker } from '../src/core/formats/codewalker';
import { XML } from '../src/core/types/';
import { isXMLCMapData } from '../src/core/utils/';
import { CMapData } from '../src/core/game/';

const YMAP_FILE_PATH = path.resolve('tests', 'lr_sc1_03_interior_v_shop_247_milo_.ymap.xml');

let codeWalkerParser: CodeWalker;

describe('Parse YMAP file', () => {
  beforeEach(() => {
    codeWalkerParser = new CodeWalker();
  });

  it('should be able to parse an ymap.xml file', async () => {
    const data = await codeWalkerParser.readFile<XML.Ymap>(YMAP_FILE_PATH);

    expect(isXMLCMapData(data)).toBeTruthy();
  });

  it('should be able to instanciate a CMapData using data from an ymap.xml file', async () => {
    const data = await codeWalkerParser.readFile<XML.Ymap>(YMAP_FILE_PATH);

    const cMapData = new CMapData(data);

    expect(cMapData).toBeInstanceOf(CMapData);
  });
});
