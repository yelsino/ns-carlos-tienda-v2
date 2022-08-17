import Input from 'Components/Atoms/Input'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (name: string) => void
}
const InputNewList = ({ setModal, handleSubmit }: Props) => {
  const [name, setName] = useState('')
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full w-full flex-col justify-center  bg-white p-10 sm:h-auto sm:w-[400px] sm:rounded-lg "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto flex max-w-sm flex-col gap-y-5">
        <div>
          <h3 className="text-xl font-bold">Nombra a tu lista</h3>
          <p className="text-gray-500">
            Estas creando una nueva lista, añada un nombre y empieza de
            llenarlos de productos
          </p>
        </div>
        <div className="py-5">
          <img
            className="mx-auto"
            src="https://img.icons8.com/cute-clipart/128/undefined/shopping-cart.png"
          />
        </div>

        <Input
          title="Digite aqui"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {/* <input
          type='text'
          className='w-full px-3 py-2 bg-white rounded-sm border text-sm text-gray-700  outline-none'
          onChange={e => setName(e.target.value)}
        /> */}

        <button
          onClick={() => handleSubmit(name)}
          className="rounded-sm bg-green-500 px-3 py-4 font-poppins text-sm font-bold tracking-widest text-white"
        >
          Crear
        </button>
      </div>

      <button
        onClick={() => setModal(false)}
        className="absolute top-0 right-0 rounded-sm bg-red-500 px-3 py-2 text-sm font-bold text-white"
      >
        Cancelar
      </button>
    </motion.div>
  )
}

export default InputNewList
