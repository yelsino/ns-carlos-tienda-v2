import imgDelivery1 from 'public/Assets/delivery1.png'
import { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import PaymentSuccess from './PaymentSuccess'
import { ListContext } from 'Context/List/ListContext'
import { DirectionContext } from 'Context/Direction/DirectionContext'
import { AuthContext } from 'Context/auth/AuthContext'
import { SocketContext } from 'Context/Socket/SocketContext'
import { useOrder } from 'Hooks/useOrder'
import { IRouterContext } from 'interfaces/routerContext.interface';
import { IconCheck } from 'Components/Atoms/Icons'

export interface ResCreateOrder {
  ok: boolean
  codeOrder: string
}

const YourPayment = () => {
  // tarjeta
  const [metodPay, setMetodPay] = useState('contra-entrega')
  const { list } = useContext(ListContext)
  const { direction } = useContext(DirectionContext)
  const { user } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const { setOrderData } = useOutletContext<IRouterContext>()

  const [orderResult, setOrderResult] = useState<ResCreateOrder | null>(null)
  const {total} = useOrder({list})

  // NOTE: trabajar tipo pago en ls

  useEffect(() => {
    socket?.on('order-created', (result: ResCreateOrder) => {
      if(!result.ok) return alert('ocurrio un error al crear la orden');
      setOrderResult(result)
    
    })
  }, [socket])


  useEffect(() => {
    setOrderData((prev) => {
      return { ...prev, listID: list?.id }
    })
   }, [list])

  return (
    <div className='pt-10'>
      {metodPay === 'contra-entrega' ? (
        <PayOnDelivery changePayMetod={setMetodPay} />
      ) : (
        <PayWithCard changePayMetod={setMetodPay} />
      )}

      <div className="flex w-full flex-col gap-y-3">
        <p className="text-lg font-bold">Resumen de pedido</p>
        <span className="text-3xl font-black">S/ {total}</span>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          Lista: {list?.nombre}
        </p>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          Productos: {list?.productos?.length}  en total
        </p>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          Dirección: {direction?.nombre}
        </p>
        <p className="flex items-center gap-x-3">
          <span className="text-emerald-400">
            <IconCheck />
          </span>{' '}
          Número Movil: {user?.celular}
        </p>
      </div>

      {orderResult?.ok && <PaymentSuccess orderResult={orderResult} />}
    </div>
  )
}

export default YourPayment

interface PayProps {
  changePayMetod: React.Dispatch<React.SetStateAction<string>>
}

export const PayWithCard = ({ changePayMetod }: PayProps) => {
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

export const PayOnDelivery = ({ changePayMetod }: PayProps) => {
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
