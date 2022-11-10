import { CEntityDef } from './CEntityDef';
import { CMloArchetypeDef, isCMloArchetypeDef } from './CMloArchetypeDef';
import { CMapData } from './CMapData';
import { CMapTypes } from './CMapTypes';

export class CMloInstanceDef extends CEntityDef {
  public archetype: CMloArchetypeDef;
}

export const isCMloInstanceDef = (entity: CEntityDef): entity is CMloInstanceDef => entity.type === 'CMloInstanceDef';

export const getCMloInstanceDef = (mapData: CMapData, mapTypes: CMapTypes): CMloInstanceDef => {
  const instance = mapData.entities.find(isCMloInstanceDef);

  if (!instance) {
    throw new Error(`Couldn't find a CMloInstanceDef`);
  }

  const archetypes = mapTypes.archetypes.filter(isCMloArchetypeDef);

  const archetype = archetypes.find(archetype => archetype.name === instance.archetypeName);

  if (!archetype) {
    throw new Error(`Couldn't find the CMloArchetypeDef of the CMloInstanceDef`);
  }

  instance.setArchetypeDef(archetype);

  return instance;
};
