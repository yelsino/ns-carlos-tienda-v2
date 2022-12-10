import { ICategoria } from "./categoria.interface";

export interface IProducto {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  marca: string;
  tipoVenta: TipoVenta;
  precioCompra: number;
  precioVenta: number;
  unidades: number;
  sobrante: number;
  cantidadPorUnidad: number;
  envoltorio: Envoltorio;
  estados: EstadosProducto;
  visibilidad: boolean;
  alertaCantidad: number;
  categoria: ICategoria;
  tags: Array<string>;
  precios: Array<Precio>,
}

export type TipoVenta = 
| 'FRACCIONES' 
| 'KILOGRAMOS' 
| 'UNIDADES' 
| 'LITROS'

type Envoltorio = 
 | 'COSTALES'
 | 'BOLSAS'
 | 'CAJAS'

 type EstadosProducto =
  | 'CON_STOCK'
  | 'SIN_STOCK'
  | 'POR_AGOTAR'

  interface Precio {
    id: string
    peso: number
    precio: number
  }

  export enum PRODUCTO_VENTA {
    UNIDADES = "UNIDADES",
    KILOGRAMOS = "KILOGRAMOS",
    LITROS = "LITROS",
    FRACCIONES = "FRACCIONES",
   }
   
   

   
export interface ProductsList {
  quantities: ItemQuantity[]
  product: IProducto
  _id: string
}

interface ItemQuantity {
  weight: number
  price: number
  quantity: number
  _id?: string
}
