import { Transition } from '@headlessui/react';
import { Reorder } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AnimationBook from '../../../../Atoms/Animation/Book';
import { IconGridView } from '../../../../Atoms/Icons';
import ItemList from './ItemList';
import PropTypes from 'prop-types'
import { ListContext } from '../../../../../Context/List/ListContext';


const ListProduct = ({ upLista, data, selectProduct }) => {
  const [viewlist] = useOutletContext();
  const [show, setShow] = useState(false);

  const { liststate: {lists}} = useContext(ListContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, [viewlist]);

  useEffect(()=>{
    console.log('se actualizo la lista');
  },[data])


  return (
    <>

      <Transition
        show={show}
        leave='transition-opacity duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
      
        <div className=' flex items-center  flex-col mt-5 lg:mt-10  w-full'>
          <div className='flex justify-between w-[300px]  mb-7 '>
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
            onReorder={upLista}
            values={data}
            layoutScroll
            className=' w-[340px]  lg:w-[290px] h-[calc(100vh-220px)]  overflow-y-scroll pb-5 flex flex-col gap-y-[2px]'
          >
            {lists[0].products.map(item => (
              <ItemList key={item._id} item={item} selectProduct={selectProduct} />
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

ListProduct.propTypes = {
  upLista: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  selectProduct: PropTypes.func.isRequired,
}
