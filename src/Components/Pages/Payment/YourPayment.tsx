import { IconCheck } from '../../Atoms/Icons'
import imgDelivery1 from '../../../Assets/delivery1.png'
import PropTypes from 'prop-types'

import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import PaymentSuccess from './PaymentSuccess'

const YourPayment = () => {
  // tarjeta
  const [metodPay, setMetodPay] = useState('contra-entrega')

  const { orderData, liststate, data, auth, socket } = useOutletContext()
  const [orderResult, setOrderResult] = useState(null)
  const mountTotal = JSON.parse(localStorage.getItem('mountTotal'))

  const navigate = useNavigate()

  useEffect(() => {
    if (!orderData.listID || !orderData.typePayment || !orderData.directionID) {
      navigate('/payment/your-list')
    }
  }, [])

  useEffect(() => {
    socket?.on('order-created', (result) => {
      console.log(result)
      if (result.ok) {
        setOrderResult(result)
      } else {
        alert('ocurrio un error al crear la orden')
      }
    })
  }, [socket])

  return (
    <>
      {metodPay === 'contra-entrega' ? (
        <PayOnDelivery changePayMetod={setMetodPay} />
      ) : (
        <PayWithCard changePayMetod={setMetodPay} />
      )}

      <div className="flex w-full flex-col gap-y-3">
        <p className="text-lg font-bold">Resumen de pedido</p>
        <span className="text-3xl font-black">S/ {mountTotal}</span>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          {liststate?.list?.name}
        </p>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          {liststate?.list?.products?.length} productos en total
        </p>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          {data?.direction?.name}
        </p>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          {auth?.user.mobile}
        </p>
      </div>

      {orderResult?.ok && <PaymentSuccess orderResult={orderResult} />}
    </>
  )
}

export default YourPayment

export const PayWithCard = ({ changePayMetod }) => {
  return (
    <>
      <div className="w-full">
        <div className=" flex items-center justify-between">
          <p className="font-poppins text-lg font-bold tracking-tight">
            Tarjetas guardadas
          </p>
          <button className="translate-y-1 rounded-full bg-purple-500 px-3 py-1 text-white">
            +Añadir
          </button>
        </div>
        <p className="self-start tracking-tight text-gray-500">
          Lista de tarjetas que has guardado
        </p>
      </div>

      <div className="flex w-full flex-col gap-y-5 pt-3">
        <div className="border-gray-3 relative flex justify-between gap-x-5 rounded-sm border p-2">
          <div className="flex gap-x-5">
            <span className="rounded-md bg-gray-100 px-3">
              <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold"> visa xxxx xxxx 1234</span>
              <span className="text-gray-500">Expira en 16/24</span>
            </div>
          </div>
          <span className="text-2xl font-black text-gray-400">...</span>
          <span className="absolute top-0 right-0 -translate-y-3 -translate-x-5 rounded-full border border-emerald-400 bg-emerald-50 px-3 text-emerald-400">
            Primaria
          </span>
        </div>

        <div className="border-gray-3 relative flex justify-between gap-x-5 rounded-sm border p-2">
          <div className="flex gap-x-5">
            <span className="rounded-md bg-gray-100 px-3">
              <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold"> visa xxxx xxxx 1234</span>
              <span className="text-gray-500">Expira en 16/24</span>
            </div>
          </div>
          <span className="text-2xl font-black text-gray-400">...</span>
        </div>
      </div>

      <p className="pt-3 text-gray-600">
        En el siguiente espacio se muestra el resumen final de tu pedido, al
        precionar pagar realizaremos el cobro de la tarjeta seleccionada como
        primaria. Si desea cambiar el metodo de pago, use el enlace siguiente.{' '}
        <button
          onClick={() => {
            changePayMetod('contra-entrega')
          }}
          className="text-purple-500"
        >
          cambiar
        </button>
      </p>
    </>
  )
}

PayWithCard.propTypes = {
  changePayMetod: PropTypes.func.isRequired
}

export const PayOnDelivery = ({ changePayMetod }: Props) => {
  return (
    <>
      <div className="w-full">
        <div className=" flex items-center justify-between">
          <p className="font-poppins text-lg font-bold tracking-tight">
            Pago contra entrega
          </p>
        </div>
        <p className="self-start tracking-tight text-gray-500">
          Has seleccionado pago contra entrega, usted pagará al momento de
          recibir su pedido, si desea cambiar el metodo de pago, puede hacerlo
          en el siguiente enlace.{' '}
          <button
            onClick={() => {
              changePayMetod('tarjeta')
            }}
            className="text-purple-500"
          >
            cambiar
          </button>
        </p>
      </div>

      <div className="flex w-full flex-col gap-y-5 pt-3">
        <img src={imgDelivery1} />
      </div>

      <p className="pt-3 text-gray-600">
        En el siguiente espacio se muestra el resumen final de tu pedido, al
        precionar pagar le contactaremos para confirmar su pedido.{' '}
      </p>
    </>
  )
}

interface Props {
  changePayMetod: (method: string) => void
}
