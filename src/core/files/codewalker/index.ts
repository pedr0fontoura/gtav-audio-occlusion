import path from 'path';
import fs from 'fs/promises';
import { Parser, Builder } from 'xml2js';

export class CodeWalkerFile {
  private parser: Parser;
  private builder: Builder;

  constructor() {
    this.parser = new Parser({ explicitArray: false });
    this.builder = new Builder({ headless: true });
  }

  public async read<T>(filePath: string): Promise<T> {
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

  public async write(filePath: string, data: any): Promise<void> {
    if (!filePath.includes('.xml')) {
      throw new Error('Can only write xml files');
    }

    const XMLHeader = `<?xml version="1.0" encoding="UTF-8"?>\r\n`;

    const XML = this.builder.buildObject(data);

    const cwd = process.cwd();

    const resultFilePath = path.resolve(cwd, 'output', filePath);

    console.log(`Writing file on ${resultFilePath}`);

    await fs.writeFile(resultFilePath, XMLHeader + XML);
  }
}

export * from './encoder';
