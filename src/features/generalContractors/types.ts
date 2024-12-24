import { PaginatedRequest } from '@/utils/requestUtils';
import { IGeneral } from '../generalTypes';
import { Dayjs } from 'dayjs';

export interface IGeneralContractor extends IGeneral {
  t_b: number;
  cert_number: number;
  cert_date: string | Dayjs; // ISO 8601 date format
  resolution_code: string;
  resolution_begin_date: string | Dayjs; // ISO 8601 date format
  resolution_end_date: string | Dayjs; // ISO 8601 date format
  org_name: string;
  head_position: string | null;
  head_full_name: string;
  org_additional_info: string | null;
}

export interface IGeneralContractorRequest extends PaginatedRequest {
  some?: string;
}
