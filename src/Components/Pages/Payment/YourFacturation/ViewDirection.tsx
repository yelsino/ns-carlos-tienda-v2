import { useState } from 'react'
import PortalComponent from '../../../Atoms/Portals/PortalComponent'
import Select from '../../../Atoms/Select'
import PropTypes from 'prop-types'
import Input from '../../../Atoms/Input'
import { IconLocation } from '../../../Atoms/Icons'

const ViewDirection = ({ setShow, setDirection, data }) => {
  const [modal, setModal] = useState(false)

  const selectDirection = (direction) => {
    setDirection({
      type: 'SELECT_DIRECTION',
      payload: direction
    })
  }

  return (
    <div className=" flex w-full flex-col gap-y-3">
      <div className="flex justify-between  pt-5 font-poppins">
        <p className="font-bold">Indique su dirección</p>{' '}
        <button onClick={setShow} className="text-purple-500 outline-none">
          añadir
        </button>
      </div>
      {data.directions.length > 0 ? (
        <>
          <button
            onClick={() => setModal(true)}
            className="flex w-full justify-center gap-x-2 rounded-lg border bg-gray-50 py-4 px-5 font-bold text-black"
          >
            <img src="https://img.icons8.com/emoji/24/000000/backhand-index-pointing-right-emoji.png" />

            <span>aqui!</span>
          </button>

          <Input
            name="ninguno"
            title="Nombre y número de dirección"
            onChange={() => { }}
            value={data?.direction?.name}
            readOnly={true}
          />
          <Input
            name="reference"
            title="Referencia"
            onChange={() => { }}
            readOnly={true}
            value={data?.direction?.reference}
          />
        </>
      ) : (
        <p className="text-gray-500">
          Actualmente no cuenta con direcciones registradas, precione en añadir
          para registrar una nueva dirección
        </p>
      )}

      <PortalComponent open={modal} setOpen={setModal}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-[500px] flex-col gap-y-3 rounded-lg bg-white  px-10 pb-10 pt-14"
        >
          <button
            onClick={() => setModal(false)}
            className="absolute top-0 right-0 rounded-tr-lg bg-rose-500 px-5 py-2 text-white"
          >
            Cerrar
          </button>
          <h3 className="font-bold">Seleccione una de sus direcciones</h3>
          <p className="text-gray-500">
            Aquella dirección seleccionada será donde se enviará el pedido
            actual que está generando
          </p>
          <div className=" flex h-[300px] flex-col gap-y-3 overflow-y-scroll">
            {data?.directions.map((d, i) => (
              <Select
                key={d._id}
                text={d.name}
                onClick={() => selectDirection(d)}
                checked={d._id === data?.direction?._id}
                icon={<IconLocation />}
              />
            ))}
          </div>
        </div>
      </PortalComponent>
    </div>
  )
}

export default ViewDirection

interface Props {
  setShow: () => void
  setDirection: (direction: any) => void
  data: any
}
