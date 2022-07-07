import Logo from './Atoms/Logo'
import Search from './Moleculas/Search/Search'
// import { BellIcon, ClipboardListIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types'
import './Header.css'
import { useOnClick } from '../Hooks/useOnClick'
import NavbarMenu from './Menu/NavbarMenu'
import { useLocation } from 'react-router-dom'

const Header = ({ list, setList }) => {
  const [disabled, setDisabled] = useOnClick(400)

  // get url from react-router-dom

  const location = useLocation()
  const { pathname } = location
  const currentPath = pathname.split('/')

  return (
    <div className="hidden justify-between border-b py-5 sm:flex">
      <Logo />
      <Search />
      <div className="flex min-w-[160px] items-center justify-end text-color_gray_1 ">
        <span className="cursor-pointer px-3 transition duration-300 ease-in hover:text-color_green_7"></span>
        <div className="relative flex items-center gap-5 ">
          {currentPath.includes('tienda') && (
            <button
              disabled={disabled}
              onClick={() => {
                setDisabled(true)
                setList(!list)
              }}
              className={`block h-8 w-8 cursor-pointer transition duration-700 ease-in-out ${
                list ? 'text-color_green_7' : ''
              }`}
            >
              {/* <ClipboardListIcon /> */}
            </button>
          )}

          {/* <span className='block w-8 h-8 hover:text-color_green_7 transition ease-in-out duration-500 cursor-pointer'>
            <BellIcon />
          </span> */}

          <div className="navbar_perfil  relative z-50   ">
            <img
              src="https://res.cloudinary.com/dwkfj5sxb/image/upload/v1650590795/yelsin_rp8zyt.jpg"
              alt="img user"
              className="imagen h-10 w-10 object-cover hover:-translate-x-[0.1rem]"
            />
            <div className="navbar_menu absolute  -right-3 top-14  z-50  ">
              <NavbarMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

Header.propTypes = {
  list: PropTypes.bool,
  setList: PropTypes.func
}
