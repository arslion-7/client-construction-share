import { PaginatedRequest } from '@/utils/requestUtils';
import { ICert, IOrg, IResolution } from '../generalTypes';

export interface IContractor extends IOrg, ICert, IResolution {
  t_b: number;
}

export interface IGeneralContractorRequest extends PaginatedRequest {
  some?: string;
}
