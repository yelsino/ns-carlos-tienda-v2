import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { SocketContext } from '../../../Context/Socket/SocketContext'
import ListProduct from '../Tienda/ViewProduct/ListProduct/ListProduct'
import PortalComponent from '../../Atoms/Portals/PortalComponent'
import EachList from './EachList'
import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'
import InputNewList from './InputNewList'

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

export default MyLists

// eslint-disable-next-line react/prop-types
