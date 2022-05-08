import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

const Filtro = () => {
  const [name, setName] = useState('vegetales');
  const [letter, setLetter] = useState('a-i');
  return (
    <div className='flex flex-col items-center gap-5'>
      <RadioGroup className='flex gap-7 font-poppins' value={name} onChange={setName}>
        <RadioGroup.Option value='vegetales'>
          {({ checked }) => (
            <span
              className={`cursor-pointer  transition ease-in duration-600 font-medium  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              Vegetales
            </span>
          )}
        </RadioGroup.Option>
        <span className='block w-1 h-5 bg-color_green_4 rounded-lg' />

        <RadioGroup.Option value='frutas'>
          {({ checked }) => (
            <span
              className={`cursor-pointer  transition ease-in duration-600  font-medium  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              Frutas
            </span>
          )}
        </RadioGroup.Option>

        <span className='block w-1 h-5 bg-color_green_4 rounded-lg' />
        <RadioGroup.Option value='abarrotes'>
          {({ checked }) => (
            <span
              className={`cursor-pointer  transition ease-in duration-600  font-medium  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              Abarrotes
            </span>
          )}
        </RadioGroup.Option>
      </RadioGroup>
{/* LETRAS */}
      <RadioGroup className='flex gap-7 font-semibold' value={letter} onChange={setLetter}>
        {/* <RadioGroup.Label>Plan</RadioGroup.Label> */}
        <RadioGroup.Option value='a-i'>
          {({ checked }) => (
            <span
              className={`cursor-pointer  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              A-I
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value='j-k'>
          {({ checked }) => (
            <span
              className={`cursor-pointer  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              J-K
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value='r-z'>
          {({ checked }) => (
            <span
              className={`cursor-pointer  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              R-Z
            </span>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
};

export default Filtro;
