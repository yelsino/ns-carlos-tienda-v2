import { AuthContext } from 'Context/auth/AuthContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { RouterContext, User } from 'interfaces/Interfaces'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import CreateDirectionForm from './YourFacturation/CreateDirectionForm'
import TypePayment from './YourFacturation/TypePayment'
import UserDates from './YourFacturation/UserDates'
import ViewDirection from './YourFacturation/ViewDirection'

const YourFacturation = () => {
  const [create, setCreate] = useState(false)

  const {  data, setOrderData, orderData } =
    useOutletContext<RouterContext>()
    const {user} = useContext(AuthContext)
  const {socket} = useContext(SocketContext)
  const [typePayment, setTypePayment] = useState('contra-entrega')

  const navigete = useNavigate()

  useEffect(() => {
    setOrderData((prev) => {
      return { ...prev, typePayment }
    })
  }, [typePayment])

  useEffect(() => {
    if (data.direction) {
      setOrderData((prev) => {
        return { ...prev, directionID: data?.direction?._id as string }
      })
    }
  }, [data])

  const showCreateDirection = () => {
    setCreate(!create)
  }

  useEffect(() => {
    if (!orderData.listID) {
      navigete('/payment/your-list')
    }
  }, [])

  return (
    <>
      <h2 className="font-poppins text-3xl font-extrabold">Su Facturación</h2>
      {/* <img
        className='rounded-full object-cover w-32 h-32'
        src='https://res.cloudinary.com/dwkfj5sxb/image/upload/v1650590795/yelsin_rp8zyt.jpg'
      /> */}

      <UserDates data={user} />

      {create ? (
        <CreateDirectionForm
          socket={socket}
          setShow={showCreateDirection}
          auth={user}
        />
      ) : (
        <ViewDirection
          data={data}
          setShow={showCreateDirection}
        />
      )}

      <TypePayment typePayment={typePayment} setTypePayment={setTypePayment} />
    </>
  )
}

export default YourFacturation
