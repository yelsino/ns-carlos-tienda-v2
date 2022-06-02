import { LayoutGroup, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { ListContext } from '../../../Context/List/ListContext';
import { IconListas } from '../../Atoms/Icons';
import PortalComponent from '../../Atoms/Portals/PortalComponent';
import Select from '../../Atoms/Select';
import ItemList from '../Tienda/ViewProduct/ListProduct/ItemList';

const YourList = () => {
  const {
    liststate: { list, lists }, setList
  } = useContext(ListContext);

  const [modal, setModal] = useState(false);

  return (
    <>
      <h2 className='text-3xl font-poppins font-extrabold'>Su Lista</h2>
      <p className='text-lg font-poppins'>Arroz con pollo a la wachana</p>
      <p className='flex justify-between w-full px-2'>
        <span className='font-bold font-poppins text-lg'>Productos</span>
        <button onClick={() => setModal(true)} className='text-purple-500'>
          Cambiar lista
        </button>
      </p>

      <LayoutGroup>
        <motion.ul
          className=' w-full gap-y-1   h-[calc(100vh-310px)]  overflow-y-scroll px-2 pt-1 flex flex-col '
          layout
          initial={{ borderRadius: 25 }}
        >
          {list?.products?.map(item => (
            <ItemList key={item._id} item={item} />
          ))}
        </motion.ul>
      </LayoutGroup>

      <div className='w-full px-2 '>
        <p className='flex justify-between'>
          <span>Costo de envio</span>
          <span>S/ 0.00</span>
        </p>
        <p className='flex justify-between'>
          <span>Sub total</span>
          <span>S/ 0.00</span>
        </p>
        <p className='border-b pt-3'></p>
        <p className='flex justify-between'>
          <span>Total</span>
          <span className='font-bold'>S/ 0.00</span>
        </p>
      </div>

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
          <p className='text-gray-500'>
            Aquella lista seleccionada será la lista a realizar este pedido,
            asegurese de no olvidarse.
          </p>
          <div className=' flex flex-col gap-y-3 h-[250px] overflow-y-scroll'>
            {lists.map(l => (
              <Select
                key={l._id}
                text={l.name}
                onClick={() => setList({ type: 'SELECT_LIST', payload: l })}
                checked={l._id === list._id}
                icon={<IconListas stile={'h-6 w-6'} />}
              />
            ))}
          </div>
        </div>
      </PortalComponent>
    </>
  );
};

export default YourList;
