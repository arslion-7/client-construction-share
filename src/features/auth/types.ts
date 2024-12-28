export interface IRequestUser {
  email: string;
  password: string;
}

export interface IResponseUser {
  accessToken: string;
}

export interface IRequestResetPassword {
  id: string;
  password: string;
}
