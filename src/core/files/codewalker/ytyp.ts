import { convertToInt32, joaat } from '../../utils';

import * as XML from '../../types/xml';

export class CMloArchetypeDef {
  public entities: XML.MloEntity[];
  public rooms: XML.MloRoom[];
  public portals: XML.MloPortal[];

  constructor(rawData: XML.Ytyp) {
    // Interior archeType is the last one on the list
    const archetypesLength = rawData.CMapTypes.archetypes.Item.length;

    const rawArchetype = rawData.CMapTypes.archetypes.Item[archetypesLength - 1];

    this.entities = this.getEntities(rawArchetype);
    this.rooms = this.getRooms(rawArchetype);
    this.portals = this.getPortals(rawArchetype);
  }

  private getEntities(archetype: XML.CMloArchetypeDef): XML.MloEntity[] {
    return archetype.entities.Item.map(rawMloEntity => {
      let hash: number;

      if (rawMloEntity.archetypeName.startsWith('hash_')) {
        const [, hexString] = rawMloEntity.archetypeName.split('_');

        hash = parseInt(hexString, 16);
      } else {
        hash = joaat(rawMloEntity.archetypeName);
      }

      return {
        hash: convertToInt32(hash),
      };
    });
  }

  private getRooms(archetype: XML.CMloArchetypeDef): XML.MloRoom[] {
    return archetype.rooms.Item.map((rawMloRoom, index) => {
      const name = rawMloRoom.name;

      const portalCount = parseInt(rawMloRoom.portalCount.$.value);

      return {
        index,
        name,
        portalCount,
      };
    });
  }

  private getPortals(archetype: XML.CMloArchetypeDef): XML.MloPortal[] {
    return archetype.portals.Item.map((rawMloPortal, index) => {
      const from = parseInt(rawMloPortal.roomFrom.$.value);

      const to = parseInt(rawMloPortal.roomTo.$.value);

      const attachedObjects = rawMloPortal.attachedObjects
        .split(' ')
        .filter(entity => !!entity)
        .map(entityIdx => {
          const parsedEntityIdx = parseInt(entityIdx);

          return this.entities[parsedEntityIdx].hash;
        });

      return {
        index,
        from,
        to,
        attachedObjects,
      };
    });
  }

  public getRoomPortals(room: number): XML.MloPortal[] {
    const filteredPortals = this.portals.filter(
      portal => portal.from === room || portal.to === room,
    );

    return filteredPortals.map(portal => {
      if (portal.to === room) {
        const reversePortal = {
          ...portal,
          from: portal.to,
          to: portal.from,
        };

        return reversePortal;
      }

      return portal;
    });
  }
}
