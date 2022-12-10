import { IAuth } from "./Auth.interface";
import { IRol } from "./rol.interface";

export interface IUsuario extends IAuth {
    nombres: String;
    apellidos: String;
    sobreNombre: String;
    celular: String;
    online: Boolean;
    roles: Array<IRol>;
    foto: String;
    documento: String;
}
