import { YtypLoader, Mlo } from './ytyp';
import { YmapLoader, MapData } from './ymap';

import AudioOcclusion from './audioOcclusion';

async function execute(): Promise<void> {
  const ymapPath = process.argv[2];
  const ytypPath = process.argv[3];

  const ymapLoader = new YmapLoader();
  const ytypLoader = new YtypLoader();

  const parsedYmap = await ymapLoader.parseXML(ymapPath);
  const mapData = new MapData(parsedYmap);

  const parsedYtyp = await ytypLoader.parseXML(ytypPath);
  const interior = new Mlo(parsedYtyp);

  const audioOcclusion = new AudioOcclusion({ interior, mapData });

  console.log('occlusionHash', audioOcclusion.occlusionHash);
  console.log('PortalInfoList', audioOcclusion.PortalInfoList);
  console.log('PathNodeList', audioOcclusion.PathNodeList);
}

execute();
