import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';

const Filtro = ({ upData, data }) => {
  const [name, setName] = useState('');
  const [letter, setLetter] = useState('');
  // const [temporal, setTemporal] = useState([]);

  useEffect(() => {
    upData(
      filterData(
        data,
        name,
        letter ? letter[0] : 'a',
        letter ? letter[1] : 'z'
      )
    );
  }, [name, letter]);

  const filterData = (arr = [], category = '', start = 'a', end = 'z') => {

    const isGreater = (c1, c2) => c1 >= c2;
    const isSmaller = (c1, c2) => c1 <= c2;

    const filtered = arr.filter(e => {
      const [firstChar] = e.name.toLowerCase();

      return isGreater(firstChar, start) && isSmaller(firstChar, end);
    });

    return filtered.filter(v => name ? v.category?.name === category.toUpperCase() : v);
  };



  return (
    <div className='flex flex-col items-center gap-5 pb-5'>
      
      <RadioGroup
        className='flex gap-7 font-poppins'
        value={name}
        onChange={setName}
      >
        <RadioGroup.Option value='vegetales'>
          {({ checked }) => (
            <span
              onClick={() => name === 'vegetales' && setName('')}
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
              onClick={() => name === 'frutas' && setName('')}
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
              onClick={() => name === 'abarrotes' && setName('')}
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
      <RadioGroup
        className='flex gap-7 font-semibold'
        value={letter}
        onChange={setLetter}
      >
     
        <RadioGroup.Option value='ag'>
          {({ checked }) => (
            <span
              onClick={() => letter === 'ag' && setLetter('')}
              className={`cursor-pointer  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              A-G
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value='hm'>
          {({ checked }) => (
            <span
              onClick={() => letter === 'hm' && setLetter('')}
              className={`cursor-pointer  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              H-M
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value='oz'>
          {({ checked }) => (
            <span
              onClick={() => letter === 'oz' && setLetter('')}
              className={`cursor-pointer  ${
                checked ? 'text-color_green_7' : 'text-gray-500'
              }`}
            >
              O-Z
            </span>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
};

export default Filtro;

Filtro.propTypes = {
  upData: PropTypes.func,
  data: PropTypes.array,
  // temp: PropTypes.array
};
