import { AuthProvider } from 'Context/auth/AuthProvider'
import { DirectionProvider } from 'Context/Direction/DirectionProvider'
import { ListProvider } from 'Context/List/ListProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { OrderProvider } from 'Context/Order/OrderProvider'
import { ProductProvider } from 'Context/Product/ProductProvider'
import { SocketProvider } from 'Context/SocketContext'
import RouterApp from 'router/RouterApp'
import 'app.css'

function App() {
  return (
    <AuthProvider>
      <ListProvider>
        <ProductProvider>
          <DirectionProvider>
            <OrderProvider>
              <SocketProvider>
                <Router>
                  <RouterApp />
                </Router>
              </SocketProvider>
            </OrderProvider>
          </DirectionProvider>
        </ProductProvider>
      </ListProvider>
    </AuthProvider>
  )
}

export default App
