import { IAbonoCredito } from "./abonoCredito.interface";
import { IUsuario } from "./usuario.interface";

export interface ICredito {
 cliente: IUsuario
 codigo: string
 monto: Number
 abono: IAbonoCredito
 tipoPago: string
}
