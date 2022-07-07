import Select from '../../../Atoms/Select'

interface Props {
  typePayment: string
  setTypePayment: (typePayment: string) => void
}

const TypePayment = ({ typePayment, setTypePayment }: Props) => {
  return (
    <>
      <p className="flex w-full justify-between pt-3 font-bold">
        ¿Como desea pagar?
      </p>

      <div className="flex w-full flex-col gap-y-3 font-poppins">
        <Select
          checked={typePayment === 'contra-entrega'}
          onClick={() => {
            setTypePayment('contra-entrega')
          }}
          text="Pagaré al recibir mi pedido"
        />
        <Select
          checked={typePayment === 'tarjeta'}
          onClick={() => {
            setTypePayment('contra-entrega')
          }}
          text="Deseo pagar ahora con tarjeta"
        />
      </div>
    </>
  )
}

export default TypePayment
