import Logo from './Atoms/Logo';
import Search from './Moleculas/Search/Search';
import { BellIcon, ClipboardListIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import './Header.css';
import { useOnClick } from '../Hooks/useOnClick';

const Header = ({ list, setList }) => {
  const [disabled, setDisabled] = useOnClick(400);

  return (
    <div className='hidden justify-between border-b py-5 sm:flex'>
      <Logo />
      <Search 
      />
      <div className='flex items-center text-color_gray_1 min-w-[160px] '>
        <span className='px-3 hover:text-color_green_7 transition ease-in duration-300 cursor-pointer'></span>
        <div className='relative flex gap-5 items-center '>
          <button
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              setList(!list);
            }}
            className={`block w-8 h-8 transition ease-in-out duration-700 cursor-pointer ${
              list ? 'text-color_green_7' : ''
            }`}
          >
            <ClipboardListIcon />
          </button>

          <span className='block w-8 h-8 hover:text-color_green_7 transition ease-in-out duration-500 cursor-pointer'>
            <BellIcon />
          </span>
          <span>
            <img
              src='https://res.cloudinary.com/dwkfj5sxb/image/upload/v1651857885/ale_g4ceqr.jpg'
              alt='img user'
              className='imagen w-10 h-10 object-cover hover:-translate-x-[0.1rem]'
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  list: PropTypes.bool,
  setList: PropTypes.func,
};
