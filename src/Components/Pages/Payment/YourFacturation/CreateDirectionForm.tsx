import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useOnClick } from 'Hooks/useOnClick';
import Input from 'Components/Atoms/Input';
import { DirectionContext } from 'Context/Direction/DirectionContext';
import { AuthContext } from 'Context/auth/AuthContext';

interface Props {
  setShow: () => void
  socket: any
  auth: any
}

const CreateDirectionForm = ({ setShow, socket, auth }: Props) => {
  
  const { registrarDireccion } = useContext(DirectionContext);
  const { _id } = useContext(AuthContext);
  const [disabled, setDisabled] = useOnClick(200)

  const [calle, setCalle] = useState({
    name: '',
    reference: ''
  })

  const createDirection = () => {
    if (!calle.name || !calle.reference) {
      return alert('Por favor complete todos los campos')
    }
    // ignore ts this line
    // @ts-ignore
    // 
    setDisabled(true)

    registrarDireccion({
      nombre: calle.name,
      referencia: calle.reference,
      usuario: _id as any
    });

    setShow()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalle({ ...calle, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex w-full flex-col gap-y-5">
      <div className="flex justify-between  pt-5 font-poppins ">
        <p className="font-bold">Registrando dirección</p>{' '}
        <button
          disabled={disabled as boolean}
          onClick={createDirection}
          className="rounded-full bg-purple-500 px-3 py-1 text-white outline-none"
        >
          +guardar
        </button>
      </div>
      <Input
        name="name"
        type="text"
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


export default CreateDirectionForm
