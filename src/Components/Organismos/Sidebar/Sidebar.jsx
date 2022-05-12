// import { useLocation } from 'react-router-dom';
import Actividades from './Actividades';
import Colegas from './Colegas';
import Menu from './Menu';
// import MenuReportes from "../Organismos/Sidebar/MenuReportes";
import './Sidebar.css';

const Sidebar = () => {
  // const location = useLocation();

  // const currentPath = location.pathname.split('/');

  return (
    <div className=' w-56 hidden sm:block sidebar-web h-[calc(100vh-100px)]'>
      <Menu />
      <Colegas />
      <Actividades />
    </div>
  );
};

export default Sidebar;
