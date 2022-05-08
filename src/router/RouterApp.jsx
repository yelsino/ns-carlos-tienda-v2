import { useRoutes } from "react-router-dom";
import Compras from "../Components/Pages/Compras/Compras";
import Favoritos from "../Components/Pages/Favoritos/Favoritos";
import MainStore from "../Components/Pages/MainStore";
import Reclamos from "../Components/Pages/Reclamos/Reclamos";
import Tienda from "../Components/Pages/Tienda/Tienda";
import PublicRoute from "./PublicRoute";



const RouterApp = () => {


  const routes = [
    {
      path: '/auth',
      element: <PublicRoute />,
    },

    {
      path: '/', element: <MainStore  />,
      children: [
        {path: '/tienda', element: <Tienda />},
        {path: '/mis-compras', element: <Compras />},
        {path: '/mis-reclamos', element: <Reclamos />},
        {path: '/recetas-favoritas', element: <Favoritos />},
      ]
    },

    {
      path: '*',
      element: <div>404</div>,
    }
  ];

  const element = useRoutes(routes)



  // if (auth.checking) {
  //   return <h1>cargando ....</h1>
  // }

  // aca hay error


  return (
    <>
      {element}
    </>
  )
}

export default RouterApp;