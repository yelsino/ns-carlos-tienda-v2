import Filtro from '../../Moleculas/Filtro';
import ItemProduct from './ItemProduct';
import ListProduct from './ViewProduct/ListProduct/ListProduct';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import imgEstrellado from '../../../Assets/estrellado.svg';
import './Tienda.css';
import { useContext, useEffect, useState } from 'react';
import PortalComponent from '../../Atoms/Portals/PortalComponent';
import ViewProduct from './ViewProduct/ViewProduct';
import { ProductContext } from '../../../Context/Product/ProductContext';
import ProductSqueleton from '../../Plantillas/ProductSqueleton';
import ItemProductMovil from './ItemProductMovil';

const Tienda = () => {
  const [viewlist] = useOutletContext();

  const {
    productstate: {
      products: { products }, product
    },
    dispatchProduct
  } = useContext(ProductContext);

  const navigate = useNavigate();

  // const [product, setItemSelected] = useState(null);

  const setItemSelected = (item) => {
    dispatchProduct({
      type: 'SELECT_PRODUCT',
      payload: item,
    });
  }

  const [show, setShow] = useState(false);

  const [data, setData] = useState([]);

  // si no hay item seleccionado regresa a/tienda
  useEffect(() => {
    if (product === null) {
      navigate('/tienda');
    }
    if(product){
      setShow(true);
    }
  }, [product]);

  useEffect(() => {
    setData(products);
  }, [products]);

  return (
    <div className='flex relative '>
      <div className='w-full'>
        <Filtro upData={setData} data={products} />

        <motion.div className='layout gap-6 pt-5 sm:h-[calc(100vh-180px)] h-[calc(100vh-100px)]  overflow-y-scroll pb-20 '>
          {data?.map((p, i) => (
            <motion.div
              animate={{
                opacity: product === p ? 0 : 1,
                scale: product === p ? 1.2 : 1,

                transition: {
                  duration: 0.5,
                },
              }}
              layoutId={p}
              key={p._id}
              onClick={() => {
                setItemSelected(p);
              }}
              className='w-[192px] h-[75px]  flex items-center  justify-center  cursor-pointer  '
            >
              <ItemProduct product={p} index={i} />
               {/* <ItemProductMovil product={p} index={i} /> */}
            </motion.div>
          ))}

          {products?.length === 0 &&
            [...Array(10)].map((_, i) => <ProductSqueleton key={i} />)}

          {data?.length === 0 && (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.4,
                },
              }}
              className=' col-span-full  flex justify-center flex-col items-center  row-span-full'
            >
              <img className='w-96 ' src={imgEstrellado} />
              <p className='font-bold text-center pt-10'>
                NO HAY COINCIDENCIAS
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {show && (
          <PortalComponent open={show} setOpen={setShow}
            closeChildren={setItemSelected}
          >
            <ViewProduct
              product={product}
              setModal={setShow}
              setItem={setItemSelected}
            />
          </PortalComponent>
        )}
      </AnimatePresence>

      {viewlist && (
        <>
          <div className='with-animation w-full h-full absolute bg-white md:flex md:w-auto md:relative flex flex-col pt-10  '>
            <ListProduct
            />
            
          </div>
        </>
      )}
    </div>
  );
};

export default Tienda;
