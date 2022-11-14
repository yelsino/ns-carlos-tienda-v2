import { GoogleLogin as ButtonGoogle } from 'react-google-login'
export const GoogleLogin = () => {
  const responseGoogle = () => console.log

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
