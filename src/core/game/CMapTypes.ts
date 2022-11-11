import { CBaseArchetypeDef } from './CBaseArchetypeDef';
import { CMloArchetypeDef } from './CMloArchetypeDef';

export type CArchetypeDef = CBaseArchetypeDef | CMloArchetypeDef;

type CMapTypesConstructor = {
  archetypes: CArchetypeDef[];
};

export class CMapTypes {
  public archetypes: CArchetypeDef[];

  constructor({ archetypes }: CMapTypesConstructor) {
    this.archetypes = archetypes;
  }
}
