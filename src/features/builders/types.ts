import { PaginatedRequest } from '@/utils/requestUtils';
import { IArea } from '../areas/types';
import { IOrg } from '@/features/generalTypes';

export interface IBuilderRequest extends PaginatedRequest {
  some?: string;
}

export interface IBuilderAddress {
  areas: IArea[];
  address: string;
  address_additional_info: string;
}

export interface IBuilder extends IBuilderAddress, IOrg {
  id: number;
}
