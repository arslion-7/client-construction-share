import { PaginatedRequest } from '@/utils/requestUtils';

export interface IReceiver {
  t_b: number;
  citizen_status: string;
  org_name: string;
  department: string;
  position: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  additional_info: string;
}

export interface IReceiverRequest extends PaginatedRequest {
  some?: string;
}
