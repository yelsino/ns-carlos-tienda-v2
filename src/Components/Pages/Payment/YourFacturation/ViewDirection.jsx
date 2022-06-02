import { useState } from 'react';
import PortalComponent from '../../../Atoms/Portals/PortalComponent';
import Select from '../../../Atoms/Select';
import PropTypes from 'prop-types';
import Input from '../../../Atoms/Input';
import { IconLocation } from '../../../Atoms/Icons';


const ViewDirection = ({ setShow, setDirection, data }) => {
  const [modal, setModal] = useState(false);

  const selectDirection = direction => {
    setDirection({
      type: 'SELECT_DIRECTION',
      payload: direction,
    });
  };

  return (
    <div className=' w-full flex flex-col gap-y-3'>
      <div className='flex justify-between  pt-5 font-poppins'>
        <p className='font-bold'>Indique su dirección</p>{' '}
        <button onClick={setShow} className='text-purple-500 outline-none'>
          añadir
        </button>
      </div>

      <button
        onClick={() => setModal(true)}
        className='w-full border bg-gray-50 text-black font-bold py-4 px-5 rounded-lg flex justify-center gap-x-2'
      >
        <img src='https://img.icons8.com/emoji/24/000000/backhand-index-pointing-right-emoji.png' />

        <span>aqui!</span>
      </button>

      <Input
        name='ninguno'
        title='Nombre y número de dirección'
        onChange={() => {}}
        value={data?.direction?.name}
        readOnly={true}
      />
      <Input
        name='reference'
        title='Referencia'
        onChange={() => {}}
        readOnly={true}
        value={data?.direction?.reference}
      />

      <PortalComponent open={modal} setOpen={setModal}>
        <div
          onClick={e => e.stopPropagation()}
          className='bg-white px-10 pb-10 pt-14 flex flex-col gap-y-3  w-[500px] rounded-lg relative'
        >
          <button
            onClick={() => setModal(false)}
            className='absolute top-0 right-0 bg-rose-500 text-white px-5 rounded-tr-lg py-2'
          >
            Cerrar
          </button>
          <h3 className='font-bold'>Seleccione una de sus direcciones</h3>
          <p className='text-gray-500'>Aquella dirección seleccionada será donde se enviará el pedido actual que está generando</p>
          <div className=' flex flex-col gap-y-3 h-[300px] overflow-y-scroll'>
            {data?.directions.map((d, i) => (
              <Select
                key={d._id}
                text={d.name}
                onClick={() => selectDirection(d)}
                checked={d._id === data?.direction?._id}
                icon={<IconLocation/>}
              />
            ))}
          </div>
        </div>
      </PortalComponent>
    </div>
  );
};

export default ViewDirection;

ViewDirection.propTypes = {
  setShow: PropTypes.func.isRequired,
  setDirection: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
