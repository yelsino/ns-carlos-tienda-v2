import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Organismos/Sidebar/Sidebar';
import PropTypes from 'prop-types';
// import { SocketContext } from '../../Context/SocketContext';
// import { AuthContext } from '../../Context/auth/AuthContext';
// import { SocketContext } from '../../Context/SocketContext';
// import { AuthContext } from '../../Context/auth/AuthContext';

const MainStore = ({ isAutenticated }) => {
  const [viewlist, setViewList] = useState(false);

  // const { socket, online } = useContext(SocketContext);
  // const { auth } = useContext(AuthContext);

  // const [join, setJoin] = useState(false);

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setJoin(true);
  //   }, 1000);

  //  return  () => clearTimeout(id);
  // });

  // useEffect(() => {
  //   if (join) {
  //     socket.emit('get-list', { userID: auth.uid });
  //   }
  // }, [join]);

  // const handlePushList = () => {
  //   socket?.emit('create-list', { userID: auth.uid, name: 'Primera Lista' });
  // };

  return (
    <>
      {isAutenticated ? (
        <div className='max-w-[100rem] mx-auto px-5'>
          {/* <button onClick={handlePushList}>BOTON DE CREAR LISTA</button> */}
          {/* <button
            onClick={() => {
              socket.emit('get-list', { userID: 'dasdsdasdas' });
            }}
          >
            PRUEBA
          </button> */}
          <Header list={viewlist} setList={setViewList} />
          <div className='flex'>
            <Sidebar />
            <div className='px-5 pt-5 w-full '>
              <Outlet context={[viewlist, setViewList]} />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to='/auth/login' />
      )}
    </>
  );
};

export default MainStore;

MainStore.propTypes = {
  isAutenticated: PropTypes.bool.isRequired,
};
