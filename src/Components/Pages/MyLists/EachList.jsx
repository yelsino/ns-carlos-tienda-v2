import { AnimatePresence, motion } from 'framer-motion';
import { IconRight } from '../../Atoms/Icons';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListContext } from '../../../Context/List/ListContext';
import { formatToMoney } from '../../../helpers/formatToMoney';

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
const Content = ({ deleteList, listID }) => {
  const [subTotal, setSubTotal] = useState(0);
  const {
    liststate: { lists, list },
  } = useContext(ListContext);

  const mountTotalOfList = () => {
    return list.products.reduce((acc, curr) => {
      const mountPerProduct = curr.quantities.reduce((accq, q) => {
        return accq + q.quantity * q.price;
      }, 0);

      return acc + mountPerProduct;
    }, 0);
  };

  useEffect(() => {
    if (list) {
      setSubTotal(Number(formatToMoney(mountTotalOfList())).toFixed(1));
    }
  }, [list]);

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
        <p>{list.products.length} productos</p>
        <p>{subTotal} nuevos soles</p>
      </div>
      <p className='text-color_green_7 font-light '>Acciones</p>

      <Link
        to='/tienda'
        className='bg-white text-color_green_7 font-semibold px-4 py-2 rounded-sm border text-center'
      >
        Agregar productos
      </Link>

      {lists.length > 1 && (
        <button
          onClick={() => {
            deleteList(listID);
          }}
          className='bg-white text-rose-500 font-semibold px-4 py-2 rounded-sm border'
        >
          Eliminar lista
        </button>
      )}
    </motion.div>
  );
};
