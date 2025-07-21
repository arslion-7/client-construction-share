import { Dayjs } from 'dayjs';
import { IArea } from './areas/types';

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
  org_type: string | null;
  org_name: string;
  head_position: string | null;
  head_full_name: string;
  org_additional_info: string | null;
}

export interface ICert {
  cert_number: string | number;
  cert_date: Dayjs | string;
}

export interface IResolution {
  resolution_code: string;
  resolution_begin_date: string | Dayjs; // ISO 8601 date format
  resolution_end_date: string | Dayjs; // ISO 8601 date format
}

export interface IAddress {
  areas: IArea[];
  address: string;
  address_additional_info: string;
}
