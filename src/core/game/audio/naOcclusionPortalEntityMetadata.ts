import { joaat } from '../../utils';

import { CEntityDef } from '../CEntityDef';

type naOcclusionPortalEntityMetadataConstructor = {
  entity: CEntityDef;
  linkType: number;
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

    this.isDoor = this.entity.archetypeName.includes('door');
    this.isGlass = this.entity.archetypeName.includes('glass') || this.entity.archetypeName.includes('window');

    if (this.isDoor) {
      this.maxOcclusion = 0.7;
    }

    if (this.isGlass) {
      this.maxOcclusion = 0.4;
    }
  }
}
