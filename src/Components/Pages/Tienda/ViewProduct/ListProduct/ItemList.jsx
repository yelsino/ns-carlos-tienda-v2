import {
  Reorder,
  // useMotionValue
} from 'framer-motion';
import PropTypes from 'prop-types';
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
        return `${quantity.toFixed(2)} kg`;
      case 'LITROS':
        return `${quantity.toFixed(2)} lt`;
      case 'FRAGTONS':
        return `${quantity.toFixed(2)} ft`;
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

  return (
    <Reorder.Item
      value={item}
      onClick={() => selectProduct(item.product)}
      id={_id}
      style={{}}
      className='shadow-md border-t border-gray-50 rounded-lg px-5 py-3  first-letter:text-[10px] flex  justify-between items-center bg-white cursor-pointer'
    >
      <p className='truncate font-semibold text-gray-500'>{name}</p>

      <div className='flex'>
        <div className='flex items-center w-20 '>
          {totalQuantity()}
          {/* <span className='text-[10px]'>Kg</span> */}
        </div>
        <div className='flex items-center w-16 '>
          <span className='text-[10px] '>s/.</span>
          <span className='text-color_green_7 font-semibold'>
            {totalAmount()}
          </span>
        </div>
      </div>
    </Reorder.Item>
  );
};

export default ItemList;

ItemList.propTypes = {
  item: PropTypes.object,
  selectProduct: PropTypes.func,
};
