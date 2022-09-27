import { joaat, isBitSet } from '../../utils';

import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';
import { naOcclusionPathNodeMetadata } from './naOcclusionPathNodeMetadata';
import { naOcclusionPortalEntityMetadata } from './naOcclusionPortalEntityMetadata';

import { isCMloArchetypeDef } from '../CMloArchetypeDef';
import type { CMloInstanceDef } from '../CMloInstanceDef';
import type { CMloPortalDef } from '../CMloPortalDef';

type naOcclusionInteriorMetadataConstructor = {
  interior: CMloInstanceDef;
};

export class naOcclusionInteriorMetadata {
  public interior: CMloInstanceDef;

  public interiorProxyHash: number;

  public portalInfoList: naOcclusionPortalInfoMetadata[];
  public pathNodeList: naOcclusionPathNodeMetadata[];

  constructor({ interior }: naOcclusionInteriorMetadataConstructor) {
    if (!interior.archetype) {
      throw new Error('CMloInstanceDef archetype is not set');
    }

    if (!isCMloArchetypeDef(interior.archetype)) {
      throw new Error('Interior archetype is not a CMloArchetypeDef');
    }

    this.interior = interior;

    this.interiorProxyHash = naOcclusionInteriorMetadata.getInteriorProxyHash(this.interior);

    this.portalInfoList = this.getPortalInfoList();
  }

  static getInteriorProxyHash = (interior: CMloInstanceDef): number => {
    const { archetype, position } = interior;

    if (!archetype) return;
    if (!isCMloArchetypeDef(archetype)) return;

    return joaat(archetype.name) ^ (position.x * 100) ^ (position.y * 100) ^ ((position.z * 100) & 0xffffffff);
  };

  public getPortalEntityMetadata = (portal: CMloPortalDef): naOcclusionPortalEntityMetadata[] => {
    const { archetype } = this.interior;

    if (!archetype) return;
    if (!isCMloArchetypeDef(archetype)) return;

    const portalEntities = portal.getPortalEntities(archetype.entities);

    return portalEntities.map(entity => new naOcclusionPortalEntityMetadata({ linkType: 1, entity }));
  };

  public getPortalInfoList = (): naOcclusionPortalInfoMetadata[] => {
    const { archetype } = this.interior;

    if (!archetype) return;
    if (!isCMloArchetypeDef(archetype)) return;

    let portalInfoList: naOcclusionPortalInfoMetadata[] = [];

    archetype.rooms.forEach((room, roomIdx) => {
      const roomPortals = archetype.getRoomPortals(roomIdx);

      const roomPortalInfoList = roomPortals
        .filter(portal => !isBitSet(portal.flags, 2))
        .map(
          (portal, portalIdx) =>
            new naOcclusionPortalInfoMetadata({
              interiorProxyHash: this.interiorProxyHash,
              destInteriorHash: this.interiorProxyHash,
              portalIdx,
              roomIdx: portal.roomFrom,
              destRoomIdx: portal.roomTo,
              portalEntityList: this.getPortalEntityMetadata(portal),
            }),
        );

      portalInfoList.push(...roomPortalInfoList);
    });

    return portalInfoList;
  };
}
