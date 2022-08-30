import type { XML } from '../types';

import { isXMLCArchetypeDef } from '../utils';

type RawCBaseArchetypeDef = XML.CArchetypeDef;

export class CBaseArchetypeDef {
  public type: string;
  public name: string;

  constructor(raw: RawCBaseArchetypeDef) {
    if (isXMLCArchetypeDef(raw)) {
      this.fromXMLCBaseArchetypeDef(raw);
      return;
    }

    throw new Error(`Couldn't parse raw CBaseArchetypeDef`);
  }

  fromXMLCBaseArchetypeDef(data: RawCBaseArchetypeDef): void {
    if (!isXMLCArchetypeDef(data)) return;

    const type = data.$.type;
    const name = data.name;

    this.type = type;
    this.name = name;
  }
}
