import * as XML from '../types/xml';

export const isXMLCMapData = (variableToCheck: any): variableToCheck is XML.Ymap => {
  return !!(variableToCheck as XML.Ymap).CMapData;
};

export const isXMLCEntityDef = (variableToCheck: any): variableToCheck is XML.CEntityDef => {
  const XMLCEntityDef = variableToCheck as XML.CEntityDef;

  return !!XMLCEntityDef.$.type && !!XMLCEntityDef.archetypeName && !!XMLCEntityDef.position;
};

export const isXMLCArchetypeDef = (variableToCheck: any): variableToCheck is XML.Archetype => {
  const XMLArchetypeDef = variableToCheck as XML.Archetype;

  return !!XMLArchetypeDef.$.type && !!XMLArchetypeDef.name && !!XMLArchetypeDef.flags;
};

export const isXMLCMloArchetypeDef = (variableToCheck: any): variableToCheck is XML.CMloArchetypeDef => {
  const XMLCMloArchetypeDef = variableToCheck as XML.CMloArchetypeDef;

  return (
    isXMLCArchetypeDef(XMLCMloArchetypeDef) &&
    !!XMLCMloArchetypeDef.entities &&
    !!XMLCMloArchetypeDef.rooms &&
    !!XMLCMloArchetypeDef.portals
  );
};

export const isXMLCMapTypes = (variableToCheck: any): variableToCheck is XML.Ytyp => {
  return !!(variableToCheck as XML.Ytyp).CMapTypes;
};

export const isXMLCMloRoomDef = (variableToCheck: any): variableToCheck is XML.CMloRoomDef => {
  const XMLCMloRoomDef = variableToCheck as XML.CMloRoomDef;

  return !!XMLCMloRoomDef.name && !!XMLCMloRoomDef.portalCount;
};

export const isXMLCMloPortalDef = (variableToCheck: any): variableToCheck is XML.CMloPortalDef => {
  const XMLCMloPortalDef = variableToCheck as XML.CMloPortalDef;

  return (
    !!XMLCMloPortalDef.roomFrom &&
    !!XMLCMloPortalDef.roomTo &&
    !!XMLCMloPortalDef.attachedObjects &&
    !!XMLCMloPortalDef.flags
  );
};
