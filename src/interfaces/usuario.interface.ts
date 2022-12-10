import { IAuth } from "./auth.interface";
import { IRol } from "./rol.interface";

export interface IUsuario extends IAuth {
    id: string;
    nombres: string;
    apellidos: string;
    sobreNombre: string;
    celular: string;
    online: Boolean;
    roles: Array<IRol>;
    foto: string;
    documento: string;
}
