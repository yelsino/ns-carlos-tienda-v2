import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IProducto } from 'types-yola'

interface Props {
  product: IProducto
  index: number
}

const ItemProductMovil = ({ product, index }: Props) => {
  const { nombre, imagen } = product

  const itemstyle = {
    visible: (i: number) => ({
      scale: 1,
      transition: {
        delay: i * 0.03
      }
    }),
    scale: 0
  }

  return (
    <Link to={`/tienda`} className="block sm:hidden">
      {/* <Link to={`/tienda/${name.split(' ')[0]}`} className='block sm:hidden'> */}
      <motion.div
        transition={{
          duration: 0.5
        }}
        initial={{ scale: 0 }}
        animate="visible"
        custom={index}
        // @ts-ignore
        variants={itemstyle}
        className="relative flex flex-col items-center"
      >
        <div className="h-[74.43px] w-[88.61px] translate-y-2 rounded-lg bg-emerald-200" />
        <div className="z-10 flex w-[110.76px] flex-col items-center  justify-center rounded-lg bg-white p-2 text-gray-600 shadow-md">
          <p className="font-poppins font-medium tracking-tighter">{nombre}</p>
          <p>
            und. s/<span className="font-medium text-color_green_7">1.5</span>
          </p>
        </div>

        <div className="absolute">
          <div className="translate-y-1 rounded-lg">
            <img src={imagen} className="mx-auto" />
          </div>
          <div className=" w-[110.76px]  rounded-lg shadow-lg"></div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ItemProductMovil
