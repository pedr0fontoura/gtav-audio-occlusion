import { CMloInstanceDef } from './game';
import { naOcclusionInteriorMetadata } from './game/audio';

export const createNaOcclusionInteriorMetadata = (interior: CMloInstanceDef): naOcclusionInteriorMetadata => {
  return new naOcclusionInteriorMetadata({ interior });
};
