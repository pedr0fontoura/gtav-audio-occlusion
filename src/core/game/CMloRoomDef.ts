type CMloRoomDefConstructor = {
  name: string;
  portalCount: number;
};

export class CMloRoomDef {
  public name: string;
  public portalCount: number;

  constructor({ name, portalCount }: CMloRoomDefConstructor) {
    this.name = name;
    this.portalCount = portalCount;
  }
}
