import { AuthProvider } from 'Context/auth/AuthProvider'
import { DirectionProvider } from 'Context/Direction/DirectionProvider'
import { ListProvider } from 'Context/List/ListProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { OrderProvider } from 'Context/Order/OrderProvider'
import { ProductProvider } from 'Context/Product/ProductProvider'
import { SocketProvider } from 'Context/Socket/SocketProvider'
import RouterApp from 'router/RouterApp'
import 'app.css'
import { Suspense } from 'react'

function App() {
  return (

    <AuthProvider>
      <ListProvider>
        <ProductProvider>
          <DirectionProvider>
            <OrderProvider>
              <SocketProvider>
                <Suspense fallback={
                  <div className="loading">cargando....</div>
                }>
                  <Router>
                    <RouterApp />
                  </Router>
                </Suspense>
              </SocketProvider>
            </OrderProvider>
          </DirectionProvider>
        </ProductProvider>
      </ListProvider>
    </AuthProvider>


  )
}

export default App
