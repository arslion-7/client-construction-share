import { IGeneral } from '../generalTypes';

export interface IGeneralContractor extends IGeneral {
  id: number;
  cert_number: number;
  cert_date: string; // ISO 8601 date format
  resolution_code: string;
  resolution_begin_date: string; // ISO 8601 date format
  resolution_end_date: string; // ISO 8601 date format
  org_name: string;
  head_position: string | null;
  head_full_name: string;
  org_additional_info: string | null;
}

export interfact IGeneralContractorRequest extends 