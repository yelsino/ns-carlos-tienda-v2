import { IRol } from "./rol.interface";
import { IAuth } from './Auth.interface';

export interface IUsuario extends IAuth {
    id: string;
    nombres: string;
    apellidos: string;
    sobreNombre: string;
    celular: string;
    online: boolean;
    roles: Array<IRol>;
    foto: string;
    documento: string;
}
