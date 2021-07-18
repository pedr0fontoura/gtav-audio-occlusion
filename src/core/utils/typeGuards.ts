import * as XML from '../types/xml';

export function isCMloArchetypeDef(variableToCheck: any): variableToCheck is XML.CMloArchetypeDef {
  return (variableToCheck as XML.CMloArchetypeDef).$.type === 'CMloArchetypeDef';
}
