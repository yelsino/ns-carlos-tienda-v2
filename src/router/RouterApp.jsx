import { useContext, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AnimationCoffe from '../Components/Atoms/Animation/Coffe';
import Login from '../Components/Pages/Auth/Login/Login';
import { Compras } from '../Components/Pages/Compras/Compras';
import MainStore from '../Components/Pages/MainStore';
import { MyLists } from '../Components/Pages/MyLists/MyLists';
import Payment from '../Components/Pages/Payment/Payment';
import YourFacturation from '../Components/Pages/Payment/YourFacturation';
import YourList from '../Components/Pages/Payment/YourList';
import YourPayment from '../Components/Pages/Payment/YourPayment';
import Reclamos from '../Components/Pages/Reclamos/Reclamos';
import Tienda from '../Components/Pages/Tienda/Tienda';
import { AuthContext } from '../Context/auth/AuthContext';
// import { useOnClick } from '../Hooks/useOnClick';
import PublicRoute from './PublicRoute';

const RouterApp = () => {
  const { auth, verificarToken } = useContext(AuthContext);
  // const [disabled, setDisabled] = useOnClick(1000);
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
        { path: '/mis-listas', element: <MyLists /> },
      ],
    },
    {
      path: '/payment',
      element: <Navigate to='/payment/your-list' replace />,
    },
    {
      path: '/payment',
      element: <Payment />,
      children: [
        {
          path: '/payment/your-list',
          element: <YourList />,
        },
        {
          path: '/payment/your-facturation',
          element: <YourFacturation />,
        },
        {
          path: '/payment/your-payment',
          element: <YourPayment />,
        },
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
    // setDisabled(true);
    // if (disabled) {
      return (
        <div className=' h-screen w-screen flex justify-center items-center'>
          <AnimationCoffe />
        </div>
      );
    // }
  }

  // aca hay error

  return <>{element}</>;
};

export default RouterApp;
