export interface TableId<T> {
  id: T;
}

export interface TableCommon {
  readonly db_created_at: number; // Timestamp in seconds
  db_updated_at: number; // Timestamp in seconds
}

export interface ProjectModel {
  name: string;
  teamAlphaColor: string;
  teamBravoColor: string;
  teamNeutralColor: string;
  data: Uint8Array;
}


export interface ProjectTable extends ProjectModel, TableCommon, Partial<TableId<number>> { }