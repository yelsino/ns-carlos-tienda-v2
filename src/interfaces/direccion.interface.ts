import { IUsuario } from "./usuario.interface"

export interface IDireccion {
 id: string
 nombre: string
 referencia: string
 usuario: IUsuario
}
