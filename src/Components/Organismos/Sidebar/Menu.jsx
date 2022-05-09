import { NavLink, useLocation } from "react-router-dom";
import { IconCardBuyInactive, IconProductInactivo, IconUsersInactive, IconWork } from "../../Atoms/Icons";


const Menu = () => {

  const location = useLocation()

  const { pathname } = location;

  const currentPath = pathname.split('/');

  return (
    <div className="  py-5   font-semibold font-mono text-lg flex flex-col border-b border-color_green_4 gap-y-5">
      <NavLink to='/tienda' className={`transition ease-in duration-300  flex items-center gap-x-2 ${currentPath[1] === 'tienda' ? ' text-color_green_7' : 'text-color_gray_1'}`} >
        <IconCardBuyInactive />
        <span>Tienda</span>
      </NavLink>



      <NavLink to='/mis-compras' className={({ isActive }) => (`transition ease-in duration-300  flex items-center gap-x-2 ${isActive ? ' text-color_green_7' : 'text-color_gray_1'}`)} >
        <IconProductInactivo />
        <span>Compras</span>
      </NavLink>

      <NavLink
        to='/mis-reclamos' className={`transition ease-in duration-300 flex items-center gap-x-2 ${currentPath[1] === 'mis-reclamos' ? ' text-color_green_7' : 'text-color_gray_1'}`}
      >
        <IconUsersInactive />
        <span>Reclamos</span>

      </NavLink>

      <NavLink to='/recetas-favoritas' className={`transition ease-in duration-300  flex items-center gap-x-2 ${currentPath[1] === 'trabajadores' ? ' text-color_green_7' : 'text-color_gray_1'}`} >
        <IconWork />
        <span>Favoritos</span>
      </NavLink>
    </div>
  );
}

export default Menu;