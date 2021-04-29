import { YtypLoader, Mlo } from './ytyp';
import { YmapLoader, MapData } from './ymap';

import { AudioOcclusionFile } from './types/ymt';

async function execute(): Promise<void> {
  const filePath = process.argv[2];

  /* const ytypLoader = new YtypLoader();

  const parsedYtyp = await ytypLoader.parseXML(filePath);

  const interior = new Mlo(parsedYtyp);
  interior.rooms.forEach((room, index) => {
    console.log(interior.getRoomPortals(index));
  }); */

  const ytypLoader = new YtypLoader();

  const parsedYtyp = await ytypLoader.parseXML(filePath);

  const interior = new Mlo(parsedYtyp);

  console.log(interior.rooms);
}

execute();