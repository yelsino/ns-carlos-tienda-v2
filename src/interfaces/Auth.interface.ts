import { IUsuario } from "./usuario.interface";

export interface IAuth {
  correo: string;
  password: string;
  type: string;
}

export interface IAuthRest {
  token: string
  usuario: IUsuario
}

