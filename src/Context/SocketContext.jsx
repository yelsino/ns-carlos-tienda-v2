import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../Hooks/useSocket';
import PropTypes from 'prop-types';
import { ProductContext } from './Product/ProductContext';
import { AuthContext } from './auth/AuthContext';
import { ListContext } from './List/ListContext';

const baseUrl = import.meta.env.VITE_SOME_KEY;

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } =
    useSocket(baseUrl);

  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ProductContext);
  const { setList } = useContext(ListContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    socket?.on('get-products', products => {
      dispatch({
        type: 'GET_PRODUCTS',
        payload: products,
      });
    });

    socket?.on('get-user-lists', lists => {
      setList({
        type: 'GET_USER_LISTS',
        payload: lists,
      });
    })
    

  
  }, [socket, dispatch]);


  return (
    <SocketContext.Provider
      value={{ socket, online, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
