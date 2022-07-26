import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import LOGO from '../../../assets/img/logo.png'
// import { Field, Form, Formik } from 'formik'
// import Titulo from '../../../Components/utilidades/Titulo'
// import ButtonAction from '../../../Components/utilidades/ButtonAction'
// import { v4 as uuidv4 } from 'uuid'
// import Parrafo from '../../../Components/utilidades/Parrafo'
// import PuntosNext from '../../../Components/utilidades/PuntosNext'
// import * as Yup from 'yup'
// import { useContext } from 'react'
// import { UserContext } from '../../../context/user/UserContext'
// import { IconCar, IconEmail, IconKey } from 'Components/Atoms/Icons'

// const rutas = [
//   { id: uuidv4(), link: '/auth/registro/datos-basicos' },
//   { id: uuidv4(), link: '/auth/registro/datos-personales' },
//   { id: uuidv4(), link: '/auth/registro/datos-contacto' }
// ]

// const DatosBasicos = () => {
//   const { users, setUser } = useContext(UserContext)

//   const { newWorker } = users

//   const navigate = useNavigate()

//   const validar = Yup.object().shape({
//     email: Yup.string().email('formato invalido').required('es requerido'),
//     password: Yup.string().required('es requerido')
//   })
//   return (
//     <Formik
//       initialValues={{
//         email: newWorker.email,
//         password: newWorker.password
//       }}
//       validationSchema={validar}
//       onSubmit={(values) => {
//         setUser((data) => ({
//           ...data,
//           newWorker: {
//             ...data.newWorker,
//             email: values.email,
//             password: values.password
//           }
//         }))
//         navigate('/auth/registro/datos-personales')
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form className="flex w-full flex-col items-center gap-5 p-10 md:w-1/2">
//           <div className=" w-24 select-none object-contain  sm:w-32 md:hidden md:w-32">
//             <img src={LOGO} alt="logo negocios carlos" />
//           </div>
//           <div className="absolute top-5 right-5 hidden  items-center  justify-center gap-x-2 font-poppins text-lg font-extrabold text-color_green_4  sm:top-10 sm:right-10 sm:flex">
//             <span>
//               <IconCar />
//             </span>
//             <h1>Administrador</h1>
//           </div>
//           <Titulo texto="REGISTRO" />
//           <Parrafo
//             text="
//               Más vale una contraseña segura que una amonestación segura  ; )
//               "
//           />
//           <div className=" relative w-72 sm:w-80">
//             <div className="flex gap-x-1">
//               <label htmlFor="password" className="text-color_green_6">
//                 Email
//               </label>
//               {errors.email && touched.email ? (
//                 <div className="text-color_green_7">{errors.email}</div>
//               ) : null}
//             </div>
//             <Field
//               autoComplete={'off'}
//               className="w-full rounded-md bg-color_green_3   p-4 text-base text-color_green_7  outline-none sm:text-lg "
//               name="email"
//               id="email"
//             />
//             <label
//               htmlFor="email"
//               className="absolute right-2 top-7 bg-color_green_3 p-3 text-color_green_7 sm:p-4"
//             >
//               <IconEmail />
//             </label>
//           </div>
//           <div className="relative w-72 sm:w-80">
//             <div className="flex gap-x-1">
//               <label htmlFor="password" className="text-color_green_6">
//                 Contraseña
//               </label>
//               {errors.password && touched.password ? (
//                 <div className="text-color_green_7">{errors.password}</div>
//               ) : null}
//             </div>
//             <div className="relative flex items-center">
//               <Field
//                 autoComplete={'off'}
//                 name="password"
//                 id="password"
//                 type="password"
//                 className="w-full rounded-md bg-color_green_3   p-4 text-base text-color_green_7  outline-none sm:text-lg"
//               />
//               <label
//                 htmlFor="email"
//                 className="absolute right-5 text-color_green_7"
//               >
//                 <IconKey />
//               </label>
//             </div>
//           </div>

//           <div className="w-72 sm:w-80">
//             <ButtonAction type="submit" text="CONTINUAR" />
//             <Link to="/auth/login">
//               <p className="mb-3 cursor-pointer text-right text-color_green_6">
//                 Ya estoy registrado
//               </p>
//             </Link>
//           </div>
//           <PuntosNext puntos={rutas} />
//         </Form>
//       )}
//     </Formik>
//   )
// }

// export default DatosBasicos
