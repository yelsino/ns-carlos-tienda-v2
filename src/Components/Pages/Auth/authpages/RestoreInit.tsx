import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import LOGO from '../../../assets/img/logo.png'
// import { IconCar, IconKey } from '../../../Components/Icons'
// import { Field, Form, Formik } from 'formik'
// import Titulo from '../../../Components/utilidades/Titulo'
// import ButtonAction from '../../../Components/utilidades/ButtonAction'
// import Parrafo from '../../../Components/utilidades/Parrafo'
// import * as Yup from 'yup'

// const RestoreInit = () => {
//   const navigate = useNavigate()
//   const validar = Yup.object().shape({
//     email: Yup.string().email('formato invalido').required('es requerido'),
//     password: Yup.string().required('es requerido')
//   })
//   return (
//     <Formik
//       initialValues={{
//         email: 'yelsino@321.com',
//         password: '321321'
//       }}
//       validationSchema={validar}
//       onSubmit={(values) => {
//         navigate('/auth/restore/finalizado')
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
//           <Titulo texto="¿SIN CREDENCIALES?" />
//           <Parrafo
//             text="
//               Si no recuerda ningún tipo de credencial, contacta con su supervisor, directamente.
//               "
//           />

//           <div className="relative w-72 sm:w-80">
//             <div className="flex gap-x-1">
//               <label htmlFor="password" className="text-color_green_6">
//                 n° documento
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
//                 type="text"
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

//           <div className="mt-5 w-72 sm:w-80">
//             <ButtonAction type="submit" text="CONTINUAR" />
//             <Link to="/auth/login">
//               <p className="mb-3 cursor-pointer text-right text-color_green_6">
//                 Ya me acordé!
//               </p>
//             </Link>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   )
// }

// export default RestoreInit
