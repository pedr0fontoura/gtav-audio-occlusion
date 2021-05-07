import { CodeWalkerFile, CodeWalkerEncoder } from '../core/files/codewalker';
import { CMloArchetypeDef } from '../core/files/codewalker/ytyp';
import { CMapData } from '../core/files/codewalker/ymap';

import AudioOcclusion from '../core/classes/audioOcclusion';

import * as XML from '../core/types/xml';

async function execute(): Promise<void> {
  const ymapPath = process.argv[2];
  const ytypPath = process.argv[3];

  const cwFile = new CodeWalkerFile();
  const cwEncoder = new CodeWalkerEncoder();

  const parsedYmap = await cwFile.read<XML.Ymap>(ymapPath);
  const parsedYtyp = await cwFile.read<XML.Ytyp>(ytypPath);

  const audioOcclusion = new AudioOcclusion({
    CMapData: new CMapData(parsedYmap),
    CMloArchetypeDef: new CMloArchetypeDef(parsedYtyp),
  });

  const ymt = cwEncoder.encodeAudioOcclusion(audioOcclusion);

  await cwFile.write(`${audioOcclusion.occlusionHash}.ymt.pso.xml`, ymt);
}

execute();
