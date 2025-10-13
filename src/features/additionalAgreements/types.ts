export interface AdditionalAgreement {
  id: number;
  registry_id: number;
  agreement_number?: string;
  agreement_date?: string;
  reason?: string;
  additional_info?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateAdditionalAgreementRequest {
  registry_id: number;
  agreement_number?: string;
  agreement_date: string;
  reason?: string;
  additional_info?: string;
}

export interface UpdateAdditionalAgreementRequest {
  agreement_number?: string;
  agreement_date: string;
  reason?: string;
  additional_info?: string;
}
