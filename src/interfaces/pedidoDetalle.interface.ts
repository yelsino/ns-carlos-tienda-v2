import { ILista } from "./lista.interface";
import { IPedido } from "./pedido.interface";

export interface IPedidoDetalle {
  detalleLista: ILista
  pedido: IPedido
  total: Number
}
