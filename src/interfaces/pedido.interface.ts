import { IDireccion } from "./direccion.interface";
import { ILista } from "./lista.interface";
import { IUsuario } from './usuario.interface';

export interface IPedido {
  numero: string;
  codigo: string;
  direccion: IDireccion;
  estado: EstadoPedido;
  total: number;
  subTotal: number;
  descuento: number;
  procentajeDescuento: number;
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