import {
  AnimatePresence,
  motion,
  Reorder,
  // useMotionValue
} from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import { IconMinus, IconPlus } from '../../../../Atoms/Icons';
// import { useRaisedShadow } from './use-raised-shadow';

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
    <div className={` p-1 ${isOpen ? ' rounded-lg border shadow-md' : ''}`}>
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
      <AnimatePresence>
        {isOpen && <Content data={quantities} />}
      </AnimatePresence>
    </div>
  );
};

const Content = ({ data }) => {
  return (
    <motion.div
      className='bg-white p-4 px-5  '
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className='text-color_green_7 font-light pb-1'>Resumen</p>
      {data.map(item => (
        <div key={item._id} className='flex justify-between'>
          <span>{item.weight} gr</span>
          <div className='flex'>
            <span className='w-20'>{item.quantity} und</span>
            <div className='flex items-center  w-16'>
              <span className='text-[12px] '>S/.</span>
              <span className='text-color_green_7 font-semibold'>{item.price * item.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

Content.propTypes = {
  data: PropTypes.array,
}

export default ItemList;

ItemList.propTypes = {
  item: PropTypes.object,
  selectProduct: PropTypes.func,
};
