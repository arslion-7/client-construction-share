export interface IGeneral {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IResponse<T> {
  data: T;
}

export interface IOrg extends IGeneral {
  org_name: string;
  head_position: string | null;
  head_full_name: string;
  org_additional_info: string | null;
}
