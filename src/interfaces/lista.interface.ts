import { IUsuario } from "./usuario.interface"
import { IProducto } from './Producto.interface';

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
  id: string
  peso: number
  precio: number
  cantidad: number
}
