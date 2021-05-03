import { CodeWalkerFile, CodeWalkerEncoder } from './files/codewalker';
import { CMloArchetypeDef } from './files/codewalker/ytyp';
import { CMapData } from './files/codewalker/ymap';

import AudioOcclusion from './audioOcclusion';

import * as XML from './types/xml';

async function execute(): Promise<void> {
  const ymapPath = process.argv[2];
  const ytypPath = process.argv[3];

  const cwFile = new CodeWalkerFile();
  const cwEncoder = new CodeWalkerEncoder();

  const parsedYmap = await cwFile.read<XML.Ymap>(ymapPath);
  const parsedYtyp = await cwFile.read<XML.Ytyp>(ytypPath);

  const mapData = new CMapData(parsedYmap);
  const interior = new CMloArchetypeDef(parsedYtyp);

  const audioOcclusion = new AudioOcclusion({ interior, mapData });

  const ymt = cwEncoder.encodeAudioOcclusion(audioOcclusion);

  await cwFile.write(`${audioOcclusion.occlusionHash}.ymt.pso.xml`, ymt);
}

execute();
