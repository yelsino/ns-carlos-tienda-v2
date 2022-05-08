import Filtro from '../../Moleculas/Filtro';
import ItemProduct from './ItemProduct';
import ListProduct from './ListProduct';
import { useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import './Tienda.css';
import { useState } from 'react';

const Tienda = () => {
  const [viewlist] = useOutletContext();

  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className='flex relative '>
      <div className='w-full'>
        <Filtro />

        <div className='layout mt-5'>
          {items.map(item => (
            <motion.div
              animate={{ 
                opacity: selectedId === item ? 0 : 1,
                scale: selectedId === item ? 1.3 : 1,
                transition: {
                  duration: 0.5,
                },
                // transformOrigin: '50% 50%',
                transform: selectedId === item ? 'scale(1.5)' : 'scale(1)',
                
              }}
              key={item}
              layoutId={item}
              onClick={() => setSelectedId(item)}
              className=' w-[192px] h-[75px] flex justify-center items-center cursor-pointer'
            >
              <ItemProduct key={item} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, transition: { duration: 0.30 } }}
          transition={{ duration: 0.2, delay: 0.15 }}
          style={{ pointerEvents: "auto" }}
          className=' absolute left-0 top-0 bg-black bg-opacity-90 w-full h-full flex justify-center items-center'
          onClick={()=> setSelectedId(null)}
          >

            <button
              onClick={() => setSelectedId(null)}
              className='text-white  '
            >
              Cerrar
            </button>
            <ItemProduct key='modal' isVisible={selectedId} />
          </motion.div>
        )}
      </AnimatePresence>

      {viewlist && (
        <>
          <div className='with-animation hidden lg:flex lg:flex-col'>
            <ListProduct />
          </div>

          <div className='lg:hidden absolute bg-white w-full h-full left-0 '>
            <div className='  px-10'>
              <ListProduct />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tienda;

const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
