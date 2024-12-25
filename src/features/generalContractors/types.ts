import { PaginatedRequest } from '@/utils/requestUtils';
import { IOrg } from '../generalTypes';
import { Dayjs } from 'dayjs';

export interface IGeneralContractor extends IOrg {
  t_b: number;
  cert_number: number;
  cert_date: string | Dayjs; // ISO 8601 date format
  resolution_code: string;
  resolution_begin_date: string | Dayjs; // ISO 8601 date format
  resolution_end_date: string | Dayjs; // ISO 8601 date format
}

export interface IGeneralContractorRequest extends PaginatedRequest {
  some?: string;
}
