import { convertToInt32, joaat } from './utils';

import { YtypXML, CMloArchetypeDef, MloEntity, MloRoom, MloPortal } from './types/ytyp';

export class Mlo {
  public entities: MloEntity[];
  public rooms: MloRoom[];
  public portals: MloPortal[];

  constructor(rawData: YtypXML) {
    // Interior archeType is the last one on the list
    const archetypesLength = rawData.CMapTypes.archetypes.Item.length;

    const rawArchetype = rawData.CMapTypes.archetypes.Item[archetypesLength - 1];

    this.entities = this.extractEntities(rawArchetype);
    this.rooms = this.extractRooms(rawArchetype);
    this.portals = this.extractPortals(rawArchetype);
  }

  private extractEntities(archetype: CMloArchetypeDef): MloEntity[] {
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

  private extractRooms(archetype: CMloArchetypeDef): MloRoom[] {
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

  private extractPortals(archetype: CMloArchetypeDef): MloPortal[] {
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

  public getRoomPortals(room: number): MloPortal[] {
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
