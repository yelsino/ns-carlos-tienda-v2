import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { SocketContext } from '../../../Context/Socket/SocketContext'
import ListProduct from '../Tienda/ViewProduct/ListProduct/ListProduct'
import PortalComponent from '../../Atoms/Portals/PortalComponent'
import EachList from './EachList'
import Input from '../../Atoms/Input'
import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'

export const MyLists = () => {
  const { socket } = useContext(SocketContext)
  const { uid } = useContext(AuthContext)
  const { lists, list, dispatch: setList } = useContext(ListContext)

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)

  const createNewList = (NAMELIST: string) => {
    socket?.emit('update-list', {
      type: 'CREATE_LIST',
      userID: uid,
      nameList: NAMELIST
    })

    setModal(false)
  }

  const deleteList = (listID: string) => {
    socket?.emit('update-list', {
      type: 'DELETE_LIST',
      userID: uid,
      listID
    })

    setList({
      type: 'SELECT_LIST',
      payload: lists[0]
    })
    console.log(listID)
  }

  return (
    <>
      {list && (
        <div className="mx-auto max-w-5xl pt-10">
          <div className="flex  ">
            <div className=" mx-auto flex flex-col  gap-y-1">
              <h2 className=" flex justify-between pb-5">
                <span className="font-poppins text-xl font-bold ">
                  MIS LISTAS
                </span>

                <button
                  onClick={() => setModal2(true)}
                  className="text-lg font-bold text-color_green_7 sm:hidden"
                >
                  Ver lista
                </button>
              </h2>
              <LayoutGroup>
                <motion.ul className="flex flex-col gap-y-1">
                  {lists.map((item) => (
                    <EachList
                      list={item}
                      key={item._id}
                      setList={setList}
                      currlist={list._id as string}
                      deleteList={deleteList}
                    />
                  ))}
                </motion.ul>
              </LayoutGroup>
              <button
                onClick={() => setModal(true)}
                className="flex w-[320px] max-w-xs cursor-pointer items-center justify-center gap-x-3 rounded-sm rounded-t-none bg-white px-5 py-3 text-color_green_7 shadow-md"
              >
                Añadir lista
              </button>
            </div>
            <div className=" hidden w-full sm:block">
              <ListProduct />
            </div>
          </div>

          <AnimatePresence>
            {modal2 && (
              <PortalComponent open={modal2} setOpen={setModal2}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className=" relative  h-full w-full bg-white pt-14"
                >
                  <ListProduct />
                  <button
                    onClick={() => setModal2(false)}
                    className="absolute top-0 right-0 rounded-sm bg-red-500 px-3 py-2 text-sm font-bold text-white"
                  >
                    Cerrar
                  </button>
                </div>
              </PortalComponent>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {modal && (
              <PortalComponent open={modal} setOpen={setModal}>
                <InputNewList
                  setModal={setModal}
                  handleSubmit={createNewList}
                />
              </PortalComponent>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}

// eslint-disable-next-line react/prop-types
interface InputProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (name: string) => void
}
const InputNewList = ({ setModal, handleSubmit }: InputProps) => {
  const [name, setName] = useState('')
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full w-full flex-col justify-center  bg-white p-10 sm:h-auto sm:w-[400px] sm:rounded-lg "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto flex max-w-sm flex-col gap-y-5">
        <div>
          <h3 className="text-xl font-bold">Nombra a tu lista</h3>
          <p className="text-gray-500">
            Estas creando una nueva lista, añada un nombre y empieza de
            llenarlos de productos
          </p>
        </div>
        <div className="py-5">
          <img
            className="mx-auto"
            src="https://img.icons8.com/cute-clipart/128/undefined/shopping-cart.png"
          />
        </div>

        <Input
          title="Digite aqui"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {/* <input
        type='text'
        className='w-full px-3 py-2 bg-white rounded-sm border text-sm text-gray-700  outline-none'
        onChange={e => setName(e.target.value)}
      /> */}

        <button
          onClick={() => handleSubmit(name)}
          className="rounded-sm bg-green-500 px-3 py-4 font-poppins text-sm font-bold tracking-widest text-white"
        >
          Crear
        </button>
      </div>

      <button
        onClick={() => setModal(false)}
        className="absolute top-0 right-0 rounded-sm bg-red-500 px-3 py-2 text-sm font-bold text-white"
      >
        Cancelar
      </button>
    </motion.div>
  )
}
