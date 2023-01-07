import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListContext } from 'Context/List/ListContext'
import { ListAction } from 'Context/List/listReducer'
import { IconDelete, IconRight } from 'Components/Atoms/Icons'
import { formatToMoney } from 'helpers/formatToMoney';
import { ILista } from 'types-yola'

interface Props {
  list: ILista
  setList: React.Dispatch<ListAction>
  currlist: string
  deleteList: (id: string) => void
  // setModalDelete: React.Dispatch<boolean>
}
const EachList = ({ list, setList, currlist, deleteList }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        onClick={toggleOpen}
        value={list.id}
        id={list.id}
        className="flex w-[320px] cursor-pointer items-center justify-between gap-x-3 rounded-sm bg-white px-5 py-3 shadow-md"
      >
        <div className="flex items-center gap-x-3">
          <span className="cursor-pointer">
            {/* <IconHeart /> */}
            <IconRight />
          </span>
          <p className="truncate">{list.nombre}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setList({
              type: 'SELECT_LIST',
              payload: list.id
            })
          }}
        >
          <input
            readOnly
            value={list.id}
            type="radio"
            checked={list.id === currlist}
            className="h-4 w-4 cursor-pointer accent-violet-500"
          />
        </button>
      </motion.li>
      <AnimatePresence>
        {isOpen && (
          <Content list={list} 
            deleteList={deleteList}
            setList={setList} 
            // setModalDelete={setModalDelete} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default EachList



// eslint-disable-next-line react/prop-types
interface ContentProps {
  deleteList: (id: string) => void
  list: ILista,
  setList: React.Dispatch<ListAction>
  // setModalDelete: React.Dispatch<boolean>
}
const Content = ({ deleteList, list,setList  }: ContentProps) => {
  const [subTotal, setSubTotal] = useState('0')
  const { lists } = useContext(ListContext)
  const navigate = useNavigate()

  const mountTotalOfList = () => {
    return list!.productos.reduce((acc, curr) => {
      const mountPerProduct = curr.cantidades.reduce((accq, q) => {
        return accq + q.cantidad * q.precio
      }, 0)

      return acc + mountPerProduct
    }, 0)
  }

  useEffect(() => {
    if (list) {
      setSubTotal(Number(formatToMoney(mountTotalOfList())).toFixed(2))
    }
  }, [list])

  return (
    <motion.div
      className="flex  w-[320px] flex-col gap-y-3 bg-white p-4 px-5 shadow-md relative "
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <p className="font-light text-color_green_7 ">Resumen</p>
        <p>Productos: {list!.productos.length}</p>
        <p>Total: {subTotal} S/</p>
      </div>
      <p className="font-light text-color_green_7 ">Acciones</p>

      <Link
        to="/tienda"
        onClick={()=>setList({ type: 'SELECT_LIST', payload: list.id})}
        className="rounded-sm border bg-white px-4 py-2 text-center font-normal text-color_green_7 w-10/12 mx-auto "
      >
        Agregar productos
      </Link>
      <button
        onClick={()=> {
          setList({ type: 'SELECT_LIST', payload: list.id})
          navigate('/payment')
        }}
        className="rounded-sm border bg-white px-4 py-2 text-center font-normal text-color_green_7 w-10/12 mx-auto mb-5"
      >
        Pedir envío
      </button>

      {lists.length > 1 && (
        <button
          onClick={() => deleteList(list.id)}
          className=" hover:text-white ease-in duration-300 rounded-tl-3xl absolute bottom-0 right-0 text-rose-200 bg-rose-600 p-2"
        >
          <IconDelete stile='w-6 h-6' />
        </button>
      )}
    </motion.div>
  )
}
