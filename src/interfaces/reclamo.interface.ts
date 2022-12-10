import { IPedido } from "./pedido.interface";

export interface IReclamo {
  asunto: String
  descripcion: String
  pedido: IPedido
  numero: String
  codigo: String
  evidencias: String
  estado: EstadoReclamo
}

type EstadoReclamo =
  | 'PENDIENTE'
  | 'ATENCION'
  | 'ATENDIDO'
  | 'CANCELADO'