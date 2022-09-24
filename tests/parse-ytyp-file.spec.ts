import path from 'path';

import { CodeWalker } from '../src/core/formats/codewalker';
import { XML } from '../src/core/types';
import { isXMLCMapTypes } from '../src/core/utils';
import { CMapTypes } from '../src/core/game';

const YTYP_FILE_PATH = path.resolve('tests', 'data', 'v_int_66.ytyp.xml');

let codeWalkerParser: CodeWalker;

describe('Parse YTYP file', () => {
  beforeAll(() => {
    codeWalkerParser = new CodeWalker();
  });

  it('should be able to parse an ytyp.xml file', async () => {
    const data = await codeWalkerParser.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    expect(isXMLCMapTypes(data)).toBeTruthy();
  });

  it('should be able to instantiate a CMapTypes using data from an ytyp.xml file', async () => {
    const data = await codeWalkerParser.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    const cMapTypes = new CMapTypes(data);

    expect(cMapTypes).toBeInstanceOf(CMapTypes);
  });
});
