// import { useLocation } from 'react-router-dom';
import Menu from './Menu'
// import MenuReportes from "../Organismos/Sidebar/MenuReportes";
import './Sidebar.css'

const Sidebar = () => {
  // const location = useLocation();
  // const currentPath = location.pathname.split('/');

  return (
    <div className=" sidebar-web hidden h-[calc(100vh-100px)] w-56 sm:block">
      <Menu />
      {/* <Colegas /> */}
      {/* <Actividades /> */}
    </div>
  )
}

export default Sidebar
