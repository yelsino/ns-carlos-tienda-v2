import { AnimatePresence, motion } from 'framer-motion';
import { IconRight } from '../../Atoms/Icons';
import PropTypes from 'prop-types';
import { useState } from 'react';

const EachList = ({ list, setList, currlist, deleteList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        onClick={toggleOpen}
        value={list}
        id={list._id}
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
          onClick={e => {
            e.stopPropagation();
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
      </motion.li>
      <AnimatePresence>
        {isOpen && <Content listID={list._id} deleteList={deleteList} />}
      </AnimatePresence>
    </div>
  );
};

export default EachList;

EachList.propTypes = {
  list: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
  currlist: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
const Content = ({ deleteList,listID }) => {
  return (
    <motion.div
      className='bg-white  w-[320px] shadow-md p-4 px-5 flex flex-col gap-y-3'
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <p className='text-color_green_7 font-light '>Resumen</p>
        <p>55 productos</p>
        <p>56.60 nuevos soles</p>
      </div>
      <p className='text-color_green_7 font-light '>Acciones</p>

      <button className='bg-white text-color_green_7 font-semibold px-4 py-2 rounded-sm border'>
        Hacer pedido
      </button>
      <button
        onClick={()=>{
            deleteList(listID)
        }}
        className='bg-white text-rose-500 font-semibold px-4 py-2 rounded-sm border'
      >
        Eliminar lista
      </button>
    </motion.div>
  );
};
