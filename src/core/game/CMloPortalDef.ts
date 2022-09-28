type CMloPortalDefConstructor = {
  roomFrom: number;
  roomTo: number;
  flags: number;
  attachedEntities: number[];
};

export class CMloPortalDef {
  public roomFrom: number;
  public roomTo: number;
  public flags: number;
  public attachedEntities: number[];

  constructor({ roomFrom, roomTo, flags, attachedEntities }: CMloPortalDefConstructor) {
    this.roomFrom = roomFrom;
    this.roomTo = roomTo;

    this.flags = flags;

    this.attachedEntities = attachedEntities;
  }
}
