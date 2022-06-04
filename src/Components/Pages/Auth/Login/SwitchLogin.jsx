import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import '../estilos.css';

const SwitchLogin = () => {
  const [weight, setWeight] = useState('correo');

  return (
    <RadioGroup
      value={weight}
      onChange={setWeight}
      className='flex justify-between  w-72 sm:w-80 '
    >
      <RadioGroup.Option value='telefono'>
        {({ checked }) => (
          <button
            className={`transition duration-300 ease-in-out px-6 py-4 tracking-tight rounded-sm overflow-hidden truncate ${
              checked
                ? 'bg-black text-white width-active  '
                : 'bg-gray-50  width-inactive '
            }`}
          >
            {checked ? 'Número teléfono' : 'Teléfono'}
          </button>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value='correo'>
        {({ checked }) => (
          <button
            className={`transition duration-300 ease-in-out px-6 py-4 tracking-tight rounded-sm  truncate  ${
              checked
                ? 'bg-black text-white width-active'
                : 'bg-gray-50  width-inactive '
            }`}
          >
            {checked ? 'Correo electrónico' : 'Su correo '}
          </button>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default SwitchLogin;
