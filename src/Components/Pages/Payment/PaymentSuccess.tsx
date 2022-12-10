import { Link } from 'react-router-dom'
import imgDelivery from 'public/Assets/delivery.png'
import { ResCreateOrder } from './YourPayment'

interface Props {
  orderResult: ResCreateOrder
}

const PaymentSuccess = ({ orderResult }: Props) => {
  return (
    <div className="fixed top-0  left-0 z-50 flex h-full w-full items-center bg-white font-poppins ">
      <div className=" mx-auto flex  max-w-xs flex-col items-center gap-y-5  ">
        <img src={imgDelivery} className="w-10/12" />
        <p className="text-center text-3xl font-black  ">PAGO EXITOSO</p>

        <div className="bg-color_green_2 px-10 py-4 text-2xl font-medium text-color_green_7">
          <span># {orderResult.codeOrder} </span>
        </div>

        <p className="text-center text-xl font-light text-gray-700">
          Su pago ha sido registrado exitosamente, en breve recibirá un correo
          con los detalles de su pedido.
        </p>

        <Link
          to="/tienda"
          className="flex w-[130px] justify-center rounded-full bg-black  py-4 font-poppins font-bold text-white "
        >
          Ok
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
