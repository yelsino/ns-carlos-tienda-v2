import { AuthContext } from 'Context/auth/AuthContext'
import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext'
import { useContext } from 'react'
import { GoogleLogin as ButtonGoogle } from 'react-google-login'
import { IAuthGoogle } from 'types-yola'
export const GoogleLogin = () => {

  const {googleAutenticacion} = useContext(AuthContext)
  const {setNotificacion} = useContext(NotificacionContext)

  const responseGoogle = async (resp) => {
    console.log(JSON.stringify(resp))
    const res = await googleAutenticacion(resp);
    if(!res.ok) setNotificacion({message:res.mensaje, type: 1})
  }


  return (
    <ButtonGoogle
      clientId="653478787151-rtiim08kirr2rrqjg5ld1j5jju5f081k.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <button
          type="button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="flex w-1/2 items-center justify-center gap-x-2 bg-cyan-100/30 py-2"
        >
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" />
          Google
        </button>
      )}
    />
  )
}
