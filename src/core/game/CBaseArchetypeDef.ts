export type CBaseArchetypeDefConstructor = {
  type: string;
  name: string;
};

export class CBaseArchetypeDef {
  public type: string;
  public name: string;

  constructor({ type, name }: CBaseArchetypeDefConstructor) {
    this.type = type;
    this.name = name;
  }
}
