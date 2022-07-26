import { motion } from 'framer-motion'

const ViewSqueleton = () => {
  return (
    <motion.div
      //   initial={{ scale: 0.5 }}
      //   animate={{ scale: 1 }}
      //   exit={{ scale: 0 }}
      //   transition={{ duration: 0.3 }}
      className={`relative h-screen   w-full
    overflow-y-scroll   bg-white p-10 sm:h-auto sm:max-h-[600px] sm:w-auto sm:overflow-y-hidden  sm:rounded-2xl `}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="absolute top-0 right-0 -translate-y-[1px] translate-x-[1px] bg-red-500  px-5 py-3 font-poppins font-semibold text-white focus:outline-none sm:rounded-tr-2xl">
        Cerrar
      </button>
      <motion.div className="mx-auto  flex max-w-xs flex-col gap-10 sm:max-w-none sm:flex-row">
        <motion.div className="flex max-w-xs flex-col items-center gap-7 sm:h-[600px] sm:overflow-y-scroll sm:px-5 sm:pb-20 ">
          <p className="pt-5 font-poppins text-xl font-semibold"></p>
          <div className="mb-3 flex h-[130px] w-[140px] items-center justify-center rounded-tl-[50px] rounded-tr-[10px] rounded-bl-[20px] rounded-br-[50px] bg-emerald-300 bg-opacity-50 ">
            {/* <img src={img} className=' scale-125 mb-3' /> */}
          </div>

          {/* <SwitchWeight  product={product} /> */}

          <div className="w-full  break-all ">{/* <p>{description}</p> */}</div>
        </motion.div>
        {/* <SimilarProducts  similarProducts={similarProducts}/> */}

        <div className="border-l px-10 sm:h-[600px]  sm:overflow-y-scroll sm:pb-32 ">
          <h2 className="pb-7 text-center font-poppins text-lg font-medium tracking-tight text-gray-500">
            Similares
          </h2>
          <motion.div className="flex flex-col items-center gap-y-10 ">
            {['1','2','3','4'].map((p, i) => (
              <motion.div
                layoutId={p}
                key={p}
                className=" flex h-[75px] w-[192px] cursor-pointer  items-center  justify-center  "
              >
                <div >
                  <motion.div
                    transition={{
                      duration: 0.5
                    }}
                    initial={{ scale: 0 }}
                    animate="visible"
                    className="relative flex"
                  >
                    <div className="h-[74px] w-[88px] rounded-lg bg-emerald-200"></div>
                    <div className="flex w-[110.76px] -translate-x-1 flex-col items-center justify-center rounded-lg bg-white p-2 text-gray-600 shadow-md">
                      <p className="font-poppins font-medium tracking-tighter">
                        {'name'}
                      </p>
                      <p>
                        und. s/
                        <span className="font-medium text-color_green_7">
                          1.5
                        </span>
                      </p>
                    </div>

                    <div className="absolute">
                      <div className="flex h-[74px] w-[88px] items-center rounded-lg"></div>
                      <div className="w-[110.76px] -translate-x-1 rounded-lg bg-white shadow-lg"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ViewSqueleton
