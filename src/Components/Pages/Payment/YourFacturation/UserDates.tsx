import PropTypes from 'prop-types'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { SocketProps } from 'Hooks/useSocket'
import Input from 'Components/Atoms/Input'
import { IUsuario } from 'types-yola'

interface Props {
  data: IUsuario
}

interface PropsContext {
  socket: SocketProps
}

const UserDates = ({ data }: Props) => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({
    names: data?.nombres,
    surnames: data?.apellidos,
    email: data?.correo,
    mobile: data?.celular
  })

  const { socket } = useOutletContext<PropsContext>()

  const showUpdateUser = () => {
    setShow(true)
    // setUser(userData?);
  }

  const cancelUpdateUser = () => {
    setUser({
      names: data?.nombres,
      surnames: data?.apellidos,
      email: data?.correo,
      mobile: data?.celular
    })
    setShow(false)
  }

  const updatedUser = () => {
    if (!user.names || !user.surnames || !user.email || !user.mobile) {
      return alert('Por favor complete todos los campos')
    }
    socket!.emit!('get-user-orders', {
      userID: data?._id,
      data: user,
      type: 'UPDATE_USER'
    })

    setShow(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="w-full border-b pb-5">
      <div className="flex justify-between  pt-5 font-poppins">
        <p className="pb-3 font-bold ">Sus datos</p>
        {show ? (
          <button
            onClick={updatedUser}
            className="rounded-full bg-purple-500 px-3 py-1 text-white outline-none"
          >
            +guardar
          </button>
        ) : (
          <button
            onClick={showUpdateUser}
            className="text-purple-500 outline-none"
          >
            actualizar
          </button>
        )}
      </div>
      <div className="flex w-full flex-col gap-y-3">
        <Input
          name="names"
          title="Nombres"
          readOnly={!show}
          value={user.names}
          onChange={handleChange}
        />
        <Input
          title="Apellidos"
          name="surnames"
          readOnly={!show}
          value={user?.surnames}
          onChange={handleChange}
        />
        <Input
          name="mobile"
          title="Celular"
          readOnly={!show}
          value={user?.mobile}
          onChange={handleChange}
        />

        {show && (
          <button
            onClick={cancelUpdateUser}
            className="w-full bg-rose-500 py-3 font-poppins font-semibold text-white"
          >
            cancelar actualizacion
          </button>
        )}
      </div>
    </div>
  )
}

export default UserDates

UserDates.propTypes = {
  data: PropTypes.object
}
