import fs from 'fs/promises';
import { Parser, Builder } from 'xml2js';

export class CodeWalker {
  private parser: Parser;
  private builder: Builder;

  constructor() {
    this.parser = new Parser({ explicitArray: false });
    this.builder = new Builder({ headless: true });
  }

  public async readFile<T>(filePath: string): Promise<T> {
    if (!filePath.includes('.xml')) {
      throw new Error('File is not a xml file');
    }

    let rawData: Buffer;

    try {
      rawData = await fs.readFile(filePath);
    } catch {
      throw new Error('Error reading xml file');
    }

    const parsedXML: T = await this.parser.parseStringPromise(rawData);

    return parsedXML;
  }

  public async writeFile(filePath: string, data: any): Promise<void> {
    if (!filePath.includes('.xml')) {
      throw new Error('Can only write xml files');
    }

    const XMLHeader = `<?xml version="1.0" encoding="UTF-8"?>\r\n`;

    const XML = this.builder.buildObject(data);

    await fs.writeFile(filePath, XMLHeader + XML);
  }
}
