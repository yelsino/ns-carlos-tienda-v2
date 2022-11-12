import Logo from './Atoms/Logo'
import Search from './Moleculas/Search/Search'
import './Header.css'
import { useOnClick } from '../Hooks/useOnClick'
import NavbarMenu from './Menu/NavbarMenu'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ListContext } from 'Context/List/ListContext'
import { IconBell, IconClipBoard } from './Atoms/Icons'
import { motion, Variants } from 'framer-motion'
import { useIsLarge, useIsMedium, useIsSmall } from 'Hooks/utils/mediaQuery'

interface Props {
  adding: boolean
}

const Header = ({adding}:Props ) => {
  const { viewList, seeCurrentList } = useContext(ListContext)

  const [disabled, setDisabled] = useOnClick(400)
  const isLarge = useIsMedium()

  const variants: Variants = isLarge
    ? {
        animate: {
          width: viewList ? 600 : 250
        }
      }
    : {
        animate: {
          width: viewList ? 400 : 250
        }
      }
  // get url from react-router-dom

  const location = useLocation()
  const { pathname } = location
  const currentPath = pathname.split('/')

  return (
    <div className="hidden justify-between border-b py-3 sm:flex">
      <Logo />
      <Search props={{}} />
      <motion.div
        // variants={variants}
        animate={
          isLarge
            ? { width: viewList ? 600 : 250 }
            : { width: viewList ? 250 : 250 }
        }
        transition={{ duration: 0.4, delay: 0 }}
        className="flex min-w-[160px] items-center justify-end text-color_gray_1 "
      >
        <span className="cursor-pointer px-3 transition duration-300 ease-in hover:text-color_green_7"></span>
        <div className={`relative flex items-center gap-5 z-50 bg-white p-2 pl-4  rounded-full `}>
         
          {currentPath.includes('tienda') && (
            <button
              disabled={disabled}
              onClick={() => {
                setDisabled(true)
                seeCurrentList(!viewList)
              }}
              className={`block h-8 w-8 cursor-pointer transition duration-700 ease-in-out relative ${
                viewList ? 'text-color_green_7' : ''
              }`}
            >
              {
                adding &&  
                <motion.span 
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  initial={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className='absolute -top-2 -right-2 text-xs font-bold rounded-full bg-orange-600 p-1 text-white font-poppins w-5 h-5 flex justify-center items-center'>+1</motion.span>
              }
              <IconClipBoard />
            </button>
          )}

          <span className="block h-8 w-8 cursor-pointer transition duration-500 ease-in-out hover:text-color_green_7">
            <IconBell />
          </span>

          <div className="navbar_perfil  relative    ">
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
      </motion.div>
    </div>
  )
}

export default Header
