
import { IUsuario } from './usuario.interface';

export interface IVentaLocal {
  monto: number;
  vendedor: IUsuario;
  comprador: IUsuario;
  evidencias: Array<string>;
}
