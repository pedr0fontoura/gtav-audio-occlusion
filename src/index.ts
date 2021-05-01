import { CodeWalkerFile, CodeWalkerEncoder } from './files/codewalker';
import { Mlo } from './ytyp';
import { MapData } from './ymap';

import AudioOcclusion from './audioOcclusion';

import { YmapXML } from './types/ymap';
import { YtypXML } from './types/ytyp';

async function execute(): Promise<void> {
  const ymapPath = process.argv[2];
  const ytypPath = process.argv[3];

  const cwFile = new CodeWalkerFile();
  const cwEncoder = new CodeWalkerEncoder();

  const parsedYmap = await cwFile.read<YmapXML>(ymapPath);
  const parsedYtyp = await cwFile.read<YtypXML>(ytypPath);

  const mapData = new MapData(parsedYmap);
  const interior = new Mlo(parsedYtyp);

  const audioOcclusion = new AudioOcclusion({ interior, mapData, encoder: cwEncoder });

  const ymt = audioOcclusion.encode();

  await cwFile.write(`${audioOcclusion.occlusionHash}.ymt.pso.xml`, ymt);
}

execute();
