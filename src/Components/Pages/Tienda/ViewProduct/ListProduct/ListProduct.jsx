import { Transition } from '@headlessui/react';
import { LayoutGroup, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AnimationBook from '../../../../Atoms/Animation/Book';
import { IconGridView } from '../../../../Atoms/Icons';
import ItemList from './ItemList';
import { ListContext } from '../../../../../Context/List/ListContext';

const ListProduct = () => {
  const [viewlist] = useOutletContext();
  const [show, setShow] = useState(false);

  const {
    liststate: { list },
  } = useContext(ListContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, [viewlist]);

  return (
    <>
      <Transition
        show={show}
        leave='transition-opacity duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className=' flex items-center  flex-col  w-full'>
          <div className='flex justify-between w-[300px]  mb-7 '>
            <span className='text-white'>
              <IconGridView />
            </span>
            <p className='font-bold '>{list?.name}</p>
            <span className='text-gray-500'>
              <IconGridView />
            </span>
          </div>

          {/* LISTA */}

          <LayoutGroup>
            <motion.ul
              className=' w-[340px] gap-y-1   h-[calc(100vh-220px)]  overflow-y-scroll pb-5 flex flex-col px-4'
              layout
              initial={{ borderRadius: 25 }}
            >
              {list?.products?.map(item => (
                <ItemList
                  key={item._id}
                  item={item}
                  //  selectProduct={selectProduct}
                />
              ))}
              <Link
                to='/payment'
                className='w-full  flex   text-color_green_7 font-semibold  py-3 shadow-md   rounded-lg px-5    bg-white justify-center'
              >Pedir envio</Link>
            </motion.ul>
          </LayoutGroup>
        </div>
      </Transition>

      <Transition
        show={!show}
        enter='transition-opacity duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='w-[340px] h-screen'
      >
        <div className=' flex justify-center items-center mt-20 '>
          <AnimationBook />
        </div>
      </Transition>
    </>
  );
};

export default ListProduct;

ListProduct.propTypes = {
  // upLista: PropTypes.func.isRequired,
  // data: PropTypes.array.isRequired,
  // selectProduct: PropTypes.func.isRequired,
};
