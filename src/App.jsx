import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterApp from './router/RouterApp';
import { SocketProvider } from './Context/SocketContext';
import { ProductProvider } from './Context/Product/ProductContext';
import { AuthProvider } from './Context/auth/AuthContext';
import { ListProvider } from './Context/List/ListContext';
import { DirectionProvider } from './Context/Direction/DirectionContext';
import { OrderProvider } from './Context/Order/OrderContext';
import { initializeApp } from "firebase/app";


function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBOza0A5ddLvW2LnSWYmICvmEDRZ9x6jS0",
    authDomain: "tienda-carlos.firebaseapp.com",
    projectId: "tienda-carlos",
    storageBucket: "tienda-carlos.appspot.com",
    messagingSenderId: "45200427720",
    appId: "1:45200427720:web:3e998bf869b8ab43fe33fd"
  };

  initializeApp(firebaseConfig);

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
  );
}

export default App;
