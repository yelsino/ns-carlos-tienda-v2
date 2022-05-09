import { motion } from 'framer-motion';
import { IconDelete } from '../../Atoms/Icons';
import ItemReceta from './ItemReceta';

const ViewProduct = () => {

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
    hidden: { opacity: 0 },
  };


  return (
    <motion.div
      className='bg-white rounded-lg p-10  gap-x-10 shadow-2xl flex flex-col sm:flex-row '
      onClick={e => e.stopPropagation()}
    >
      <motion.div
        transition={{
          duration: 1,
        }}
        initial='hidden'
        animate='visible'
        variants={list}
        className='flex flex-col items-center gap-7 w-[270px]'
      >
        <p className='font-semibold font-poppins text-xl '>Mandarina Wando</p>
        <div className='w-[120px] h-[108px] rounded-tl-[50px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[50px] bg-orange-500 bg-opacity-50 flex justify-center items-center '>
          <img
            src='https://res.cloudinary.com/dwkfj5sxb/image/upload/v1651535002/productos/recorte%20300/mandarina-min-min_h3ocwt.png'
            className=' scale-125'
          />
        </div>

        <div className='font-bold font-poppins flex gap-5'>
          <div className='px-3 py-3 border border-black text-center'>
            1/4 Kg
          </div>
          <div className='px-3 py-3 border border-black text-center dia'>
            1/2 Kg
          </div>
          <div className='px-3 py-3 border border-black text-center bg-black text-white'>
            {' '}
            1 Kg
          </div>
        </div>

        <div className='w-full flex flex-col gap-y-2'>
          <p className='flex justify-between w-full'>
            <span>Precio</span>
            <span>5.90 /kg</span>
          </p>

          <p className='flex justify-between w-full'>
            <span>Precio</span>
            <span>5.90 /kg</span>
          </p>
        </div>
        <div className='flex items-center justify-between w-full'>
          <button className='bg-orange-600 text-white w-48 py-3 font-semibold font-poppins'>
            Añadir
          </button>
          <button className='text-2xl w-14 h-full flex items-center justify-center'>
            <IconDelete />
          </button>
        </div>

        <div className='w-full  break-all '>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
            eos.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
            eos.
          </p>
        </div>
      </motion.div>
      <div>
        <p className='font-poppins mb-5'>Recetas de mandarina</p>
        <motion.div
          transition={{
            duration: 1,
          }}
          initial='hidden'
          animate='visible'
          variants={list}
          className='grid grid-cols-2 gap-5'
        >
          {[1, 2, 3, 4, 5, 6].map((i, index) => (
            <ItemReceta

              key={index}
              item={i}
              animation={item}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewProduct;
