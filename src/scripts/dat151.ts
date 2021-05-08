import { CodeWalkerFile, CodeWalkerEncoder } from '../core/files/codewalker';
import { CMapData } from '../core/files/codewalker/ymap';
import { CMloArchetypeDef } from '../core/files/codewalker/ytyp';

import AudioDynamixData from '../core/classes/audioDynamixData';
import AudioGameData from '../core/classes/audioGameData';

import * as XML from '../core/types/xml';

async function execute(): Promise<void> {
  const ymapPath = process.argv[2];
  const ytypPath = process.argv[3];

  const cwFile = new CodeWalkerFile();
  const cwEncoder = new CodeWalkerEncoder();

  const parsedYmap = await cwFile.read<XML.Ymap>(ymapPath);
  const parsedYtyp = await cwFile.read<XML.Ytyp>(ytypPath);

  const cMapData = new CMapData(parsedYmap);

  const cMloArchetypeDef = new CMloArchetypeDef(parsedYtyp);

  const audioDynamixData = new AudioDynamixData({
    CMapData: cMapData,
  });

  const audioGameData = new AudioGameData({
    CMapData: cMapData,
    CMloArchetypeDef: cMloArchetypeDef,
    AudioDynamixData: audioDynamixData,
  });

  const dat15 = cwEncoder.encodeAudioGameData(audioGameData);

  await cwFile.write(`${cMapData.archetypeName}_game.dat151.rel.xml`, dat15);
}

execute();
