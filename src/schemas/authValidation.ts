import * as yup from "yup";

export const validAuth = yup.object().shape({
 email: yup.string().email('formato invalido').required('es requerido'),
 password: yup.string().required('es requerido')
})