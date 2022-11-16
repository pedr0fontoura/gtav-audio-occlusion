export enum SettingsAPI {
  GET = 'settings/get',
  SET = 'settings/set',
}

export type SerializedSettings = {
  bulkEditPortalEntities: boolean;
  writeDebugInfoToXML: boolean;
};
