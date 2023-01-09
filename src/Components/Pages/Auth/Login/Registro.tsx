import { useContext, useState } from 'react'
import { Form, Formik } from 'formik'
import bird from 'public/Assets/bird.svg'
import plants from 'public/Assets/plants.svg'
import man from 'public/Assets/man.svg'
import heart from 'public/Assets/heart.gif'
import { motion } from 'framer-motion'
import SwitchLogin from './SwitchLogin'
import { AuthContext } from 'Context/auth/AuthContext'
import { GoogleLogin } from 'Components/Moleculas/GoogleLogin'
import { FacebookLoginButton } from 'Components/Moleculas/FacebookLogin'
import { Mobile } from './WithWhat/Mobile'
import { Correo } from './WithWhat/Correo'
import { Link } from 'react-router-dom'
import { validarRegistro } from 'schemas/authValidation'
import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext'
import { IAuth, TipoAuth } from 'types-yola'
import ValidarCodigo from 'Components/Moleculas/ItemsModal/ValidarCodigo'



const Registro = () => {

  const { verificarExisteCorreo, verificarExisteMovil } = useContext(AuthContext)
  const [conQueIniciar, cambiarMetodoInicio] = useState<TipoAuth>('CORREO')
  const [validCode, setValidCode] = useState(false)
  const [dataValidada, setDataValidada] = useState<IAuth>()

  const { setNotificacion } = useContext(NotificacionContext)

  const onSubmit = async (values, actions) => {
    if(conQueIniciar === "CORREO"){
      const res = await verificarExisteCorreo(values.correo)
      if(!res.ok) return setNotificacion({ message: res.mensaje, type: 1 })
      if(res.data){
        setValidCode(true)
        setDataValidada(values)
      }
    }

    if(conQueIniciar === "MOVIL"){
      const res = await verificarExisteMovil(values.celular.toString())
      if(!res.ok) return setNotificacion({ message: res.mensaje, type: 1 })
      if(res.data){
        setValidCode(true)
        setDataValidada(values)
      }
    }
   
  }

 
  return (
    <div className=" relative flex h-screen items-center  justify-center">

      <motion.img
        className="absolute top-10 right-10 w-20"
        key={bird}
        src={bird}
        initial={{ y: -300, opacity: 0, rotate: -20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      <div className="flex  max-w-5xl items-center justify-center ">
        {validCode && (
          <ValidarCodigo
            dataValidada={dataValidada}
            setDataValidada={setDataValidada}
            setValidCode={setValidCode}
            conQueIniciar={conQueIniciar}
          />
        )}
        <div className="flex w-full flex-col items-center gap-5 p-10 font-poppins md:w-1/2">
          <p className="w-72 text-left sm:w-80">Registrarse con</p>

          <SwitchLogin cambiarMetodoInicio={cambiarMetodoInicio} />
          <Formik
            initialValues={{
              correo: 'cuenta@gmail.com',
              celular: '939616350',
              password: 'yelsin312@231'
            }}
            validationSchema={validarRegistro}
            onSubmit={onSubmit}
          >
            {(formikEvents) => (
              <Form autoComplete="new-password">
                <div className=" relative flex w-72 flex-col gap-y-7 sm:w-80 ">
                  {conQueIniciar === 'CORREO' ? (
                    <Correo {...formikEvents} quehacer="REGISTRARSE" />
                  ) : (
                    <Mobile {...formikEvents} quehacer="REGISTRARSE" />
                  )}

                  <div className="flex justify-between gap-x-7 text-blue-600 select-none">
                    <GoogleLogin />
                    <FacebookLoginButton />
                  </div>

                  <Link
                    to="/auth/login"
                    className="mb-3 cursor-pointer text-center  text-gray-500 hover:text-blue-500 select-none"
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
            <div className="flex w-8/12 flex-col justify-center select-none">
              <img src={man} className="w-10/12 translate-x-10 " />
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
