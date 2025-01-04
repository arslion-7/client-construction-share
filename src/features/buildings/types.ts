import dayjs from 'dayjs';
import { PaginatedRequest } from '@/utils/requestUtils';
import { IArea } from '../areas/types';

export interface IBuildingRequest extends PaginatedRequest {
  some?: string;
}

export interface IBuildingMain {
  kind: string;
  start_date: dayjs.Dayjs | null;
  end_date: dayjs.Dayjs | null;
  price: number;
  percentage: number;
}

export interface IBuilding extends IBuildingMain {
  id: number;
  ident_number?: number;
  areas: IArea[];
  street: string;
  order_whose_what: string;
  order_date?: dayjs.Dayjs | null;
  order_code?: string;
  order_additional_info?: string;
  cert_name?: string;
  cert_1_date?: dayjs.Dayjs | null;
  cert_1_code?: string;
  cert_2_date?: dayjs.Dayjs | null;
  cert_2_code?: string;
  square_1?: number;
  square_1_name?: string;
  square_2?: number;
  square_2_name?: string;
  square_3?: number;
  square_3_name?: string;
  square_additional_info?: string;
  full_name?: string;
  area_full_name?: string;
}
