import { IReceiver } from './../receivers/types';
import { PaginatedRequest } from '@/utils/requestUtils';
import { IGeneral } from '../generalTypes';
import { IContractor } from '../generalContractors/types';
import { IUser } from '../users/types';
import { IBuilding } from '../buildings/types';
import { IBuilder } from '../builders/types';

export interface IRegistryRequest extends PaginatedRequest {
  some?: string;
}

export interface IRegistry extends IGeneral {
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
}
