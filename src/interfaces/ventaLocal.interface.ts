
import { IUsuario } from './usuario.interface';

export interface IVentaLocal {
  monto: Number;
  vendedor: IUsuario;
  comprador: IUsuario;
  evidencias: Array<string>;
}
