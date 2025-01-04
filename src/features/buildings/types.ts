import dayjs from 'dayjs';
import { PaginatedRequest } from '@/utils/requestUtils';
import { IArea } from '../areas/types';

export interface IBuildingRequest extends PaginatedRequest {
  some?: string;
}

export interface IBuildingAddress {
  areas: IArea[];
  street: string;
}

export interface IBuildingMain {
  t_b: number;
  ident_number?: number;
  kind: string;
  start_date: dayjs.Dayjs | null;
  end_date: dayjs.Dayjs | null;
  price: number;
  percentage: number;
}

export interface IBuildingOrder {
  order_whose_what: string;
  order_date?: dayjs.Dayjs | null;
  order_code?: string;
  order_additional_info?: string;
}

export interface IBuildingCert {
  cert_name?: string;
  cert_1_date?: dayjs.Dayjs | null;
  cert_1_code?: string;
  cert_2_date?: dayjs.Dayjs | null;
  cert_2_code?: string;
}

export interface IBuildingSquare {
  square_1?: number;
  square_1_name?: string;
  square_2?: number;
  square_2_name?: string;
  square_3?: number;
  square_3_name?: string;
  square_additional_info?: string;
}

export interface IBuilding
  extends IBuildingAddress,
    IBuildingMain,
    IBuildingOrder,
    IBuildingCert,
    IBuildingSquare {
  id: number;

  full_name?: string;
  area_full_name?: string;
}
