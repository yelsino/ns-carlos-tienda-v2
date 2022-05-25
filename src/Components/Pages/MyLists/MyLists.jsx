import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/auth/AuthContext';
import { ListContext } from '../../../Context/List/ListContext';
import { SocketContext } from '../../../Context/SocketContext';
import { IconHeart, IconRight } from '../../Atoms/Icons';
import ListProduct from '../Tienda/ViewProduct/ListProduct/ListProduct';
import PropTypes from 'prop-types';
import PortalComponent from '../../Atoms/Portals/PortalComponent';

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

  return (
    <div className='px-20 pt-10'>
      <h2 className='font-poppins text-2xl font-bold border-b'>MIS LISTAS</h2>

      <div className='flex  pt-10'>
        <div className='w-1/2 flex flex-col gap-y-2'>
          {lists.map((item, i) => (
            <ItemList
              list={item}
              key={item._id}
              setList={setList}
              currlist={list._id}
            />
          ))}
          <button
            onClick={setModal}
            className='flex px-5 py-3 gap-x-3 bg-white shadow-md items-center w-[320px] rounded-sm max-w-xs justify-center text-color_green_7 rounded-t-none cursor-pointer'
          >
            Añadir lista
          </button>
        </div>
        <div className=' hidden lg:block'>
          <ListProduct  />
        </div>
      </div>


      <AnimatePresence>
        {modal && (
          <PortalComponent open={modal} setOpen={setModal}>
           {/* <InputNewList setModal={setModal} handleSubmit={createNewList} /> */}
           <div>
             gaaaaaaaaaa
           </div>
          </PortalComponent>
        )}
      </AnimatePresence>

    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ItemList = ({ list, setList, currlist }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='flex px-5 py-3 gap-x-3 bg-white shadow-md items-center rounded-sm w-[320px] justify-between'
    >
      <div className='flex items-center gap-x-3'>
        <span className='cursor-pointer'>
          {/* <IconHeart /> */}
          <IconRight />
        </span>
        <p className='truncate'>{list.name}</p>
      </div>
      <button
        onClick={() => {
          setList({
            type: 'SELECT_LIST',
            payload: list,
          });
        }}
      >
        <input
          readOnly
          value={list._id}
          type='checkbox'
          checked={list._id === currlist}
          className='w-5 h-5 accent-violet-500 cursor-pointer' 
        />
      </button>
    </motion.div>
  );
};
ItemList.propTypes = {
  list: PropTypes.object,
};

// eslint-disable-next-line react/prop-types
const InputNewList = ({ setModal, handleSubmit }) => {
  const [name, setName] = useState('');
  return (
    <div
      className='flex justify-center p-10 flex-col bg-white rounded-lg gap-y-3 w-[400px] relative'
      onClick={e => e.stopPropagation()}
    >
      <p>Nombra a tu lista</p>
      <input
        type='text'
        className='w-full px-3 py-2 bg-white rounded-sm border text-sm text-gray-700 focus:outline-none focus:shadow-outline'
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
    </div>
  );
};
