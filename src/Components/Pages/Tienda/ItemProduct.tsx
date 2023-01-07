import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IProducto } from 'types-yola'

interface Props {
  product: IProducto
  index: number
}

const ItemProduct = ({ product, index }: Props) => {
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
    <Link to={`/tienda`} className="">
      {/* <Link to={`/tienda/${name.split(' ')[0]}`} className=''> */}
      <motion.div
        transition={{
          duration: 0.5
        }}
        initial={{ scale: 0 }}
        animate="visible"
        custom={index}
        // ignore ts
        // @ts-ignore
        variants={itemstyle}
        className="relative flex"
      >
        <div className="h-[74px] w-[88px] rounded-lg bg-emerald-200 " />
        <div className="flex w-[110.76px] -translate-x-1 flex-col items-center justify-center rounded-lg bg-white p-2 text-gray-600 shadow-md">
          <p className="font-poppins font-medium tracking-tighter">{nombre}</p>
          <p>
            und. s/<span className="font-medium text-color_green_7">1.5</span>
          </p>
        </div>

        <div className="absolute">
          <div className="flex h-[74px] w-[88px] items-center rounded-lg">
            <img src={imagen} />
          </div>
          <div className="w-[110.76px] -translate-x-1 rounded-lg bg-white shadow-lg"></div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ItemProduct


