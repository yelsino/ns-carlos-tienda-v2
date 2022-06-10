import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import PropTypes from 'prop-types';
import MenuMovil from '../Menu/MenuMovil';


const MainStore = ({ isAutenticated }) => {
  const [viewlist, setViewList] = useState(false);

  return (
    <>
      {isAutenticated ? (
        <div className='max-w-[100rem] mx-auto px-5'>
        
          <Header list={viewlist} setList={setViewList} />
          <div className='flex'>
            
            <div className='px-5 pt-5 w-full '>
              <Outlet context={[viewlist, setViewList]} />

              
            </div>
            <MenuMovil/>
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
