import { useContext, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Login from '../Components/Pages/Auth/Login/Login';
import Compras from '../Components/Pages/Compras/Compras';
import Favoritos from '../Components/Pages/Favoritos/Favoritos';
import MainStore from '../Components/Pages/MainStore';
import Reclamos from '../Components/Pages/Reclamos/Reclamos';
import Tienda from '../Components/Pages/Tienda/Tienda';
import { AuthContext } from '../Context/auth/AuthContext';
import PublicRoute from './PublicRoute';

const RouterApp = () => {
  const { auth, verificarToken } = useContext(AuthContext);

  const routes = [
    {
      path: '/auth',
      element: <PublicRoute isAutenticated={auth.logged} />,
      children: [{ path: '/auth/login', element: <Login /> }],
    },

    {
      path: '/',
      element: <MainStore isAutenticated={auth.logged} />,
      children: [
        {
          path: '/tienda',
          element: <Tienda />,
          children: [
            {
              path: '/tienda/:productID',
              element: <div className='absolute top-0 left-0 '></div>,
            },
          ],
        },
        { path: '/mis-compras', element: <Compras /> },
        { path: '/mis-reclamos', element: <Reclamos /> },
        { path: '/recetas-favoritas', element: <Favoritos /> },
      ],
    },

    // { path: '/', element: <Navigate to='/tienda' /> },

    {
      path: '*',
      element: <div>404</div>,
    },
  ];

  const element = useRoutes(routes);

  useEffect(() => {
    verificarToken();
  }, [verificarToken]);

  if (auth.checking) {
    return <h1>cargando ....</h1>;
  }

  // aca hay error

  return <>{element}</>;
};

export default RouterApp;
