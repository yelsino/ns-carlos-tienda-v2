import Filtro from '../../Moleculas/Filtro';
import ItemProduct from './ItemProduct';
import ListProduct from './ListProduct';
import { useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import './Tienda.css';
import { useContext, useState } from 'react';
import PortalComponent from '../../Atoms/Portals/PortalComponent';
import ViewProduct from './ViewProduct';
import { ProductContext } from '../../../Context/Product/ProductContext';

const Tienda = () => {
  const [viewlist] = useOutletContext();
  const {
    productstate: { products: {products} },
  } = useContext(ProductContext);
  const [selectedId, setSelectedId] = useState(null);

  const styleitem = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    
 
      <div className='flex relative '>
      <div className='w-full'>
        <Filtro />
        {/* <button
          onClick={() => {
            console.log(products);
          }}
        >IMPRIMIR</button> */}
        <motion.div className='layout mt-5'>
          {products?.map((p, i) => (
            <motion.div
              animate={{
                opacity: selectedId === p ? 0 : 1,
                scale: selectedId === p ? 1.2 : 1,

                transition: {
                  duration: 0.5,
                },
              }}
              layoutId={p}
              initial='hidden'
              custom={i}
              variants={styleitem}
              key={p._id}
              onClick={() => setSelectedId(p)}
              className=' w-[192px] h-[75px] flex  justify-center items-center cursor-pointer '
            >
              <ItemProduct product={p} />
            </motion.div>
          ))}
        </motion.div>
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
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];
