import { useState } from 'react'
import { useOnClick } from '../../../../Hooks/useOnClick'
import PropTypes from 'prop-types'
import Input from '../../../Atoms/Input'

interface Props {
  setShow: () => void
  socket: any
  auth: any
}

const CreateDirectionForm = ({ setShow, socket, auth }: Props) => {
  const [disabled, setDisabled] = useOnClick(200)

  const [calle, setCalle] = useState({
    name: '',
    reference: ''
  })

  const createDirection = () => {
    if (!calle.name || !calle.reference) {
      return alert('Por favor complete todos los campos')
    }
    setDisabled(true)
    socket?.emit('direction', {
      type: 'CREATE_DIRECTION',
      userID: auth.uid,
      name: calle.name,
      reference: calle.reference
    })

    setShow()
  }

  const handleChange = (e) => {
    setCalle({ ...calle, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex w-full flex-col gap-y-5">
      <div className="flex justify-between  pt-5 font-poppins ">
        <p className="font-bold">Registrando dirección</p>{' '}
        <button
          disabled={disabled}
          onClick={createDirection}
          className="rounded-full bg-purple-500 px-3 py-1 text-white outline-none"
        >
          +guardar
        </button>
      </div>
      <Input
        name="name"
        title="Nombre y número de dirección"
        value={calle.name}
        onChange={handleChange}
      />
      <Input
        name="reference"
        title="Referencia"
        onChange={handleChange}
        value={calle.reference}
        type="textarea"
        className="w-full bg-color_green_2 py-3 px-5 text-color_green_7 outline-none"
      />

      <button
        onClick={setShow}
        className="w-full bg-rose-500 py-3 font-poppins font-semibold text-white"
      >
        cancelar registro
      </button>
    </div>
  )
}

CreateDirectionForm.propTypes = {
  setShow: PropTypes.func.isRequired,
  socket: PropTypes.object,
  auth: PropTypes.object
}

export default CreateDirectionForm
