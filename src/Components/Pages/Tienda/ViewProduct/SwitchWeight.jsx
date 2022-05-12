import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

const SwitchWeight = () => {
  const [weight, setWeight] = useState('1000');

  return (
    <RadioGroup value={weight} onChange={setWeight}
    className='flex justify-between w-full'
    >
      <RadioGroup.Option value='250'>
        {({ checked }) => (
          <span
            className={`px-3 py-3 border border-black text-center cursor-pointer transition ease-in duration-400 font-bold  ${
              checked ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            1/4 Kg
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value='500'>
        {({ checked }) => (
          <span
            className={`px-3 py-3 border border-black text-center cursor-pointer transition ease-in duration-400 font-bold  ${
              checked ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {' '}
            1/2 Kg
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value='1000'>
        {({ checked }) => (
          <span
            className={`px-3 py-3 border border-black text-center cursor-pointer transition ease-in duration-400 font-bold  ${
              checked ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            1 Kg
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default SwitchWeight;
