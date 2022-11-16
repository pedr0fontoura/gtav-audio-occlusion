import { InteriorAPI } from '@/electron/common/types/interior';
import { SerializedNaOcclusionPortalInfoMetadata } from '@/electron/common/types/naOcclusionInteriorMetadata';

export * from './components/Portals';

const { API } = window;

export const updatePortalInfo = async (
  identifier: string,
  portalInfoIndex: number,
  data: Partial<SerializedNaOcclusionPortalInfoMetadata>,
): Promise<void> => {
  console.log(`Updating portal ${portalInfoIndex}: `, data);

  API.send(InteriorAPI.UPDATE_PORTAL_INFO, identifier, portalInfoIndex, data);
};
