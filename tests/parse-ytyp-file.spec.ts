import path from 'path';

import { CodeWalkerFormat, isXMLCMapTypes } from '../src/core/formats/codewalker';
import { XML } from '../src/core/types';
import { CMapTypes } from '../src/core/game';

const YTYP_FILE_PATH = path.resolve('tests', 'data', 'v_int_66.ytyp.xml');

let codeWalkerFormat: CodeWalkerFormat;

describe('Parse YTYP file', () => {
  beforeAll(() => {
    codeWalkerFormat = new CodeWalkerFormat();
  });

  it('should be able to parse an ytyp.xml file', async () => {
    const data = await codeWalkerFormat.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    expect(isXMLCMapTypes(data)).toBeTruthy();
  });

  it('should be able to instantiate a CMapTypes using data from an ytyp.xml file', async () => {
    const data = await codeWalkerFormat.readFile<XML.Ytyp>(YTYP_FILE_PATH);

    const cMapTypes = codeWalkerFormat.parseCMapTypes(data);

    expect(cMapTypes).toBeInstanceOf(CMapTypes);
  });
});
