import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/auth/AuthContext'
import {
  IconEstadisticaInactivo,
  IconLogOut,
  IconUserOutline
} from '../Atoms/Icons'
import './Menu.css'

const NavbarMenu = () => {
  const { logout } = useContext(AuthContext)

  return (
    <>
      <div className="absolute   -top-1 right-2 z-30 h-14 w-14 rotate-45 rounded-lg border border-gray-50 bg-color_green_1" />

      <div className=" navbar_item_b z-auto  flex  w-60 flex-col rounded-md p-5  opacity-100 shadow-2xl" />

      <div className=" absolute top-0 left-0 z-40 flex w-full flex-col   rounded-lg bg-color_green_1 pt-3 font-mono text-lg font-semibold">
        <Link
          to="/mis-listas"
          className="flex cursor-pointer items-center gap-x-3 py-3 px-5 hover:bg-gray-100"
        >
          <span>
            <IconEstadisticaInactivo stile="h-7 w-7" />
          </span>
          <span>Mis listas</span>
        </Link>
        <Link
          to="/mis-compras"
          className="flex cursor-pointer items-center gap-x-3 py-3 px-5 hover:bg-gray-100"
        >
          <span>
            <IconUserOutline />
          </span>
          <span>Mis compras </span>
        </Link>
        {/* <p className="hover:bg-gray-100 cursor-pointer py-3 px-5 flex items-center gap-x-3">
          <span><IconConfigInactivo /></span>
          <span>Configuración</span>
        </p> */}
        <button
          onClick={() => logout()}
          className="mt-1 flex cursor-pointer items-center gap-x-3 border-t py-3 px-5  font-bold hover:bg-gray-100"
        >
          <span>
            <IconLogOut />
          </span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  )
}

export default NavbarMenu
