import { IReceiver } from './../receivers/types';
import { PaginatedRequest } from '@/utils/requestUtils';
import { IGeneral } from '../generalTypes';
import { IContractor } from '../generalContractors/types';
import { IUser } from '../users/types';
import { IBuilding } from '../buildings/types';
import { IBuilder } from '../builders/types';
import { IShareholder } from '../shareholders/types';

export interface IRegistryRequest extends PaginatedRequest {
  some?: string;
}

export interface IRegistryDates {
  reviewed_at?: string;
  registered_at?: string;
}

export interface IRegistryMail {
  mail_date?: string; // ISO string format for time
  mail_number?: string;
  delivered_date?: string; // ISO string format for time
  count?: number;
  queue?: number;
  min_to_mud_date?: string; // ISO string format for time
}

export interface IRegistry extends IGeneral, IRegistryDates, IRegistryMail {
  t_b: number;
  user_id: number | null;
  user: IUser | null;
  general_contractor_id?: number;
  general_contractor: IContractor;
  sub_contractor_id: number;
  sub_contractor: IContractor;
  building_id?: number;
  building: IBuilding;
  builder_id?: number;
  builder: IBuilder;
  receiver_id?: number;
  receiver: IReceiver;
  shareholder_id?: number;
  shareholder: IShareholder;
}
