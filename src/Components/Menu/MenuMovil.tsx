import { NavLink, useLocation } from 'react-router-dom'
import {
  IconCardBuyInactive,
  IconListas,
  IconStoreInactive,
} from '../Atoms/Icons'

const MenuMovil = () => {
  const location = useLocation()
  const { pathname } = location
  const currentPath: Array<string> = pathname.split('/')
  const hidden = ['search-product']
  const filterRutes = hidden.filter((tag) => currentPath.includes(tag) && tag)

  return (
    <>
      {filterRutes.length !== 1 && (
        <div className="fixed left-0 bottom-0 z-30 flex w-full  justify-center  bg-color_green_1 p-2 sm:hidden">
          <div className=" left-0 flex w-11/12 justify-around py-3 font-poppins font-semibold text-color_green_3   ">
            <NavLink
              to="/tienda"
              className={`transition duration-300 ease-in ${
                currentPath[1] === 'tienda'
                  ? ' text-color_green_7'
                  : 'text-color_gray_1'
              }`}
            >
              <IconStoreInactive />
            </NavLink>

            <NavLink
              to="/mis-listas"
              className={({ isActive }) =>
                `transition ease-in duration-300 ${
                  isActive ? ' text-color_green_7' : 'text-color_gray_1'
                }`
              }
            >
              <IconListas />
            </NavLink>
            <NavLink
              to="/mis-compras"
              className={`transition duration-300 ease-in ${
                currentPath[1] === 'mis-compras'
                  ? ' text-color_green_7'
                  : 'text-color_gray_1'
              }`}
            >
              <IconCardBuyInactive />
            </NavLink>
          </div>
        </div>
      )}
    </>
  )
}

export default MenuMovil
