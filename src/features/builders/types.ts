import { PaginatedRequest } from '@/utils/requestUtils';
import { IAddress, IOrg } from '@/features/generalTypes';

export interface IBuilderRequest extends PaginatedRequest {
  some?: string;
}

export interface IBuilder extends IAddress, IOrg {
  id: number;
}
