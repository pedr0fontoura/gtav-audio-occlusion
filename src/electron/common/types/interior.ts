export type CreateInteriorDTO = {
  name: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
};

export type SerializedInterior = {
  identifier: string;
  mapDataFilePath: string;
  mapTypesFilePath: string;
};
