import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Input from '../../Atoms/Input';
import Select from '../../Atoms/Select';
import CreateDirectionForm from './YourFacturation/CreateDirectionForm';
import TypePayment from './YourFacturation/TypePayment';
import UserDates from './YourFacturation/UserDates';
import ViewDirection from './YourFacturation/ViewDirection';

const YourFacturation = () => {
  const [create, setCreate] = useState(false);

  const { socket, auth, setDirection, data, setOrderData,orderData, liststate } = useOutletContext();
  const [typePayment, setTypePayment] = useState('contra-entrega');

  const navigete = useNavigate()

  useEffect(() => {
    setOrderData(prev => {
      return { ...prev, typePayment };
    });
  }, [typePayment]);

  useEffect(() => {
    if (data.direction) {
      setOrderData(prev => {
        return { ...prev, directionID: data.direction._id };
      });
    }
  }, [data]);

  const showCreateDirection = () => {
    setCreate(!create);
  };

useEffect(()=>{
  if(!orderData.listID){
    navigete('/payment/your-list')
  }
},[])

  return (
    <>
      <h2 className='text-3xl font-poppins font-extrabold'>Su Facturación</h2>
      {/* <img
        className='rounded-full object-cover w-32 h-32'
        src='https://res.cloudinary.com/dwkfj5sxb/image/upload/v1650590795/yelsin_rp8zyt.jpg'
      /> */}

      <UserDates data={auth.user} />

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

      <TypePayment typePayment={typePayment} setTypePayment={setTypePayment} />
    </>
  );
};

export default YourFacturation;
