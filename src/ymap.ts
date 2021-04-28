import fs from 'fs/promises';
import { Parser } from 'xml2js';

/**
 * Interior archetype on ytyp files:
 * parsedXML.CMapTypes.archetypes.Item[parsedXML.CMapTypes.archetypes.Item.length - 1];
 */

class YmapLoader {
  private parser: Parser;
}