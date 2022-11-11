import { InteriorAPI } from '@/electron/common/types/interior';
import { SerializedNaOcclusionPortalEntityMetadata } from '@/electron/common/types/naOcclusionInteriorMetadata';

export * from './components/Entities';

const { API } = window;

export const updatePortalEntity = async (
  identifier: string,
  portalInfoIndex: number,
  entityIndex: number,
  data: Partial<SerializedNaOcclusionPortalEntityMetadata>,
): Promise<void> => {
  console.log(`Updating entity ${entityIndex} from portal ${portalInfoIndex}: `, data);

  API.send(InteriorAPI.UPDATE_PORTAL_INFO_ENTITY, identifier, portalInfoIndex, entityIndex, data);
};
