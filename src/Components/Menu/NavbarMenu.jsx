import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/auth/AuthContext';
import { IconEstadisticaInactivo, IconLogOut } from '../Atoms/Icons';
import './Menu.css';

const NavbarMenu = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className='absolute   -top-1 w-14 h-14 rotate-45 transform rounded-lg z-30 right-2 bg-color_green_1 border border-gray-50 ' />

      <div className=' p-5 z-auto  shadow-3xl  rounded-md w-60      flex flex-col  opacity-100 navbar_item_b' />

      <div className=' w-full z-40 flex flex-col absolute top-0 left-0   rounded-lg pt-3 bg-color_green_1 font-semibold font-mono text-lg'>
        <Link
          to='/mis-listas'
          className='hover:bg-gray-100 cursor-pointer py-3 px-5 flex items-center gap-x-3'
        >
          <span>
            <IconEstadisticaInactivo stile='h-7 w-7' />
          </span>
          <span>Mis listas</span>
        </Link>
        {/* <Link to='/mis-compras' className="hover:bg-gray-100 cursor-pointer py-3 px-5 flex items-center gap-x-3">
          <span><IconUserOutline /></span>
          <span>Mis compras </span>
        </Link> */}
        {/* <p className="hover:bg-gray-100 cursor-pointer py-3 px-5 flex items-center gap-x-3">
          <span><IconConfigInactivo /></span>
          <span>Configuración</span>
        </p> */}
        <button
          onClick={() => logout()}
          className='hover:bg-gray-100 cursor-pointer py-3 px-5 flex items-center border-t gap-x-3  mt-1 font-bold'
        >
          <span>
            <IconLogOut />
          </span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  );
};

export default NavbarMenu;
