import ItemProduct from './ItemProduct'
import ListProduct from './ViewProduct/ListProduct/ListProduct'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './Tienda.css'
import { useContext, useEffect, useState } from 'react'
import ViewProduct from './ViewProduct/ViewProduct'
import { ProductContext } from 'Context/Product/ProductContext'
import { ListContext } from 'Context/List/ListContext'
import { IProducto } from 'interfaces/producto.interface';
import Filtro from 'Components/Moleculas/Filtro'
import ProductSqueleton from 'Components/Plantillas/ProductSqueleton'
import PortalComponent from './../../Atoms/Portals/PortalComponent';


interface Outlet {
  setAdding : React.Dispatch<React.SetStateAction<boolean>>
  adding : boolean
}

const Tienda = ( ) => {
  const { viewList, seeCurrentList} = useContext(ListContext)

  const {setAdding, adding} = useOutletContext<Outlet>();

  const {
    product,
    products,
    dispatch: dispatchProduct
  } = useContext(ProductContext)

  const navigate = useNavigate()

  const setItemSelected = (item: IProducto | null) => {
    dispatchProduct({
      type: 'SELECT_PRODUCT',
      payload: item as IProducto
    })
  }

  const [show, setShow] = useState(false)

  const [data, setData] = useState<Array<IProducto>>([])

  

  // si no hay item seleccionado regresa a/tienda
  useEffect(() => {
    if (product === null) {
      navigate('/tienda')
    }
    if (product) {
      setShow(true)
    }
  }, [product])

  useEffect(() => {
    setData(products)
  }, [products])

  return (
    <div className="relative flex ">
      <div className="w-full">
        <Filtro upData={setData} data={products} />

        <motion.div className="layout  h-[calc(100vh-100px)] gap-6 overflow-y-scroll pt-5  pb-24 sm:h-[calc(100vh-210px)] ">
          {data?.map((p, i) => (
            <motion.div
              animate={{
                opacity: product === p ? 0 : 1,
                scale: product === p ? 1.2 : 1,

                transition: {
                  duration: 0.5
                }
              }}
              layoutId={p.id}
              key={p.id}
              onClick={() => {
                setItemSelected(p)
              }}
              className="flex h-[75px]  w-[192px] cursor-pointer  items-center  justify-center  "
            >
              <ItemProduct product={p} index={i} />
              {/* <ItemProductMovil product={p} index={i} /> */}
            </motion.div>
          ))}

          {products?.length === 0 &&
            [...Array(10)].map((_, i) => <ProductSqueleton key={i} />)}

          {/* {data?.length === 0 && (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.4
                }
              }}
              className=" col-span-full  row-span-full flex flex-col items-center  justify-center"
            >
              <img className="w-96 " src={imgEstrellado} />
              <p className="pt-10 text-center font-bold">
                NO HAY COINCIDENCIAS
              </p>
            </motion.div>
          )} */}
        </motion.div>
      </div>

      <AnimatePresence>
        {show && (
          <PortalComponent
            open={show}
            setOpen={setShow}
            closeChildren={setItemSelected}
          >
            <ViewProduct
              product={product}
              setModal={setShow}
              setItem={setItemSelected}
              setAdding={setAdding}
              adding={adding}
            />
          </PortalComponent>
        )}
      </AnimatePresence>

      {viewList && (
        <>
          <div className="with-animation absolute flex h-full w-full flex-col bg-white pt-10 md:relative md:flex md:w-auto  ">
            <ListProduct />
          </div>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default Tienda
