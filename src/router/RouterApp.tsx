import Registro from 'Components/Pages/Auth/Login/Registro'
import YourList from 'Components/Pages/Payment/YourList'
import { AuthContext } from 'Context/auth/AuthContext'
import { lazy, Suspense, useContext, useEffect } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import SearchMovil from '../Components/Moleculas/Search/SearchMovil'
import Login from '../Components/Pages/Auth/Login/Login'
import MainStore from '../Components/Pages/MainStore'
import YourFacturation from '../Components/Pages/Payment/YourFacturation'
import YourPayment from '../Components/Pages/Payment/YourPayment'
import Tienda from '../Components/Pages/Tienda/Tienda'
import LoadingPage from '../Components/Plantillas/LoadinPage'

const RouterApp = () => {
  const { checking, logged, verificarToken } = useContext(AuthContext)

  const PublicRoute = lazy(() => import('../router/PublicRoute'))
  const Shopping = lazy(() => import('../Components/Pages/Compras/MyShopping'))
  const Reclamos = lazy(() => import('../Components/Pages/Reclamos/Reclamos'))
  const MyList = lazy(() => import('../Components/Pages/MyLists/MyLists'))
  const PaymentContainer = lazy(() => import('../Components/Pages/Payment/PaymentContainer'))

  const routes = [
    {
      path: '/auth',
      element: <PublicRoute isAutenticated={logged} />,
      children: [
        {
          path: '/auth/login',
          element: <Login />
        },
        {
          path: '/auth/registrarse',
          element: <Registro />
        }
      ]
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
              element: <SearchMovil props={{}} />
            }
          ]
        },

        { path: '/mis-compras', element: <Shopping /> }, // MyShopping
        { path: '/mis-reclamos', element: <Reclamos /> },
        { path: '/mis-listas', element: <MyList /> }
      ]
    },
    {
      path: '/payment',
      element: <Navigate to="/payment/your-list" replace />
    },
    {
      path: '/payment',
      element: <PaymentContainer />,
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

  return (
    <>
      <Suspense fallback={null}>{element}</Suspense>
    </>
  )
}

export default RouterApp
