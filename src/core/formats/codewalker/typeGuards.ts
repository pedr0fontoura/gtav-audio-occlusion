import * as XML from '../../types/xml';

const hasProperties = <T>(object: T, properties: (keyof T)[]): boolean => {
  const keys = Object.keys(object);

  return properties.every(property => keys.includes(property as string));
};

export const isXMLCMapData = (variableToCheck: any): variableToCheck is XML.Ymap => {
  return hasProperties(variableToCheck as XML.Ymap, ['CMapData']);
};

export const isXMLCEntityDef = (variableToCheck: any): variableToCheck is XML.CEntityDef => {
  return hasProperties(variableToCheck as XML.CEntityDef, ['archetypeName', 'position']);
};

export const isXMLCArchetypeDef = (variableToCheck: any): variableToCheck is XML.Archetype => {
  return hasProperties(variableToCheck as XML.Archetype, ['bbMax', 'bbMin', 'bsCentre', 'flags', 'lodDist', 'name']);
};

export const isXMLCMloArchetypeDef = (variableToCheck: any): variableToCheck is XML.CMloArchetypeDef => {
  return isXMLCArchetypeDef(variableToCheck) && variableToCheck.$.type === 'CMloArchetypeDef';
};

export const isXMLCMapTypes = (variableToCheck: any): variableToCheck is XML.Ytyp => {
  return hasProperties(variableToCheck as XML.Ytyp, ['CMapTypes']);
};

export const isXMLCMloRoomDef = (variableToCheck: any): variableToCheck is XML.CMloRoomDef => {
  return hasProperties(variableToCheck as XML.CMloRoomDef, ['name', 'portalCount']);
};

export const isXMLCMloPortalDef = (variableToCheck: any): variableToCheck is XML.CMloPortalDef => {
  return hasProperties(variableToCheck as XML.CMloPortalDef, ['roomFrom', 'roomTo', 'flags', 'attachedObjects']);
};
