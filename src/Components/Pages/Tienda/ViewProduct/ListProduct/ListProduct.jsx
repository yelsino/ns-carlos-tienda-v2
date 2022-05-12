import { Transition } from '@headlessui/react';
import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AnimationBook from '../../../../Atoms/Animation/Book';
import { IconGridView } from '../../../../Atoms/Icons';
import ItemList from './ItemList';

const ListProduct = () => {
  const [viewlist] = useOutletContext();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(items);

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
        <div className=' flex items-center  flex-col mt-5 lg:mt-10  w-full'>
          <div className='flex justify-between w-[300px]  mb-3 '>
            <span className='text-white'>
              <IconGridView />
            </span>
            <p className='font-bold '>MI nombre de lista</p>
            <span className='text-gray-500'>
              <IconGridView />
            </span>
          </div>

          {/* LISTA */}

          <Reorder.Group
            axis='y'
            onReorder={setData}
            values={data}
            // style={{ height: 250, border: "1px solid black", overflowY: "auto" }}
            layoutScroll
            className='lg:text-sm w-[340px]  lg:w-[310px] h-[calc(100vh-220px)]  overflow-y-scroll pb-5'
          >
            {data.map(item => (
              <ItemList key={item} item={item} />
            ))}
          </Reorder.Group>
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

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
