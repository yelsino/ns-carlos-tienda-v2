import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterApp from './router/RouterApp';
import { SocketProvider } from './Context/SocketContext';
import { ProductProvider } from './Context/Product/ProductContext';
import { AuthProvider } from './Context/auth/AuthContext';
import { ListProvider } from './Context/List/ListContext';

function App() {
  return (
    <ListProvider>
      <AuthProvider>
        <ProductProvider>
          <SocketProvider>
            <Router>
              <RouterApp />
            </Router>
          </SocketProvider>
        </ProductProvider>
      </AuthProvider>
    </ListProvider>
  );
}

export default App;
