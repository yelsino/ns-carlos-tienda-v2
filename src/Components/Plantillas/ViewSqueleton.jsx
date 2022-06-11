import { motion } from 'framer-motion';

const ViewSqueleton = () => {
  return (
    <motion.div
    //   initial={{ scale: 0.5 }}
    //   animate={{ scale: 1 }}
    //   exit={{ scale: 0 }}
    //   transition={{ duration: 0.3 }}
      className={`bg-white p-10   relative
    w-full   sm:rounded-2xl sm:w-auto sm:h-auto overflow-y-scroll sm:overflow-y-hidden h-screen  sm:max-h-[600px] `}
      onClick={e => e.stopPropagation()}
    >
      <button className='absolute top-0 right-0 bg-red-500 px-5 py-3  text-white font-semibold font-poppins sm:rounded-tr-2xl focus:outline-none -translate-y-[1px] translate-x-[1px]'>
        Cerrar
      </button>
      <motion.div className='gap-10  flex flex-col sm:flex-row max-w-xs mx-auto sm:max-w-none'>
        <motion.div className='flex flex-col items-center gap-7 max-w-xs sm:px-5 sm:h-[600px] sm:overflow-y-scroll sm:pb-20 '>
          <p className='font-semibold font-poppins text-xl pt-5'></p>
          <div className='w-[140px] h-[130px] rounded-tl-[50px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[50px] bg-emerald-300 bg-opacity-50 mb-3 flex justify-center items-center '>
            {/* <img src={img} className=' scale-125 mb-3' /> */}
          </div>

          {/* <SwitchWeight  product={product} /> */}

          <div className='w-full  break-all '>{/* <p>{description}</p> */}</div>
        </motion.div>
        {/* <SimilarProducts  similarProducts={similarProducts}/> */}

        <div className='sm:h-[600px] sm:pb-32 sm:overflow-y-scroll  px-10 border-l '>
          <h2 className='font-medium tracking-tight font-poppins text-lg text-gray-500 pb-7 text-center'>
            Similares
          </h2>
          <motion.div className='flex flex-col gap-y-10 items-center '>
            {[1, 2, 3, 4].map((p, i) => (
              <motion.div
                layoutId={p}
                key={p._id}
                className=' w-[192px] h-[75px] flex items-center  justify-center  cursor-pointer  '
              >
                <div to={`/tienda`}>
                {/* <div to={`/tienda/${name.split(' ')[0]}`}> */}
                  <motion.div
                    transition={{
                      duration: 0.5,
                    }}
                    initial={{ scale: 0 }}
                    animate='visible'
                    className='flex relative'
                  >
                    <div className='bg-emerald-200 rounded-lg w-[88px] h-[74px]'></div>
                    <div className='bg-white rounded-lg -translate-x-1 shadow-md w-[110.76px] p-2 flex justify-center items-center flex-col text-gray-600'>
                      <p className='font-medium font-poppins tracking-tighter'>
                        {name}
                      </p>
                      <p>
                        und. s/
                        <span className='text-color_green_7 font-medium'>
                          1.5
                        </span>
                      </p>
                    </div>

                    <div className='absolute'>
                      <div className='flex items-center rounded-lg w-[88px] h-[74px]'></div>
                      <div className='bg-white rounded-lg -translate-x-1 shadow-lg w-[110.76px]'></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewSqueleton;
