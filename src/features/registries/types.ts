import { IReceiver } from "./../receivers/types";
import { PaginatedRequest } from "@/utils/requestUtils";
import { IGeneral } from "../generalTypes";
import { IContractor } from "../generalContractors/types";
import { IUser } from "../users/types";
import { IBuilding } from "../buildings/types";
import { IBuilder } from "../builders/types";
import { IShareholder } from "../shareholders/types";
// import { IAreaStreetForm } from '@/components/form/AreaStreetForm';

export interface IRegistryRequest extends PaginatedRequest {
  some?: string;
  // 'old' -> only registries migrated from old_registries, 'new' -> only manual ones
  source?: string;
  // column filters
  t_b?: string;
  gc_ids?: string;
  user_ids?: string;
  shareholder_q?: string;
  builder_q?: string;
  building_q?: string;
}

export interface IRegistryFilterOption {
  id: number;
  name: string;
}

export interface IRegistryFilterOptions {
  general_contractors: IRegistryFilterOption[];
  users: IRegistryFilterOption[];
}

export interface IRegistryDates {
  reviewed_at?: string;
  registered_at?: string;
}

export interface IRegistryMail {
  mail_date?: string; // ISO string format for time
  mail_number?: string;
  delivered_date?: string; // ISO string format for time
  count?: number;
  queue?: number;
  min_to_mud_date?: string; // ISO string format for time
}

export interface IContract {
  builder_shareholder_number: string;
  builder_shareholder_date: string;
  // contract_builder_shareholder_areas: IAreaStreetForm;
  // contract_builder_shareholder_street: string;
  builder_contractor_number: string;
  builder_contractor_date: string;
  // contract_builder_contractor_areas: IAreaStreetForm;
  // contract_builder_contractor_street: string;
  builder_shareholder_additional_info: string;
  builder_contractor_additional_info: string;
}

export interface IRegistryDenial {
  denial_reason?: string;
  denial_date?: string;
  denial_additional_info?: string;
}

export interface IDuplicateTB {
  id: number;
  t_b: number;
}

// Verbatim legacy values copied from old_registries during migration.
// old_registry_id present => this registry comes from the old registry data.
export interface IRegistryOldData {
  old_registry_id?: number;
  old_t_b?: number;
  old_min_hat?: string;
  old_sene_hat_min_to_mud?: string;
  old_gurujy?: string;
  old_paychy?: string;
  old_sertnama_gurujy_paychy?: string;
  old_desga?: string;
  old_baha_umumy?: string;
  old_meydan_umumy?: string;
  old_kep_resminama?: string;
  old_emlak_paychy?: string;
  old_baha_paychy?: string;
  old_baha_1m2_paychy?: string;
  old_salgy_desga?: string;
  old_salgy_gurujy?: string;
  old_salgy_paychy?: string;
  old_bash_potr?: string;
  old_sertnama_gur_potr?: string;
  old_potratchy_komek?: string;
  old_shahadatnama?: string;
  old_ygtyyarnama?: string;
  old_patent_pasport?: string;
  old_sene_bashy_songy?: string;
  old_sene_seredilen?: string;
  old_sene_hasaba_alnan?: string;
  old_wezipe_alan_adam?: string;
  old_ady_alan_adam?: string;
  old_sene_san_sertnama?: string;
  old_ady_paychy_alan?: string;
  old_sene_paychy_alan?: string;
  old_login?: string;
}

export interface IRegistry
  extends IGeneral,
    IRegistryDates,
    IRegistryMail,
    IContract,
    IRegistryDenial,
    IRegistryOldData {
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
  shareholder_id?: number;
  shareholder: IShareholder;
  shareholder_description?: string;
  general_contractor_description?: string;
  building_description?: string;
  builder_description?: string;
}
