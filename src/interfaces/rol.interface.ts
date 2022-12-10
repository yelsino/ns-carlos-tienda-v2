export interface IRol {
  nombre: Roles;
}

type Roles = 
  | 'USUARIO'
  | 'CASERO'
  | 'TRABAJADOR'
  | 'ADMIN'
