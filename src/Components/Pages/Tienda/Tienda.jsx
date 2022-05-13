import Filtro from '../../Moleculas/Filtro';
import ItemProduct from './ItemProduct';
import ListProduct from './ViewProduct/ListProduct/ListProduct';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import './Tienda.css';
import { useContext, useEffect, useState } from 'react';
import PortalComponent from '../../Atoms/Portals/PortalComponent';
import ViewProduct from './ViewProduct/ViewProduct';
import { ProductContext } from '../../../Context/Product/ProductContext';

const Tienda = () => {
  const [viewlist] = useOutletContext();
  const {
    productstate: {
      products: { products },
    },
  } = useContext(ProductContext);

  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  const [list, setLista] = useState([]);

  // si no hay item seleccionado regresa a/tienda
  useEffect(() => {
    if (selectedId === null) {
      navigate('/tienda');
    }
  }, [selectedId]);

  useEffect(() => {
    setData(products);
  }, [products]);

  return (
    <div className='flex relative '>
      <div className='w-full'>
        <Filtro upData={setData} data={products} />

        <motion.div className='layout pt-5 sm:h-[calc(100vh-180px)] h-[calc(100vh-100px)] pb-10 overflow-y-scroll '>
          {data?.map((p, i) => (
            <motion.div
              animate={{
                opacity: selectedId === p ? 0 : 1,
                scale: selectedId === p ? 1.2 : 1,

                transition: {
                  duration: 0.5,
                },
              }}
              layoutId={p}
              // custom={i}
              key={p._id}
              onClick={() => setSelectedId(p)}
              className=' w-[192px] h-[75px] flex  justify-center items-center cursor-pointer  '
            >
              <ItemProduct product={p} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        <PortalComponent close={selectedId} setClose={setSelectedId}>
          {selectedId && (
            <ViewProduct 
            product={selectedId} 
            setClose={setSelectedId} 
            upLista={setLista} 
            />
          )}
        </PortalComponent>
      </AnimatePresence>

      {viewlist && (
        <>
          <div className='with-animation w-full h-full absolute bg-white lg:flex lg:w-auto lg:relative flex flex-col  '>
            <ListProduct upLista={setLista} data={list} />
          </div>
        </>
      )}
    </div>
  );
};

export default Tienda;
