import { useContext } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import flag from '../../../../Assets/peru.png'
import bird from '../../../../Assets/bird.svg'
import plants from '../../../../Assets/plants.svg'
import woman from '../../../../Assets/woman.svg'
import heart from '../../../../Assets/heart.gif'
import { motion } from 'framer-motion'
import SwitchLogin from './SwitchLogin'
import { AuthContext } from '../../../../Context/auth/AuthContext'

const Login = () => {
  const { login } = useContext(AuthContext)
  // const navigate = useNavigate();

  const validar = Yup.object().shape({
    email: Yup.string().email('formato invalido').required('es requerido'),
    password: Yup.string().required('es requerido')
  })

  return (
    <div className=" relative flex h-screen items-center  justify-center">
      {/* ADITIONALS */}

      <motion.img
        className="absolute top-10 right-10 w-20"
        key={bird}
        src={bird}
        initial={{ y: -300, opacity: 0, rotate: -20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      <div className="flex  max-w-5xl items-center justify-center ">
        <div className="flex w-full flex-col items-center gap-5 p-10 font-poppins md:w-1/2">
          <p className="w-72 text-left sm:w-80">Iniciar sesion con</p>

          <SwitchLogin />
          <Formik
            initialValues={{
              email: 'yelsin@gmail.com',
              password: 'Ilovelife@321'
            }}
            validationSchema={validar}
            onSubmit={async (values) => {
              await login(values.email, values.password)
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="off" className="">
                <div className=" relative flex w-72 flex-col gap-y-7 sm:w-80">
                  {/* email */}
                  <div>
                    <div className="flex gap-x-1 ">
                      <label htmlFor="password" className="text-gray-500">
                        Numero de teléfono
                      </label>
                      {errors.email && touched.email ? (
                        <div className="text-rose-400">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="flex gap-x-10 ">
                      <div className="flex items-center gap-x-1">
                        <img src={flag} className="h-10 w-10" />
                        <p className="text-gray-400">+51</p>
                      </div>
                      <Field
                        autoComplete={'off'}
                        className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none"
                        name="email"
                        id="email"
                      />
                    </div>
                  </div>

                  {/* password */}

                  <div>
                    <div className="flex gap-x-1">
                      <label htmlFor="password" className="text-gray-500">
                        Password
                      </label>
                      {errors.password && touched.password ? (
                        <div className="text-rose-400">{errors.password}</div>
                      ) : null}
                    </div>

                    <Field
                      autoComplete="new-password"
                      className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none"
                      name="password"
                      id="password"
                      type="password"
                    />
                  </div>

                  {/* button */}
                  <button className="rounded-sm bg-color_green_7 py-3 text-lg font-semibold text-white">
                    INICIAR
                  </button>

                  <div className="flex justify-between gap-x-7 text-blue-600">
                    <button className="flex w-1/2 items-center justify-center gap-x-2 bg-cyan-100/30 py-2">
                      <img src="https://img.icons8.com/color/24/000000/google-logo.png" />
                      Google
                    </button>
                    <button className="flex w-1/2 items-center justify-center gap-x-2 bg-cyan-100/30 py-2">
                      <img src="https://img.icons8.com/color/24/000000/facebook-new.png" />
                      Facebook
                    </button>
                  </div>

                  <button
                    to="/auth/restore"
                    className="cursor-pointer text-center text-color_green_4"
                  >
                    <p className="mb-3 cursor-pointer text-center text-gray-500">
                      Olvidé mis credenciales
                    </p>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="hidden p-10 md:flex md:w-1/2 ">
          <div className="flex w-10/12 justify-center">
            <div className="w-8/12">
              <img src={woman} />
              <img src={plants} />
              <h2 className="flex w-full justify-center pt-7 text-center text-2xl font-bold ">
                Pase casero
                <img className="w-8" src={heart} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
