import { IUsuario } from "./usuario.interface";

export interface ITarjetaPago {
  titular: String;
  numero: String;
  expiracion: Date;
  cliente: IUsuario;
}
