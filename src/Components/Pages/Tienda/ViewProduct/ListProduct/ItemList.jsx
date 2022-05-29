import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../Context/auth/AuthContext';
import { ListContext } from '../../../../../Context/List/ListContext';
import { SocketContext } from '../../../../../Context/SocketContext';
import { useOnClick } from '../../../../../Hooks/useOnClick';
import { IconDelete } from '../../../../Atoms/Icons';

const ItemList = ({ item, selectProduct }) => {
  // const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);

  const {
    _id,
    product: { name, typeOfsale },
    quantities,
  } = item;

  const totalQuantity = () => {
    const quantity = quantities.reduce((acc, curr) => {
      switch (typeOfsale) {
        case 'UNIDADES':
          return acc + curr.quantity;

        case 'KILOGRAMOS':
        case 'LITROS':
        case 'FRAGTONS':
          return acc + (curr.quantity * curr.weight) / 1000;

        default:
          return console.log('no ocurrio nada');
      }
    }, 0);

    switch (typeOfsale) {
      case 'UNIDADES':
        return `${quantity} und`;
      case 'KILOGRAMOS':
        return `${
          Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
        } kg`;
      case 'LITROS':
        return `${
          Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
        } lt`;
      case 'FRAGTONS':
        return `${
          Number.isInteger(quantity) ? quantity : quantity.toFixed(2)
        } ft`;
      default:
        return null;
    }
  };

  const totalAmount = () => {
    const amountOfProduct = quantities.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    return (
      (Math.round(((Math.round(amountOfProduct * 100) / 5) * 5) / 5) * 5) /
      100
    ).toFixed(2);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={`  ${
        isOpen ? ' rounded-lg border border-gray-100 shadow-sm' : ''
      }`}
    >
      <motion.li
        layout
        onClick={toggleOpen}
        value={item}
        id={_id}
        style={{}}
        className={`shadow-md   rounded-lg px-5 py-3  flex  justify-between items-center bg-white cursor-pointer  ${
          isOpen ? ' shadow-none border-b rounded-none' : ''
        }`}
      >
        <p
          className={`truncate font-semibold transition-all duration-300 ease-in-out  ${
            isOpen ? 'text-gray-900 font-bold ' : 'text-gray-500'
          }`}
        >
          {name}
        </p>

        <div className='flex'>
          <div className='flex items-center w-20 '>{totalQuantity()}</div>
          <div className='flex items-center w-16 '>
            <span className='text-[12px] '>S/.</span>
            <span className='text-color_green_7 font-semibold'>
              {totalAmount()}
            </span>
          </div>
        </div>
      </motion.li>
      <AnimatePresence>{isOpen && <Content data={item} />}</AnimatePresence>
    </div>
  );
};

const Content = ({ data }) => {
  const [disabled, setDisabled] = useOnClick(300);
  const { socket } = useContext(SocketContext);
  const {
    liststate: { list },
  } = useContext(ListContext);
  const { auth } = useContext(AuthContext);

  const removeProductOfList = () => {
    setDisabled(true);
    socket?.emit('update-list', {
      type: 'REMOVE_PRODUCT_OF_LIST',
      listID: list._id,
      productID: data.product._id,
      userID: auth.uid,
      // mountID: weight,
    });
  };

  const removeWeightOfProduct = weightID => {
    setDisabled(true);
    socket?.emit('update-list', {
      type: 'REMOVE_WEIGHT_OF_PRODUCT',
      listID: list._id,
      productID: data.product._id,
      userID: auth.uid,
      weightID,
    });
  };

  return (
    <motion.div
      className='bg-white p-4 px-5  '
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className=' pb-1 font-semibold text-gray-700'>Resumen</p>
      {data.quantities.map(
        item =>
          item.quantity > 0 && (
            <div key={item._id} className='flex justify-between text-gray-600'>
              <span>{item.weight} gr</span>
              <div className='flex  '>
                <span className='w-20'>{item.quantity} und</span>
                <div className='flex items-center justify-between w-16 '>
                  <span className='text-[12px] '>S/.</span>
                  <span className='text-color_green_7 font-semibold'>
                    {item.price * item.quantity}
                  </span>
                  <button
                    disabled={disabled}
                    onClick={() => removeWeightOfProduct(item._id)}
                    className=' pl-3 text-gray-400'
                  >
                    <IconDelete style={'w-4 h-4'} />
                  </button>
                </div>
              </div>
            </div>
          )
      )}
    
      <div className='gap-x-5 flex font-poppins border-t mt-5 pt-3 justify-end'>
        <button className=' font-extralight text-color_green_7'>Agregar</button>
        <button
          disabled={disabled}
          onClick={removeProductOfList}
          className='text-rose-500 font-light'
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
};

Content.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ItemList;

ItemList.propTypes = {
  item: PropTypes.object,
  selectProduct: PropTypes.func,
};
