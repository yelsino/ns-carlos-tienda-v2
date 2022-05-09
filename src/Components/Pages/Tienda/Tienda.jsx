import Filtro from '../../Moleculas/Filtro';
import ItemProduct from './ItemProduct';
import ListProduct from './ListProduct';
import { useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import './Tienda.css';
import { useState } from 'react';
import PortalComponent from '../../Atoms/Portals/Portal';
import ViewProduct from './ViewProduct';

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
              }}
              key={item}
              layoutId={item}
              onClick={() => setSelectedId(item)}
              className=' w-[192px] h-[75px] flex  justify-center items-center cursor-pointer '
            >
              <ItemProduct key={item} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <PortalComponent close={selectedId} setClose={setSelectedId}>

            <ViewProduct />
            
          </PortalComponent>
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
