import * as yup from "yup";

export const validAuth = yup.object().shape({
 correo: yup.string().email('formato invalido').required('es requerido'),
 password: yup.string().required('es requerido')
})


 export const validarRegistro = yup.object().shape({
  correo: yup.string().email('formato invalido').required('es requerido'),
  password: yup.string().required('es requerido')
                        .min(4,"con pocos carácteres")
                        .max(30, "maximo 30 letras")
})