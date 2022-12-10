import { AuthContext } from 'Context/auth/AuthContext'
import { DirectionContext } from 'Context/Direction/DirectionContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { IRouterContext } from 'interfaces/routerContext.interface'
import { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { LocalStorageService } from 'schemas/LocalStorageService'
import CreateDirectionForm from './YourFacturation/CreateDirectionForm'
import TypePayment from './YourFacturation/TypePayment'
import UserDates from './YourFacturation/UserDates'
import ViewDirection from './YourFacturation/ViewDirection'

const YourFacturation = () => {
  const [create, setCreate] = useState(false)

  const { user } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const [typePayment, setTypePayment] = useState('contra-entrega')
  const { direction } = useContext(DirectionContext)
  const { setOrderData } = useOutletContext<IRouterContext>()

  const lsService = new LocalStorageService()


  useEffect(() => {
    setOrderData((prev) => {
      lsService.setItem('tipoPago', typePayment)
      return { ...prev, typePayment }
    })
  }, [typePayment])

  useEffect(() => {
    if (direction) {
      setOrderData((prev) => {
        return { ...prev, directionID: direction._id }
      })
    }
  }, [direction])

  const showCreateDirection = () => setCreate(!create)


  return (
    <>
      <h2 className="font-poppins text-3xl font-extrabold pt-10">Su Facturación</h2>
      

      <UserDates data={user} />

      {create ? (
        <CreateDirectionForm
          socket={socket}
          setShow={showCreateDirection}
          auth={user}
        />
      ) : (
        <ViewDirection setShow={showCreateDirection} />
      )}

      <TypePayment typePayment={typePayment} setTypePayment={setTypePayment} />
    </>
  )
}

export default YourFacturation
