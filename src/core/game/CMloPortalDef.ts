import { CMloArchetypeDef } from './CMloArchetypeDef';
import { CEntityDef } from './CEntityDef';
import { CMloRoomDef } from './CMloRoomDef';

type CMloPortalDefConstructor = {
  interior: CMloArchetypeDef;
  roomFrom: number | CMloRoomDef;
  roomTo: number | CMloRoomDef;
  flags: number;
  attachedEntities: number[] | CEntityDef[];
};

export class CMloPortalDef {
  private interior: CMloArchetypeDef;

  public roomFrom: CMloRoomDef;
  public roomTo: CMloRoomDef;
  public flags: number;
  public attachedEntities: CEntityDef[];

  constructor({ interior, roomFrom, roomTo, flags, attachedEntities }: CMloPortalDefConstructor) {
    if (!interior) {
      throw new Error('A CMloPortalDef needs a parent CMloArchetypeDef');
    }

    this.interior = interior;

    if (roomFrom instanceof CMloRoomDef) {
      this.roomFrom = roomFrom;
    } else {
      this.roomFrom = this.interior.getRoom(roomFrom);
    }

    if (roomTo instanceof CMloRoomDef) {
      this.roomTo = roomTo;
    } else {
      this.roomTo = this.interior.getRoom(roomTo);
    }

    this.flags = flags;

    this.attachedEntities = attachedEntities.map(entity =>
      entity instanceof CEntityDef ? entity : this.interior.getEntity(entity),
    );
  }
}
