import fs from 'fs/promises';
import { Parser } from 'xml2js';

import { AudioOcclusionFile } from './types/ymt';

/**
 * Interior archetype on ytyp files:
 * parsedXML.CMapTypes.archetypes.Item[parsedXML.CMapTypes.archetypes.Item.length - 1];
 */

async function execute(): Promise<void> {
  const filePath = process.argv[2];

  const rawXML = await fs.readFile(filePath);

  const parser = new Parser({ explicitArray: false });

  const parsedXML = await parser.parseStringPromise(rawXML);

  console.log(parsedXML.CMapTypes.archetypes.Item[parsedXML.CMapTypes.archetypes.Item.length - 1]);
}

execute();