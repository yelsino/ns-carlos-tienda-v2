import { useState } from "react";
import { useOnClick } from "../../../../Hooks/useOnClick";
import PropTypes from 'prop-types';
import Input from "../../../Atoms/Input";

const CreateDirectionForm = ({ setShow, socket, auth }) => {
    const [disabled, setDisabled] = useOnClick(200);
  
    const [calle, setCalle] = useState({
      name: '',
      reference: '',
    });
  
    const createDirection = () => {
      if (!calle.name || !calle.reference) {
        return alert('Por favor complete todos los campos');
      }
      setDisabled(true);
      socket?.emit('direction', {
        type: 'CREATE_DIRECTION',
        userID: auth.uid,
        name: calle.name,
        reference: calle.reference,
      });
  
      setShow();
    };
  
    const handleChange = e => {
      setCalle({ ...calle, [e.target.name]: e.target.value });
    };
  
    return (
      <div className='w-full flex flex-col gap-y-5'>
        <div className='flex justify-between  pt-5 font-poppins '>
          <p className='font-bold'>Registrando dirección</p>{' '}
          <button
            disabled={disabled}
            onClick={createDirection}
            className='bg-purple-500 text-white rounded-full px-3 py-1 outline-none'
          >
            +guardar
          </button>
        </div>
        <Input
          name="name"
          title='Nombre y número de dirección'
          value={calle.name}
          onChange={handleChange}
        />
        <Input
          name="reference"
          title='Referencia'
          onChange={handleChange}
          value={calle.reference}
          type='textarea'
          className='bg-color_green_2 text-color_green_7 w-full py-3 outline-none px-5'
        />

        <button
            onClick={setShow}
            className='w-full py-3 bg-rose-500 text-white font-semibold font-poppins'
          >
            cancelar registro
          </button>
      </div>
    );
  };
  
  CreateDirectionForm.propTypes = {
    setShow: PropTypes.func.isRequired,
    socket: PropTypes.object,
    auth: PropTypes.object,
  };

  export default CreateDirectionForm