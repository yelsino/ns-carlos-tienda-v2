import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../Hooks/useSocket';
import PropTypes from 'prop-types';
import { ProductContext } from './Product/ProductContext';
import { ListContext } from './List/ListContext';
import { AuthContext } from './auth/AuthContext';
// import algoliasearch from 'algoliasearch';
const baseUrl = import.meta.env.VITE_SOME_KEY;

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } =
    useSocket(baseUrl);

  const { dispatchProduct } = useContext(ProductContext);
  const { liststate, ok, setList } = useContext(ListContext);
  const { auth, setAuth } = useContext(AuthContext);

  // const searchClient = algoliasearch(
  //   '5RCKHIZLLD',
  //   '3938262410b41e1f5e3c9a531241ad1c'
  // );

  // const index = searchClient.initIndex('products-negocios-carlos');

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

  // useEffect(()=>{
  //   socket?.on('user-actions', user => {
  //     if(user.ok){
  //       console.log(user);
  //     }
  //     console.log(user);
  //     dispatch({
  //       type: 'UPDATE_USER',
  //       payload: user,
  //     });
  // },[socket])

  useEffect(() => {
    socket?.on('user-actions', user => {
      if (user.ok) {
        setAuth(prev => {
          console.log(prev);
          return { ...prev, user: user.user };
        });
      }
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('get-products', products => {
      dispatchProduct({
        type: 'GET_PRODUCTS',
        payload: products,
      });

      // !preguntar si ya existe data o no, o pasar esta funcion al backend
      // const addObjectIDForProducts = products.products.map(product => ({
      //   ...product,
      //   objectID: product._id,
      // }));

      // if (products.products.length > 0) {
      //   index.saveObjects(addObjectIDForProducts).then(({ data }) => {
      //     console.log('exito');
      //   });
      // }
    });

    socket?.on('get-user-lists', lists => {
      setList({
        type: 'GET_USER_LISTS',
        payload: lists,
      });

      if (liststate.list) {
        console.log('hay lista');
        setList({
          type: 'SELECT_LIST',
          payload: lists.find(list => list._id === liststate.list._id),
        });
      }

      if (!liststate.list) {
        console.log('no hay lista');
        setList({
          type: 'SELECT_LIST',
          payload: lists[0],
        });
      }
    });
  }, [socket, dispatchProduct, liststate, setList]);

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
