import { AnimatePresence, motion } from 'framer-motion'
import { IconRight } from '../../Atoms/Icons'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatToMoney } from '../../../helpers/formatToMoney'
import { ListContext } from 'Context/List/ListContext'
import { List } from 'interfaces/Interfaces'
import { ListAction } from 'Context/List/listReducer'

interface Props {
  list: List
  setList: React.Dispatch<ListAction>
  currlist: string
  deleteList: (id: string) => void
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
        value={list._id}
        id={list._id}
        className="flex w-[320px] cursor-pointer items-center justify-between gap-x-3 rounded-sm bg-white px-5 py-3 shadow-md"
      >
        <div className="flex items-center gap-x-3">
          <span className="cursor-pointer">
            {/* <IconHeart /> */}
            <IconRight />
          </span>
          <p className="truncate">{list.name}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setList({
              type: 'SELECT_LIST',
              payload: list
            })
          }}
        >
          <input
            readOnly
            value={list._id}
            type="checkbox"
            checked={list._id === currlist}
            className="h-5 w-5 cursor-pointer accent-violet-500"
          />
        </button>
      </motion.li>
      <AnimatePresence>
        {isOpen && (
          <Content listID={list._id as string} deleteList={deleteList} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default EachList

EachList.propTypes = {
  list: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
  currlist: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired
}

// eslint-disable-next-line react/prop-types
interface ContentProps {
  deleteList: (id: string) => void
  listID: string
}
const Content = ({ deleteList, listID }: ContentProps) => {
  const [subTotal, setSubTotal] = useState('0')
  const { lists, list } = useContext(ListContext)

  const mountTotalOfList = () => {
    return list!.products.reduce((acc, curr) => {
      const mountPerProduct = curr.quantities.reduce((accq, q) => {
        return accq + q.quantity * q.price
      }, 0)

      return acc + mountPerProduct
    }, 0)
  }

  useEffect(() => {
    if (list) {
      setSubTotal(Number(formatToMoney(mountTotalOfList())).toFixed(1))
    }
  }, [list])

  return (
    <motion.div
      className="flex  w-[320px] flex-col gap-y-3 bg-white p-4 px-5 shadow-md"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <p className="font-light text-color_green_7 ">Resumen</p>
        <p>{list!.products.length} productos</p>
        <p>{subTotal} nuevos soles</p>
      </div>
      <p className="font-light text-color_green_7 ">Acciones</p>

      <Link
        to="/tienda"
        className="rounded-sm border bg-white px-4 py-2 text-center font-semibold text-color_green_7"
      >
        Agregar productos
      </Link>

      {lists.length > 1 && (
        <button
          onClick={() => {
            deleteList(listID)
          }}
          className="rounded-sm border bg-white px-4 py-2 font-semibold text-rose-500"
        >
          Eliminar lista
        </button>
      )}
    </motion.div>
  )
}
