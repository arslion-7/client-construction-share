export interface IGeneral {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IResponse<T> {
  data: T;
}
