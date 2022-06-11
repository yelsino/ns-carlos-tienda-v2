import Input from '../../../Atoms/Input';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const UserDates = ({ data }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    names: data?.names,
    surnames: data?.surnames,
    email: data?.email,
    mobile: data?.mobile,
  });

  const {socket} = useOutletContext();

  const showUpdateUser = () => {
    setShow(true);
    // setUser(userData?);
  };

  const cancelUpdateUser = () => {
    setUser({
      names: data?.names,
      surnames: data?.surnames,
      email: data?.email,
      mobile: data?.mobile,
    });
    setShow(false);
  };

  const updatedUser = () => {
    if (!user.names || !user.surnames || !user.email || !user.mobile) {
      return alert('Por favor complete todos los campos');
    }
    socket.emit('user', {
      userID: data?.uid,
      data: user,
      type: 'UPDATE_USER',
    });

    setShow(false);
  };

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='w-full border-b pb-5'>
      <div className='flex justify-between  pt-5 font-poppins'>
        <p className='font-bold pb-3 '>Sus datos</p>
        {show ? (
          <button
            onClick={updatedUser}
            className='bg-purple-500 text-white rounded-full px-3 py-1 outline-none'
          >
            +guardar
          </button>
        ) : (
          <button
            onClick={showUpdateUser}
            className='text-purple-500 outline-none'
          >
            actualizar
          </button>
        )}
      </div>
      <div className='w-full flex flex-col gap-y-3'>
        <Input
          name='names'
          title='Nombres'
          readOnly={!show}
          value={user.names}
          onChange={handleChange}
        />
        <Input
          title='Apellidos'
          name='surnames'
          readOnly={!show}
          value={user?.surnames}
          onChange={handleChange}
        />
        <Input
          name='mobile'
          title='Celular'
          readOnly={!show}
          value={user?.mobile}
          onChange={handleChange}
        />
        {/* <Input
          name='email'
          title='Correo'
          readOnly={!show}
          value={user.email}
          onChange={handleChange}
        /> */}
        {show && (
          <button
            onClick={cancelUpdateUser}
            className='w-full py-3 bg-rose-500 text-white font-semibold font-poppins'
          >
            cancelar actualizacion
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDates;

UserDates.propTypes = {
  data: PropTypes.object,
};

// const userData = {
//   names: '',
//   surnames: '',
//   email: '',
//   mobile: '',
// };
