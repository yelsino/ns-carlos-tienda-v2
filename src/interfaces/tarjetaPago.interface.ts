import { IUsuario } from "./usuario.interface";

export interface ITarjetaPago {
  titular: string;
  numero: string;
  expiracion: Date;
  cliente: IUsuario;
}
