import { createContext,  useContext,  useEffect } from 'react';
import { useSocket } from '../Hooks/useSocket';
import PropTypes from 'prop-types';
import { ProductContext } from './Product/ProductContext';

const baseUrl = import.meta.env.VITE_SOME_KEY;
console.log(baseUrl);

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } =
    useSocket(baseUrl);

    const { dispatch } = useContext(ProductContext)


  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    socket?.on('get-products', products => {
        console.log(products);
      dispatch({
        type: 'GET_PRODUCTS',
        payload: products,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {

  }, [socket, dispatch])

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
