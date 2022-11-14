import { Transition } from '@headlessui/react'
import { ListContext } from 'Context/List/ListContext'
import { LayoutGroup, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AnimationBook from '../../../../Atoms/Animation/Book'
import { IconGridView } from '../../../../Atoms/Icons'
import ItemList from './ItemList'

const ListProduct = () => {
  const { viewList } = useContext(ListContext)
  const [show, setShow] = useState(false)

  const location = useLocation()

  const { pathname } = location
  const currentPath = pathname.split('/')

  const { list } = useContext(ListContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 400)

    return () => clearTimeout(timeout)
  }, [viewList])

  return (
    <>
      <Transition
        show={show}
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className=" flex w-full  flex-col  items-center">
          <div className="mb-7 flex w-[300px]  justify-between ">
            <span className="text-white">
              <IconGridView />
            </span>
            <p className="font-bold ">{list?.name}</p>
            <span className="text-gray-500">
              <IconGridView />
            </span>
          </div>

          {/* LISTA */}

          <LayoutGroup>
            {/* w-[350] */}
            <motion.ul
              className=" flex h-[calc(100vh-220px)]   w-[350px]  flex-col gap-y-1 overflow-y-scroll px-4 pb-5"
              layout
              initial={{ borderRadius: 25 }}
            >
              {list?.products?.map((item) => (
                <ItemList
                  key={item._id}
                  item={item}
                  //  selectProduct={selectProduct}
                />
              ))}
              {list?.products?.length > 0 && (
                <Link
                  to="/payment"
                  className="flex  w-full   justify-center rounded-lg  bg-white py-3   px-5 font-semibold    text-color_green_7 shadow-md"
                >
                  Pedir envío
                </Link>
              )}

              {list?.products?.length === 0 && (
                <div>
                  {currentPath.find((item) => item === 'tienda') ? (
                    <p className="px-5 text-center text-gray-500 ">
                      Esta lista está sin productos, empieza a llenarlo de los
                      mejores productos.
                    </p>
                  ) : (
                    <p className="px-5 text-center text-gray-500 ">
                      Esta lista está vacía, nuestra tienda está repleta de productos que le faltan en su almacén.{' '}
                      <Link to="/tienda" className="text-purple-500">
                        Ir a la tienda
                      </Link>
                    </p>
                  )}
                </div>
              )}
            </motion.ul>
          </LayoutGroup>
        </div>
      </Transition>

      <Transition
        show={!show}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="h-screen w-[340px]"
      >
        <div className=" mt-20 flex items-center justify-center ">
          <AnimationBook />
        </div>
      </Transition>
    </>
  )
}

export default ListProduct

ListProduct.propTypes = {
  // upLista: PropTypes.func.isRequired,
  // data: PropTypes.array.isRequired,
  // selectProduct: PropTypes.func.isRequired,
}
