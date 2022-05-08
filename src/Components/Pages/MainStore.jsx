import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Organismos/Sidebar/Sidebar';

const MainStore = () => {
  const [viewlist, setViewList] = useState(false);

  return (
    <div className='max-w-[100rem] mx-auto px-5'>
      <Header list={viewlist} setList={setViewList} />
      <div className='flex'>
        <Sidebar />
        <div className='px-5 pt-5 w-full '>
          <Outlet context={[viewlist,setViewList]} />
        </div>
      </div>
    </div>
  );
};

export default MainStore;
