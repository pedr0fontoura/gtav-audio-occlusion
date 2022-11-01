import { SerializedNaOcclusionPortalEntityMetadata } from '@/electron/common/types/naOcclusionInteriorMetadata';

export * from './components/Entities';

export const updatePortalEntity = async (
  portalInfoIndex: number,
  entityIndex: number,
  data: Partial<SerializedNaOcclusionPortalEntityMetadata>,
): Promise<void> => {
  console.log(`Updating entity ${entityIndex} from portal ${portalInfoIndex}: `, data);
};
