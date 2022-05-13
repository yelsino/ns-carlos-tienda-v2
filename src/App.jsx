import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterApp from './router/RouterApp';
import { SocketProvider } from './Context/SocketContext';
import { ProductProvider } from './Context/Product/ProductContext';
import { AuthProvider } from './Context/auth/AuthContext';
function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <SocketProvider>
          <Router>
            <RouterApp />
          </Router>
        </SocketProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
