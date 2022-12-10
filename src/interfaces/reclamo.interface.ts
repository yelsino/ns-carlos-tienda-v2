import { IPedido } from "./pedido.interface";

export interface IReclamo {
  asunto: string
  descripcion: string
  pedido: IPedido
  numero: string
  codigo: string
  evidencias: string
  estado: EstadoReclamo
}

type EstadoReclamo =
  | 'PENDIENTE'
  | 'ATENCION'
  | 'ATENDIDO'
  | 'CANCELADO'