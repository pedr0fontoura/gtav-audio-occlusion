import * as XML from '../types/xml';

export function isCMloArchetypeDef(variableToCheck: any): variableToCheck is XML.CMloArchetypeDef {
  return (variableToCheck as XML.CMloArchetypeDef).$.type === 'CMloArchetypeDef';
}

export function isCMloInstanceDef(variableToCheck: any): variableToCheck is XML.CMloInstanceDef {
  return (variableToCheck as XML.CMloInstanceDef).$.type === 'CMloInstanceDef';
}
