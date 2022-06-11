import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/auth/AuthContext';
import { ListContext } from '../../../Context/List/ListContext';
import { SocketContext } from '../../../Context/SocketContext';
import ListProduct from '../Tienda/ViewProduct/ListProduct/ListProduct';
import PortalComponent from '../../Atoms/Portals/PortalComponent';
import EachList from './EachList';
import Input from '../../Atoms/Input';

export const MyLists = () => {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const {
    liststate: { lists, list },
    setList,
  } = useContext(ListContext);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const createNewList = NAMELIST => {
    socket?.emit('update-list', {
      type: 'CREATE_LIST',
      userID: auth.uid,
      nameList: NAMELIST,
    });

    setModal(false);
  };

  const deleteList = listID => {
    socket?.emit('update-list', {
      type: 'DELETE_LIST',
      userID: auth.uid,
      listID,
    });

    setList({
      type: 'SELECT_LIST',
      payload: lists[0],
    });
    console.log(listID);
  };

  return (
    <>
      {list && (
        <div className='max-w-5xl mx-auto pt-10'>
          <div className='flex  '>
            <div className=' flex flex-col gap-y-1  mx-auto'>
              <h2 className=' pb-5 flex justify-between'>
                <span className='text-xl font-bold font-poppins '>
                  MIS LISTAS
                </span>

                <button
                  onClick={() => setModal2(true)}
                  className='text-color_green_7 sm:hidden text-lg font-bold'
                >
                  Ver lista
                </button>
              </h2>
              <LayoutGroup>
                <motion.ul className='flex flex-col gap-y-1'>
                  {lists.map((item, i) => (
                    <EachList
                      list={item}
                      key={item._id}
                      setList={setList}
                      currlist={list._id}
                      deleteList={deleteList}
                    />
                  ))}
                </motion.ul>
              </LayoutGroup>
              <button
                onClick={() => setModal(true)}
                className='flex px-5 py-3 gap-x-3 bg-white shadow-md items-center w-[320px] rounded-sm max-w-xs justify-center text-color_green_7 rounded-t-none cursor-pointer'
              >
                Añadir lista
              </button>
            </div>
            <div className=' hidden sm:block w-full'>
              <ListProduct />
            </div>
          </div>

          <AnimatePresence>
            {modal2 && (
              <PortalComponent open={modal2} setOpen={setModal2}>
                <div
                  onClick={e => e.stopPropagation()}
                  className=' relative  w-full bg-white h-full pt-14'
                >
                  <ListProduct />
                  <button
                    onClick={() => setModal2(false)}
                    className='px-3 py-2 bg-red-500 rounded-sm text-white text-sm font-bold absolute top-0 right-0'
                  >
                    Cerrar
                  </button>
                </div>
              </PortalComponent>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {modal && (
              <PortalComponent open={modal} setOpen={setModal}>
                <InputNewList
                  setModal={setModal}
                  handleSubmit={createNewList}
                />
              </PortalComponent>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

// eslint-disable-next-line react/prop-types
const InputNewList = ({ setModal, handleSubmit }) => {
  const [name, setName] = useState('');
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className='flex justify-center p-10 flex-col bg-white sm:rounded-lg  sm:w-[400px] relative h-full sm:h-auto w-full '
      onClick={e => e.stopPropagation()}
    >
      <div className='max-w-sm mx-auto flex flex-col gap-y-5'>
        <div>
          <h3 className='text-xl font-bold'>Nombra a tu lista</h3>
          <p className='text-gray-500'>
            Estas creando una nueva lista, añada un nombre y empieza de
            llenarlos de productos
          </p>
        </div>
        <div className='py-5'>
          <img
            className='mx-auto'
            src='https://img.icons8.com/cute-clipart/128/undefined/shopping-cart.png'
          />
        </div>

        <Input
          title='Digite aqui'
          type='text'
          onChange={e => setName(e.target.value)}
          value={name}
        />
        {/* <input
        type='text'
        className='w-full px-3 py-2 bg-white rounded-sm border text-sm text-gray-700  outline-none'
        onChange={e => setName(e.target.value)}
      /> */}

        <button
          onClick={() => handleSubmit(name)}
          className='px-3 py-4 bg-green-500 rounded-sm text-white text-sm font-bold font-poppins tracking-widest'
        >
          Crear
        </button>
      </div>

      <button
        onClick={() => setModal(false)}
        className='px-3 py-2 bg-red-500 rounded-sm text-white text-sm font-bold absolute top-0 right-0'
      >
        Cancelar
      </button>
    </motion.div>
  );
};
