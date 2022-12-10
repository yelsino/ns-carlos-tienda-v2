import { IDireccion } from "./direccion.interface";
import { ILista } from "./lista.interface";
import { IUsuario } from './usuario.interface';

export interface IPedido {
  numero: String;
  codigo: String;
  direccion: IDireccion;
  estado: EstadoPedido;
  total: Number;
  subTotal: Number;
  descuento: Number;
  procentajeDescuento: Number;
  usuario: IUsuario;
  lista: ILista;
  entrega: Date;
}

type EstadoPedido =
  | 'RECIBIDO'
  | 'PREPARANDO'
  | 'ENVIADO'
  | 'ENTREGADO'
  | 'RECLAMO'