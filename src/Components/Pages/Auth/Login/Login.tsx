import { useContext, useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import bird from 'public/Assets/bird.svg'
import plants from 'public/Assets/plants.svg'
import woman from 'public/Assets/woman.svg'
import heart from 'public/Assets/heart.gif'
import { motion } from 'framer-motion'
import SwitchLogin from './SwitchLogin'
import { AuthContext } from 'Context/auth/AuthContext'
import { GoogleLogin } from 'Components/Moleculas/GoogleLogin'
import { FacebookLoginButton } from 'Components/Moleculas/FacebookLogin'
import { Link } from 'react-router-dom'
import { Correo } from './WithWhat/Correo'
import { Mobile } from './WithWhat/Mobile'
import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext'
import { validAuth } from 'schemas/authValidation'
import { TipoAuth } from 'types-yola'


const Login = () => {
  const { userLogin, loading } = useContext(AuthContext)

  const [noPass, setNoPass] = useState(false)
  const [conQueIniciar, cambiarMetodoInicio] = useState<TipoAuth>('CORREO')

  const { setNotificacion } = useContext(NotificacionContext)

  const olvideMisCredenciales = (e) => {
    e.stopPropagation()
  }

  const onSubmit = async (values, actions) => {

    const res = await userLogin(values)
    if (!res.ok) setNotificacion({ message: res.mensaje, type: 1 })
    actions.resetForm()
   
  }

  useEffect(() => {
    localStorage.removeItem('noPassword')
  }, [])

  useEffect(() => {
    setNoPass(JSON.parse(localStorage.getItem('noPassword')))
  }, [loading])

  return (
    <div className=" relative flex h-screen items-center  justify-center select-none">
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

          <SwitchLogin cambiarMetodoInicio={cambiarMetodoInicio} />

          <Formik
            initialValues={{
              correo: 'yelsin@gmail.com',
              celular: 939616350,
              password: 'yelsin312@231'
            }}
            validationSchema={validAuth}
            onSubmit={onSubmit}
          >
            {(formEvent) => (
              <Form
                autoComplete="new-password"
                className="relative flex w-72 flex-col gap-y-7 sm:w-80"
              >
                {conQueIniciar === 'CORREO' ? (
                  <Correo {...formEvent} quehacer="INICIAR_SESION" />
                ) : (
                  <Mobile {...formEvent} quehacer="INICIAR_SESION"  />
                )}

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
