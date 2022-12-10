import { IAbonoCredito } from "./abonoCredito.interface";
import { IUsuario } from "./usuario.interface";

export interface ICredito {
 cliente: IUsuario
 codigo: String
 monto: Number
 abono: IAbonoCredito
 tipoPago: String
}
