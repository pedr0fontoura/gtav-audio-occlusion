import { XML } from '../types';

import { isXMLCArchetypeDef, isXMLCMapTypes, isXMLCMloArchetypeDef } from '../utils';

import { CBaseArchetypeDef } from './CBaseArchetypeDef';
import { CMloArchetypeDef } from './CMloArchetypeDef';

export type Archetype = CBaseArchetypeDef | CMloArchetypeDef;

type RawCMapTypes = XML.Ytyp;

export class CMapTypes {
  public archetypes: Archetype[];

  constructor(raw: RawCMapTypes) {
    if (isXMLCMapTypes(raw)) {
      this.fromXMLCMapTypes(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CMapTypes`);
  }

  parseCMapTypesArchetype(data: XML.Archetype): Archetype {
    return isXMLCMloArchetypeDef(data) ? new CMloArchetypeDef(data) : new CBaseArchetypeDef(data);
  }

  parseCMapTypesArchetypes(data: XML.Archetype[]): Archetype[] {
    return data
      .filter(archetype => isXMLCArchetypeDef(archetype))
      .map(archetype => this.parseCMapTypesArchetype(archetype));
  }

  fromXMLCMapTypes(data: RawCMapTypes): void {
    if (!isXMLCMapTypes(data)) return;

    const archetypeOrArchetypes = data.CMapTypes.archetypes.Item;

    if (Array.isArray(archetypeOrArchetypes)) {
      this.archetypes = this.parseCMapTypesArchetypes(archetypeOrArchetypes);
    } else {
      this.archetypes = [this.parseCMapTypesArchetype(archetypeOrArchetypes)];
    }
  }
}
