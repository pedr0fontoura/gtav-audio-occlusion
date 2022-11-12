import { joaat } from '../../utils';

import { CEntityDef } from '../CEntityDef';

type naOcclusionPortalEntityMetadataConstructor = {
  entity: CEntityDef;
  linkType: number;
};

const DOOR_SUBSTRINGS = ['door'];
const GLASS_SUBSTRINGS = ['glass', 'window', 'win'];

const doesTextIncludeSomeSubstring = (text: string, substrings: string[]): boolean => {
  return substrings.some(substring => text.includes(substring));
};

export class naOcclusionPortalEntityMetadata {
  public entity: CEntityDef;
  public entityModelHashKey: number;

  public linkType: number;
  public maxOcclusion: number;

  public isDoor: boolean;
  public isGlass: boolean;

  constructor({ entity, linkType }: naOcclusionPortalEntityMetadataConstructor) {
    this.entity = entity;
    this.entityModelHashKey = joaat(entity.archetypeName);

    this.linkType = linkType;

    this.isDoor = doesTextIncludeSomeSubstring(this.entity.archetypeName, DOOR_SUBSTRINGS);
    this.isGlass = doesTextIncludeSomeSubstring(this.entity.archetypeName, GLASS_SUBSTRINGS);

    this.maxOcclusion = 0;

    if (this.isDoor) {
      this.maxOcclusion = 0.7;
    }

    if (this.isGlass) {
      this.maxOcclusion = 0.4;
    }
  }
}
