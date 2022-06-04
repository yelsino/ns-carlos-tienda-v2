import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Organismos/Sidebar/Sidebar';
import PropTypes from 'prop-types';


const MainStore = ({ isAutenticated }) => {
  const [viewlist, setViewList] = useState(false);

  return (
    <>
      {isAutenticated ? (
        <div className='max-w-[100rem] mx-auto px-5'>
        
          <Header list={viewlist} setList={setViewList} />
          <div className='flex'>
            {/* <Sidebar /> */}
            
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
