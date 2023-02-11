import { EstadoPedido } from "types-yola"

interface Props {
  link?: boolean
  estadoPedido: EstadoPedido
  estadoComponente: EstadoPedido
}

export const ItemTracking = ({ estadoPedido, link, estadoComponente }: Props) => {
  const estados: EstadoPedido[] = ['RECIBIDO', 'PREPARANDO', 'ENVIADO', 'ENTREGADO', 'RECLAMO']
  const indexPedido = estados.indexOf(estadoPedido)
  const indexComponente = estados.indexOf(estadoComponente)
  return (
    <div className="flex justify-center">
      <div className="flex w-20 flex-col items-center justify-center">
        <span className={`pb-5 text-sm  ${estadoPedido === estadoComponente ? "text-emerald-400 font-medium" : "text-gray-400"}`}>{estadoComponente.toLocaleLowerCase()}</span>
        <div className="relative flex items-center ">
          <span
            className={`block h-5 w-5 rounded-full ${
              indexPedido >= indexComponente ? 'bg-emerald-400' : 'bg-gray-300'
            }`}
          />
          {link && (
            // <span className="absolute block h-1 w-20 translate-x-5 " />
            <span className={`absolute block h-1 w-20 translate-x-5 ${indexPedido > indexComponente ? 'bg-emerald-400' : 'bg-gray-300'}`} />
          )}
        </div>
      </div>
    </div>
  )
}
