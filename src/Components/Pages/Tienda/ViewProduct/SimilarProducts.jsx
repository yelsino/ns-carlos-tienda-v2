import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ProductContext } from '../../../../Context/Product/ProductContext';

import ItemProduct from '../ItemProduct';

const SimilarProducts = ({ similarProducts }) => {
  const {
    dispatchProduct,
    productstate: {
      products: { products },
    },
  } = useContext(ProductContext);


  return (
    <div className='sm:h-[600px] sm:pb-32 sm:overflow-y-scroll  px-10 sm:border-l '>
      <h2 className='font-medium tracking-tight font-poppins text-lg text-gray-500 pb-7 text-center'>
        Similares
      </h2>
      <motion.div className='flex flex-col gap-y-10 items-center '>
        {similarProducts.map((p, i) => (
          <motion.div
            layoutId={p}
            key={p._id}
            onClick={() => {
              const findProduct = products.find(v => v.name === p.name);

              if (findProduct) {
                dispatchProduct({
                  type: 'SELECT_PRODUCT',
                  payload: findProduct,
                });
                console.log('encontrado');
              } else{
                console.log('no existe');
              }
            }}
            className=' w-[192px] h-[75px] flex items-center  justify-center  cursor-pointer  '
          >
            <ItemProduct product={p} index={i} />
          </motion.div>
        ))}
        {similarProducts.length === 0 && <p className='text-center text-gray-600'>No se encontraron  coincidencias</p>}
      </motion.div>
    </div>
  );
};

export default SimilarProducts;

SimilarProducts.propTypes = {
  similarProducts: PropTypes.array.isRequired,
};
