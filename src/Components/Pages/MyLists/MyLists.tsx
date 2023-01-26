import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useContext, useState } from 'react'
import EachList from './EachList'
import { AuthContext } from 'Context/auth/AuthContext'
import { ListContext } from 'Context/List/ListContext'
import InputNewList from './InputNewList'
import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext'
import { IconNoView, IconStore, IconView } from 'Components/Atoms/Icons'
import { Link } from 'react-router-dom'
import { SocketContext } from 'Context/Socket/SocketContext';
import ListProduct from '../Tienda/ViewProduct/ListProduct/ListProduct'
import PortalComponent from 'Components/Atoms/Portals/PortalComponent'

export const MyLists = () => {
  const { socket } = useContext(SocketContext)
  const { uid } = useContext(AuthContext)
  const { lists, list, dispatch: setList, eliminarLista } = useContext(ListContext)

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)

  const {setNotificacion} = useContext(NotificacionContext)

  const createNewList = (NAMELIST: string) => {
    if(!NAMELIST){
      return setNotificacion({message:"Ops! el nombre está vacio", type:1})
    }
    
    socket?.emit('update-list', {
      type: 'CREATE_LIST',
      userID: uid,
      nameList: NAMELIST
    })

    setModal(false)
  }

  const deleteList = async (listID: string) => {
    await eliminarLista(listID)
    
    setList({
      type: 'SELECT_LIST',
      payload: lists[0]
    })
  }

  return (
    <>
      {list && (
        <div className="mx-auto max-w-5xl pt-10">
          <div className="flex  ">
            <div className=" mx-auto flex flex-col  gap-y-1">
              <h2 className=" flex justify-between pb-5 items-center">
                <span className="font-poppins text-xl font-bold ">
                  MIS LISTAS
                </span>

                <button
                  onClick={() => setModal2(true)}
                  className="font-semibold text-color_green_7 bg-color_green_2 p-2 rounded-full px-4 sm:hidden flex gap-x-1"
                >
                  Ver lista
                  <IconView />
                </button>
              </h2>
              <LayoutGroup>
                <motion.ul className="flex flex-col gap-y-1 ">
                  {lists.map((item) => (
                    <EachList
                      list={item}
                      key={item._id}
                      setList={setList}
                      currlist={list._id}
                      deleteList={deleteList}
                      // setModalDelete={setModal3}
                    />
                  ))}
                </motion.ul>
              </LayoutGroup>
              <button
                onClick={() => setModal(true)}
                className="flex w-[320px] max-w-xs cursor-pointer items-center justify-center gap-x-3 rounded-sm rounded-t-none bg-white px-5 font-bold py-3 text-color_green_7 shadow-md"
              >
                Crear lista
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
                    className="flex items-center gap-x-2 absolute top-0 right-0 rounded-sm bg-color_green_2 px-3 p-3 text-sm font-bold text-color_green_7 rounded-bl-3xl pr-2 sm:hidden "
                  >
                     <IconNoView />
                  </button>

                  {/* <Link
                to="/tienda"
                className="  fixed bottom-0 left-0 bg-rose-500 p-2 text-rose-50  rounded-tr-3xl "
              >
                <IconStore stile="h-10 w-10 pr-2" />
              </Link> */}
                </div>
              </PortalComponent>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {modal && (
              <PortalComponent open={modal} setOpen={setModal}>
                {modal && (
                  <InputNewList
                    setModal={setModal}
                    handleSubmit={createNewList}
                  />
                )}
                {modal3 && (
                  <InputNewList
                    setModal={setModal}
                    handleSubmit={createNewList}
                  />
                )}
              </PortalComponent>
            )}
          </AnimatePresence>
          <Link
            to="/tienda"
            className="fixed top-0 right-0 bg-rose-500 p-2 text-rose-50  rounded-bl-3xl sm:hidden"
          >
            <IconStore stile="h-10 w-10 pl-2" />
          </Link>
          <Link
                to="/tienda"
                className="  fixed bottom-0 left-0 bg-rose-500 p-2 text-rose-50  rounded-tr-3xl "
              >
                <IconStore stile="h-10 w-10 pr-2" />
              </Link>
        </div>
      )}
    </>
  )
}

export default MyLists

// eslint-disable-next-line react/prop-types
