import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../../Context/Product/ProductContext';

import ItemProduct from '../ItemProduct';

const SimilarProducts = ({ similarProducts }) => {
  const {
    dispatchProduct,
    productstate: {
      products: { products },
    },
  } = useContext(ProductContext);

  const navigate = useNavigate();

  return (
    <div className='sm:h-[600px] sm:pb-32 sm:overflow-y-scroll  px-10 border-l '>
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

              console.log(findProduct);

              if (findProduct) {
                dispatchProduct({
                  type: 'SELECT_PRODUCT',
                  payload: findProduct,
                });
              }
            }}
            className=' w-[192px] h-[75px] flex items-center  justify-center  cursor-pointer  '
          >
            <ItemProduct product={p} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SimilarProducts;

SimilarProducts.propTypes = {
  similarProducts: PropTypes.array.isRequired,
};
