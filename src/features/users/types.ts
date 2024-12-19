
import { IGeneral } from "../generalTypes";
import { IRole } from "../roles/types";

export interface IUserResponse extends IGeneral {
  email: string;
  full_name: string;
  roles: IRole[];
  phone_number: string;
}

export interface IUserCreate {
  email: string;
  full_name: string;
  password: string;
}

export interface IUserBaseRequest {
  email: string;
  full_name: string;
  password: string;
}

export interface IUserUpdateRequest extends IUserBaseRequest {
  roles: number[];
  constructions: number[];
}
