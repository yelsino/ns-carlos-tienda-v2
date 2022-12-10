import { IUsuario } from "./usuario.interface"
import { IProducto } from './Producto.interface';

export interface ILista {
  nombre: String
  usuario: IUsuario
  productos: Array<DetailProduct>
}

interface DetailProduct {
  cantidades: Array<Cantidad>
  producto: IProducto
}

interface Cantidad {
  peso: Number
  precio: Number
  cantidad: Number
}
