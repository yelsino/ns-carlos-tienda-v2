import { NavLink, useLocation } from 'react-router-dom'
import {
  IconCardBuyInactive,
  IconProductInactivo,
  IconWork
} from '../../Atoms/Icons'

const Menu = () => {
  const location = useLocation()

  const { pathname } = location

  const currentPath = pathname.split('/')

  return (
    <div className="  flex   flex-col gap-y-5 border-b border-color_green_4 py-5 font-mono text-lg font-semibold">
      <NavLink
        to="/tienda"
        className={`flex items-center gap-x-2  transition duration-300 ease-in ${
          currentPath[1] === 'tienda'
            ? ' text-color_green_7'
            : 'text-color_gray_1'
        }`}
      >
        <IconCardBuyInactive />
        <span>Tienda</span>
      </NavLink>

      <NavLink
        to="/mis-compras"
        className={({ isActive }) =>
          `transition ease-in duration-300  flex items-center gap-x-2 ${
            isActive ? ' text-color_green_7' : 'text-color_gray_1'
          }`
        }
      >
        <IconProductInactivo />
        <span>Compras</span>
      </NavLink>

      <NavLink
        to="/mis-listas"
        className={({ isActive }) =>
          `transition ease-in duration-300  flex items-center gap-x-2 ${
            isActive ? ' text-color_green_7' : 'text-color_gray_1'
          }`
        }
      >
        <IconWork />
        <span>Listas</span>
      </NavLink>
    </div>
  )
}

export default Menu
