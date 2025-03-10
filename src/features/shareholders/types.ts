import { PaginatedRequest } from '@/utils/requestUtils';
import { IAddress, IOrg } from '@/features/generalTypes';

export interface IShareholderRequest extends PaginatedRequest {
  some?: string;
}

export interface IShareholder extends IAddress, IOrg {
  id: number;
}
