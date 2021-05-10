import { CodeWalkerFile, CodeWalkerEncoder } from '../core/files/codewalker';
import { CMapData } from '../core/files/codewalker/ymap';

import AudioDynamixData from '../core/classes/audioDynamixData';

import * as XML from '../core/types/xml';

async function execute(): Promise<void> {
  const ymapPath = process.argv[2];

  const cwFile = new CodeWalkerFile();
  const cwEncoder = new CodeWalkerEncoder();

  const parsedYmap = await cwFile.read<XML.Ymap>(ymapPath);

  const cMapData = new CMapData(parsedYmap);

  const audioDynamixData = new AudioDynamixData({
    cMapData,
  });

  const dat15 = cwEncoder.encodeAudioDynamixData(audioDynamixData);

  await cwFile.write(`${cMapData.archetypeName}_mix.dat15.rel.xml`, dat15);
}

execute();
