export interface RouterContext {
 nombre: Roles;
}

type Roles = 
 | 'USUARIO'
 | 'CASERO'
 | 'TRABAJADOR'
 | 'ADMIN'
