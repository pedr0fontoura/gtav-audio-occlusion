import * as XML from '../types/xml';

export const isXMLCMapData = (variableToCheck: any): variableToCheck is XML.Ymap => {
  return !!(variableToCheck as XML.Ymap).CMapData;
};

export const isXMLCEntityDef = (variableToCheck: any): variableToCheck is XML.CEntityDef => {
  const XMLCEntityDef = variableToCheck as XML.CEntityDef;

  return !!XMLCEntityDef.$.type && !!XMLCEntityDef.archetypeName && !!XMLCEntityDef.position;
};

export function isCMloArchetypeDef(variableToCheck: any): variableToCheck is XML.CMloArchetypeDef {
  return (variableToCheck as XML.CMloArchetypeDef).$.type === 'CMloArchetypeDef';
}

export function isCMloInstanceDef(variableToCheck: any): variableToCheck is XML.CMloInstanceDef {
  return (variableToCheck as XML.CMloInstanceDef).$.type === 'CMloInstanceDef';
}
