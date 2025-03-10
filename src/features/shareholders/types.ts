import { PaginatedRequest } from '@/utils/requestUtils';
import { IAddress, IGeneral, IOrg } from '@/features/generalTypes';

export interface IShareholderRequest extends PaginatedRequest {
  some?: string;
}

interface Phone extends IGeneral {
  kind: string;
  number: string;
  owner: string;
  shareholder_id: number;
}

export interface IShareholderDocs {
  passport_series: string;
  passport_number: number;
  patent_series: string;
  patent_number: number;
  cert_number: number;
  docs_additional_info: string;
}

export interface IShareholder extends IAddress, IOrg, IShareholderDocs {
  id: number;
  phones: Phone[];
}
