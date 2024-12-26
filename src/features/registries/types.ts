import { PaginatedRequest } from '@/utils/requestUtils';
import { IGeneral } from '../generalTypes';

export interface IRegistryRequest extends PaginatedRequest {
  some?: string;
}

export interface IRegistry extends IGeneral {
  t_b: number;
  general_contractor?: number;
}
