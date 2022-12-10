import { IUsuario } from "./usuario.interface"
import { IProducto } from './producto.interface';

export interface ILista {
  id: string
  nombre: string
  usuario: IUsuario
  productos: Array<DetailProduct>
}

interface DetailProduct {
  cantidades: Array<Cantidad>
  producto: IProducto
}

interface Cantidad {
  peso: number
  precio: number
  cantidad: number
}
