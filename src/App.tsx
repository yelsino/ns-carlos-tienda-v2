import { AuthProvider } from 'Context/auth/AuthContext'
import { DirectionProvider } from 'Context/Direction/DirectionContext'
import { ListProvider } from 'Context/List/ListContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { OrderProvider } from 'Context/Order/OrderContext'
import { ProductProvider } from 'Context/Product/ProductContext'
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
