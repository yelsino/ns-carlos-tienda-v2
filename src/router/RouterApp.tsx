import { AuthContext } from 'Context/auth/AuthContext'
import { useContext, useEffect } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import SearchMovil from '../Components/Moleculas/Search/SearchMovil'
import Login from '../Components/Pages/Auth/Login/Login'
import { MyShopping } from '../Components/Pages/Compras/MyShopping'
import MainStore from '../Components/Pages/MainStore'
import { MyLists } from '../Components/Pages/MyLists/MyLists'
import Payment from '../Components/Pages/Payment/Payment'
import YourFacturation from '../Components/Pages/Payment/YourFacturation'
import YourList from '../Components/Pages/Payment/YourList'
import YourPayment from '../Components/Pages/Payment/YourPayment'
import Reclamos from '../Components/Pages/Reclamos/Reclamos'
import Tienda from '../Components/Pages/Tienda/Tienda'
import LoadingPage from '../Components/Plantillas/LoadinPage'
import PublicRoute from './PublicRoute'

const RouterApp = () => {
  const { checking, logged, verificarToken } = useContext(AuthContext)

  const routes = [
    {
      path: '/auth',
      element: <PublicRoute isAutenticated={logged} />,
      children: [{ path: '/auth/login', element: <Login /> }]
    },
    {
      path: '/',
      element: <Navigate to="/tienda" />
    },

    {
      path: '/',
      element: <MainStore isAutenticated={logged} />,
      children: [
        {
          path: '/tienda',
          element: <Tienda />,
          children: [
            {
              path: '/tienda/search-product',
              element: <SearchMovil />
            }
          ]
        },

        { path: '/mis-compras', element: <MyShopping /> },
        { path: '/mis-reclamos', element: <Reclamos /> },
        { path: '/mis-listas', element: <MyLists /> }
      ]
    },
    {
      path: '/payment',
      element: <Navigate to="/payment/your-list" replace />
    },
    {
      path: '/payment',
      element: <Payment />,
      children: [
        {
          path: '/payment/your-list',
          element: <YourList />
        },
        {
          path: '/payment/your-facturation',
          element: <YourFacturation />
        },
        {
          path: '/payment/your-payment',
          element: <YourPayment />
        }
      ]
    },

    {
      path: '*',
      element: <div>404</div>
    }
  ]

  const element = useRoutes(routes)

  useEffect(() => {
    verificarToken()
  }, [verificarToken])

  if (checking) {
    return <LoadingPage />
  }

  return <>{element}</>
}

export default RouterApp
