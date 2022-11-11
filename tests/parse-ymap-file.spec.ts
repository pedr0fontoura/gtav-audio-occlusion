import path from 'path';

import { CodeWalkerFormat, isXMLCMapData } from '../src/core/formats/codewalker';
import { XML } from '../src/core/types';
import { CMapData } from '../src/core/game';

const YMAP_FILE_PATH = path.resolve('tests', 'data', 'lr_sc1_03_interior_v_shop_247_milo_.ymap.xml');

let codeWalkerFormat: CodeWalkerFormat;

describe('Parse YMAP file', () => {
  beforeAll(() => {
    codeWalkerFormat = new CodeWalkerFormat();
  });

  it('should be able to parse an ymap.xml file', async () => {
    const data = await codeWalkerFormat.readFile<XML.Ymap>(YMAP_FILE_PATH);

    expect(isXMLCMapData(data)).toBeTruthy();
  });

  it('should be able to instantiate a CMapData using data from an ymap.xml file', async () => {
    const data = await codeWalkerFormat.readFile<XML.Ymap>(YMAP_FILE_PATH);

    const cMapData = codeWalkerFormat.parseCMapData(data);

    expect(cMapData).toBeInstanceOf(CMapData);
  });
});
