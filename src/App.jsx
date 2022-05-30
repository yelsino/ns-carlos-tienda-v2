import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterApp from './router/RouterApp';
import { SocketProvider } from './Context/SocketContext';
import { ProductProvider } from './Context/Product/ProductContext';
import { AuthProvider } from './Context/auth/AuthContext';
import { ListProvider } from './Context/List/ListContext';
import { DirectionProvider } from './Context/Direction/DirectionContext';
import { OrderProvider } from './Context/Order/OrderContext';

function App() {
  return (
    <ListProvider>
      <AuthProvider>
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
      </AuthProvider>
    </ListProvider>
  );
}

export default App;
