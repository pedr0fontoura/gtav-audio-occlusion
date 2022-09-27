import { joaat, isBitSet } from '../../utils';

import { naOcclusionPortalInfoMetadata } from './naOcclusionPortalInfoMetadata';
import { naOcclusionPathNodeMetadata } from './naOcclusionPathNodeMetadata';

import { isCMloArchetypeDef } from '../CMloArchetypeDef';
import type { CMloInstanceDef } from '../CMloInstanceDef';

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

  public getPortalInfoList = (): naOcclusionPortalInfoMetadata[] => {
    const { archetype } = this.interior;

    if (!archetype) return;
    if (!isCMloArchetypeDef(archetype)) return;

    let portalInfoList: naOcclusionPortalInfoMetadata[] = [];

    archetype.rooms.forEach(room => {
      const roomPortals = room.portals;

      const roomPortalInfoList = roomPortals
        .filter(portal => !isBitSet(portal.flags, 2))
        .map((portal, portalIdx) => new naOcclusionPortalInfoMetadata(this, portal, portalIdx));

      portalInfoList.push(...roomPortalInfoList);
    });

    return portalInfoList;
  };
}
