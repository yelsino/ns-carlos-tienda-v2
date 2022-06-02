import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Input from '../../Atoms/Input';
import Select from '../../Atoms/Select';
import CreateDirectionForm from './YourFacturation/CreateDirectionForm';
import TypePayment from './YourFacturation/TypePayment';
import UserDates from './YourFacturation/UserDates';
import ViewDirection from './YourFacturation/ViewDirection';

const YourFacturation = () => {
  const [create, setCreate] = useState(false);
  const [socket, auth, setDirection, data] = useOutletContext();



  const showCreateDirection = () => {
    setCreate(!create);
  };

  return (
    <>
      <h2 className='text-3xl font-poppins font-extrabold'>Su Facturación</h2>
      <img
        className='rounded-full object-cover w-32 h-32'
        src='https://res.cloudinary.com/dwkfj5sxb/image/upload/v1651857885/ale_g4ceqr.jpg'
      />


      <UserDates data={auth.user}
      
      />

      {create ? (
        <CreateDirectionForm
          socket={socket}
          setShow={showCreateDirection}
          auth={auth}
        />
      ) : (
        <ViewDirection
          setDirection={setDirection}
          data={data}
          setShow={showCreateDirection}
        />
      )}

      <TypePayment />
    </>
  );
};

export default YourFacturation;


