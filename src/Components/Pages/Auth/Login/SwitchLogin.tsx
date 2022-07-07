import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import '../estilos.css'

const SwitchLogin = () => {
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
            className={`overflow-hidden truncate rounded-sm px-6 py-4 tracking-tight transition duration-300 ease-in-out ${
              checked
                ? 'width-active bg-black text-white  '
                : 'width-inactive  bg-gray-50 '
            }`}
          >
            {checked ? 'Número teléfono' : 'Teléfono'}
          </button>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="correo">
        {({ checked }) => (
          <button
            className={`truncate rounded-sm px-6 py-4 tracking-tight transition duration-300  ease-in-out  ${
              checked
                ? 'width-active bg-black text-white'
                : 'width-inactive  bg-gray-50 '
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
