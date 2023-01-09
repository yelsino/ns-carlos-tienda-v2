import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import '../estilos.css'
import { TipoAuth } from 'types-yola'


interface Props {
  cambiarMetodoInicio: React.Dispatch<React.SetStateAction<TipoAuth>>
}
const SwitchLogin = ({ cambiarMetodoInicio }: Props) => {
  const [weight, setWeight] = useState('correo')

  return (
    <RadioGroup
      value={weight}
      onChange={setWeight}
      className="flex w-72  justify-between sm:w-80 "
    >
      <RadioGroup.Option value="telefono">
        {({ checked }) => (
          <button
            onClick={() => cambiarMetodoInicio('MOVIL')}
            className={`overflow-hidden truncate rounded-sm px-6 py-4 tracking-tight transition duration-300 ease-in-out ${
              checked
                ? 'width-active bg-black text-white  '
                : 'width-inactive  bg-gray-100 '
            }`}
          >
            {checked ? 'Número teléfono' : 'Teléfono'}
          </button>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="correo">
        {({ checked }) => (
          <button
            onClick={() => cambiarMetodoInicio('CORREO')}
            className={`truncate rounded-sm px-6 py-4 tracking-tight transition duration-300  ease-in-out  ${
              checked
                ? 'width-active bg-black text-white'
                : 'width-inactive  bg-gray-100  '
            }`}
          >
            {checked ? 'Correo electrónico' : 'Su correo '}
          </button>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  )
}

export default SwitchLogin
