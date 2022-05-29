import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/auth/AuthContext';
import { ListContext } from '../../../Context/List/ListContext';
import { SocketContext } from '../../../Context/SocketContext';
import ListProduct from '../Tienda/ViewProduct/ListProduct/ListProduct';
import PortalComponent from '../../Atoms/Portals/PortalComponent';
import EachList from './EachList';

export const MyLists = () => {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const {
    liststate: { lists, list },
    setList,
  } = useContext(ListContext);

  const [modal, setModal] = useState(false);

  const createNewList = NAMELIST => {
    socket?.emit('update-list', {
      type: 'CREATE_LIST',
      userID: auth.uid,
      nameList: NAMELIST,
    });

    setModal(false);
  };

  const deleteList = (listID) => {
    socket?.emit('update-list', {
      type: 'DELETE_LIST',
      userID: auth.uid,
      listID,
    });
    console.log(listID);
  }

  return (
    <>
    {
      list && (
        <div className='max-w-5xl mx-auto pt-10'>
        <h2 className='font-poppins text-2xl font-bold border-b'>MIS LISTAS</h2>
  
        <div className='flex  pt-10'>
          <div className=' flex flex-col gap-y-1'>
            <LayoutGroup>
              <motion.ul
                className='flex flex-col gap-y-1'
              >
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
          <div className=' hidden md:block w-full'>
            <ListProduct />
          </div>
        </div>
  
        <AnimatePresence>
          {modal && (
            <PortalComponent open={modal} setOpen={setModal}>
              <InputNewList setModal={setModal} handleSubmit={createNewList} />
            </PortalComponent>
          )}
        </AnimatePresence>
      </div>
      )
    }
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
      className='flex justify-center p-10 flex-col bg-white rounded-lg gap-y-3 w-[400px] relative'
      onClick={e => e.stopPropagation()}
    >
      <p>Nombra a tu lista</p>
      <input
        type='text'
        className='w-full px-3 py-2 bg-white rounded-sm border text-sm text-gray-700  outline-none'
        onChange={e => setName(e.target.value)}
      />

      <button
        onClick={() => handleSubmit(name)}
        className='px-3 py-2 bg-green-500 rounded-sm text-white text-sm font-bold'
      >
        Crear
      </button>

      <button
        onClick={() => setModal(false)}
        className='px-3 py-2 bg-red-500 rounded-sm text-white text-sm font-bold absolute top-0 right-0'
      >
        Cancelar
      </button>
    </motion.div>
  );
};
