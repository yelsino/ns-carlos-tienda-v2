import { useState } from 'react';
import { IconClean, IconSearch } from '../../Icons';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <form className='relative flex items-center'>
      <span className='absolute left-4 text-color_green_7 '>
        <IconSearch />
      </span>
      <input
        type='text'
        onKeyUp={({ key }) => (key === 'Escape' && setSearch(''))}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='md:w-[320px] w-[250px] px-12 py-3 rounded-full bg-color_green_2  placeholder-color_green_7 outline-none text-color_green_7 font-normal font-poppins text-sm' 
        placeholder='Buscar productos en tienda'
      />
      {search.length > 0 && (
        <button
          className=' text-color_green_7 -translate-x-10'
          onClick={() => setSearch('')}
        >
          <IconClean />
        </button>
      )}
    </form>
  );
};

export default Search;
