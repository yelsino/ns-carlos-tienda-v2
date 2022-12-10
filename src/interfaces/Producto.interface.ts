import { ICategoria } from "./categoria.interface";

export interface IProducto {
  nombre: string;
  imagen: string;
  descripcion: string;
  marca: string;
  tipoVenta: TipoVenta;
  precioCompra: Number;
  precioVenta: Number;
  unidades: Number;
  sobrante: Number;
  cantidadPorUnidad: Number;
  envoltorio: Envoltorio;
  estados: EstadosProducto;
  visibilidad: Boolean;
  alertaCantidad: Number;
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
    peso: Number,
    precio: Number
  }