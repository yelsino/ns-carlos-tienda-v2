import { useContext, useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import bird from '../../../../Assets/bird.svg'
import plants from '../../../../Assets/plants.svg'
import man from '../../../../Assets/man.svg'
import heart from '../../../../Assets/heart.gif'
import { motion } from 'framer-motion'
import SwitchLogin from './SwitchLogin'
import { AuthContext } from 'Context/auth/AuthContext'
import { GoogleLogin } from 'Components/Moleculas/GoogleLogin'
import { FacebookLoginButton } from 'Components/Moleculas/FacebookLogin'
import { Mobile } from './WithWhat/Mobile'
import { Correo } from './WithWhat/Correo'
import { Link } from 'react-router-dom'

type WithWhat = 'correo' | 'mobile'

const Registro = () => {
  const { userRegister, loading } = useContext(AuthContext)

  const [withWhat, setWithWhat] = useState<WithWhat>('correo')

  const validar = Yup.object().shape({
    email: Yup.string().email('formato invalido').required('es requerido'),
    password: Yup.string().required('es requerido')
                          .min(4,"con pocos carácteres")
                          .max(30, "maximo 30 letras")
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
          <p className="w-72 text-left sm:w-80">Registrarse con</p>

          <SwitchLogin setWithWhat={setWithWhat} />
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={validar}
            onSubmit={async (values) => {
              await userRegister({...values,type: 'email'})
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="new-password">
                <div className=" relative flex w-72 flex-col gap-y-7 sm:w-80">
                  {withWhat === 'correo' ? (
                    <Correo errors={errors} touched={touched} />
                  ) : (
                    <Mobile errors={errors} touched={touched} />
                  )}

                  {/* button */}
                  <button
                    disabled={loading}
                    className="rounded-sm bg-color_green_7 py-3 text-lg font-semibold text-white"
                    type="button"
                  >
                    {loading ? 'REGISTRANDOSE...' : 'REGISTRARME'}
                  </button>

                  <div className="flex justify-between gap-x-7 text-blue-600">
                    <GoogleLogin />
                    <FacebookLoginButton />
                  </div>

                  <Link
                    to="/auth/login"
                    className="mb-3 cursor-pointer text-center  text-gray-500 hover:text-blue-500"
                  >
                    ya estoy registrado
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="hidden p-10 md:flex md:w-1/2 ">
          <div className="flex w-10/12 justify-center">
            <div className="flex w-8/12 flex-col justify-center">
              <img src={man} className="w-10/12 translate-x-10" />
              <img src={plants} />
              <h2 className="flex w-full justify-center pt-7 text-center text-2xl font-bold ">
                Registrese Case
                <img className="w-8" src={heart} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro
