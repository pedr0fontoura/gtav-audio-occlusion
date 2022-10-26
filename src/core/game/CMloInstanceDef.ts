import { CEntityDef } from './CEntityDef';
import { CMloArchetypeDef, isCMloArchetypeDef } from './CMloArchetypeDef';
import { CMapData } from './CMapData';
import { CMapTypes } from './CMapTypes';

export class CMloInstanceDef extends CEntityDef {
  public archetype: CMloArchetypeDef;
}

export const isCMloInstanceDef = (entity: CEntityDef): entity is CMloInstanceDef => entity.type === 'CMloInstanceDef';

export const getCMloInstanceDef = (mapData: CMapData, mapTypes: CMapTypes): CMloInstanceDef => {
  const archetype = mapTypes.archetypes.find(isCMloArchetypeDef);

  if (!archetype) {
    throw new Error(`Couldn't find a CMloArchetypeDef`);
  }

  const instance = mapData.entities.find(isCMloInstanceDef);

  if (!instance) {
    throw new Error(`Couldn't find a CMloInstanceDef`);
  }

  instance.setArchetypeDef(archetype);

  return instance;
};
