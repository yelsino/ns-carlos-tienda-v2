import { Reorder, useMotionValue } from 'framer-motion';
import PropTypes from 'prop-types';
import { IconMinus, IconPlus } from '../../../../Atoms/Icons';
import { useRaisedShadow } from './use-raised-shadow';

const ItemList = ({ item }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      key={item}
      value={item}
      id={item}
      style={{ boxShadow, y }}
      className='shadow-md rounded-lg px-5 py-4  first-letter:text-[10px] flex  justify-between items-center bg-white cursor-grab'
    >
      <span className='text-color_green_7 font-semibold '>x1</span> Cebolla
      china
      <div className='flex gap-2 text-color_green_7'>
        <button className='bg-color_green_2 rounded-md px-1 flex justify-center items-center'>
          <IconMinus />
        </button>
        <button className='bg-color_green_2 rounded-md px-2 py-[2px] flex justify-center items-center'>
          <IconPlus />
        </button>
      </div>
      <div className='flex items-center'>
        5<span className='text-[10px]'>Kg</span>
      </div>
      <div className='flex items-center'>
        <span className='text-[10px] '>S/.</span>
        <span className='text-color_green_7 font-semibold'>20</span>
      </div>
    </Reorder.Item>
  );
};

export default ItemList;

ItemList.propTypes = {
  item: PropTypes.number,
};
