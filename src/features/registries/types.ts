import { PaginatedRequest } from '@/utils/requestUtils';
import { IGeneral } from '../generalTypes';
import { IContractor } from '../generalContractors/types';
import { IUser } from '../users/types';

export interface IRegistryRequest extends PaginatedRequest {
  some?: string;
}

export interface IRegistry extends IGeneral {
  t_b: number;
  general_contractor_id?: number;
  general_contractor: IContractor;
  user_id: number | null;
  user: IUser | null;
}
