import { useContext, useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import flag from '../../../../Assets/peru.png'
import bird from '../../../../Assets/bird.svg'
import plants from '../../../../Assets/plants.svg'
import woman from '../../../../Assets/woman.svg'
import heart from '../../../../Assets/heart.gif'
import { motion } from 'framer-motion'
import SwitchLogin from './SwitchLogin'
import { AuthContext } from 'Context/auth/AuthContext'
import { GoogleLogin } from 'Components/Moleculas/GoogleLogin'
import { FacebookLoginButton } from 'Components/Moleculas/FacebookLogin'
import { Link } from 'react-router-dom'
import { Correo } from './WithWhat/Correo'
import { Mobile } from './WithWhat/Mobile'

type WithWhat = 'correo' | 'mobile'

const Login = () => {
  const { userLogin, loading } = useContext(AuthContext)
  const [noPass, setNoPass] = useState(false)
  const [withWhat, setWithWhat] = useState<WithWhat>('correo')
  // const navigate = useNavigate();

  const validar = Yup.object().shape({
    email: Yup.string().email('formato invalido').required('es requerido'),
    password: Yup.string().required('es requerido')
  })

  const olvideMisCredenciales = (e) => {
    e.stopPropagation()
  }

  useEffect(() => {
    localStorage.removeItem('noPassword')
  }, [])

  useEffect(() => {
    setNoPass(JSON.parse(localStorage.getItem('noPassword')))
  }, [loading])

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

          <SwitchLogin setWithWhat={setWithWhat} />

          <Formik
            initialValues={{
              email: 'yelsin@gmail.com',
              password: 'Ilovelife@321'
            }}
            validationSchema={validar}
            onSubmit={async (values) => {
              await userLogin(values.email, values.password)
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="new-password" className="">
                <div className=" relative flex w-72 flex-col gap-y-7 sm:w-80">
                  {withWhat === 'correo' ? (
                    <Correo errors={errors} touched={touched} />
                  ) : (
                    <Mobile errors={errors} touched={touched} />
                  )}

                  <button
                    disabled={loading}
                    className="rounded-sm bg-color_green_7 py-3 text-lg font-semibold text-white"
                  >
                    {loading ? 'INICIANDO...' : 'INICIAR'}
                  </button>

                  <div className="flex justify-between gap-x-7 text-blue-600">
                    <GoogleLogin />
                    <FacebookLoginButton />
                  </div>

                  <div className="flex flex-col justify-center">
                    <Link
                      to="/auth/registrarse"
                      onClick={olvideMisCredenciales}
                      className="mb-3  cursor-default text-center  text-gray-500 hover:text-blue-600"
                    >
                      Crear una cuenta
                    </Link>

                    {noPass && (
                      <button
                        type="button"
                        onClick={olvideMisCredenciales}
                        className="mb-3  cursor-default text-center text-sm text-gray-500 hover:text-blue-600"
                      >
                        Olvidé mis contraseña
                      </button>
                    )}
                  </div>
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
