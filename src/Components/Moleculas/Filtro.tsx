import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { IconSearch } from '../Atoms/Icons'
import { Link } from 'react-router-dom'
import { IProducto } from 'types-yola'


interface Props {
  upData: Dispatch<SetStateAction<IProducto[]>>
  data: Array<IProducto>
}

const Filtro = ({ upData, data }: Props) => {
  const [name, setName] = useState('')
  const [letter, setLetter] = useState('')
  // const [temporal, setTemporal] = useState([]);

  useEffect(() => {
    upData(
      filterData(data, name, letter ? letter[0] : 'a', letter ? letter[1] : 'z')
    )
  }, [name, letter])

  const filterData = (
    arr: Array<IProducto>,
    category = '',
    start = 'a',
    end = 'z'
  ): Array<IProducto> => {
    const isGreater = (c1: string, c2: string) => c1 >= c2
    const isSmaller = (c1: string, c2: string) => c1 <= c2

    const filtered = arr.filter((e) => {
      const [firstChar] = e.nombre.toLowerCase()

      return isGreater(firstChar, start) && isSmaller(firstChar, end)
    })

    return filtered.filter((v) =>
      name ? v.categoria?.nombre === category.toUpperCase() : v
    )
  }

  return (
    <div className="flex w-full select-none ">
      <div className=" flex w-full flex-col items-center gap-5 pb-5">
        <RadioGroup
          className="flex items-center gap-7 font-poppins"
          value={name}
          onChange={setName}
        >
          <RadioGroup.Option value="vegetales">
            {({ checked }) => (
              <span
                onClick={() => name === 'vegetales' && setName('')}
                className={`flex cursor-pointer flex-col items-center  font-medium transition duration-500 ease-in  ${
                  checked ? 'text-color_green_7' : 'text-gray-500'
                }`}
              >
                <img src="https://img.icons8.com/fluency/24/undefined/broccoli.png" />
                <p className="text-xs sm:text-sm">Vegetal</p>
              </span>
            )}
          </RadioGroup.Option>
          <span className="block h-5 w-1 rounded-lg bg-color_green_4" />

          <RadioGroup.Option value="frutas">
            {({ checked }) => (
              <span
                onClick={() => name === 'frutas' && setName('')}
                className={` flex cursor-pointer flex-col items-center  font-medium transition duration-500  ease-in  ${
                  checked ? 'text-color_green_7' : 'text-gray-500'
                }`}
              >
                <img src="https://img.icons8.com/fluency/24/undefined/mango.png" />
                <p className="text-xs sm:text-sm">Frutas</p>
              </span>
            )}
          </RadioGroup.Option>

          <span className="block h-5 w-1 rounded-lg bg-color_green_4" />
          <RadioGroup.Option value="abarrotes">
            {({ checked }) => (
              <span
                onClick={() => name === 'abarrotes' && setName('')}
                className={` flex cursor-pointer flex-col items-center  font-medium transition duration-500  ease-in  ${
                  checked ? 'text-color_green_7' : 'text-gray-500'
                }`}
              >
                <img src="https://img.icons8.com/fluency/24/undefined/grocery-bag.png" />
                <p className="text-xs sm:text-sm">Abarrote</p>
              </span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
        {/* LETRAS */}
        <RadioGroup
          className="flex gap-7 font-semibold"
          value={letter}
          onChange={setLetter}
        >
          <RadioGroup.Option value="ag">
            {({ checked }) => (
              <span
                onClick={() => letter === 'ag' && setLetter('')}
                className={`cursor-pointer  ${
                  checked ? 'text-color_green_7' : 'text-gray-500'
                }`}
              >
                A-G
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="hm">
            {({ checked }) => (
              <span
                onClick={() => letter === 'hm' && setLetter('')}
                className={`cursor-pointer  ${
                  checked ? 'text-color_green_7' : 'text-gray-500'
                }`}
              >
                H-M
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="oz">
            {({ checked }) => (
              <span
                onClick={() => letter === 'oz' && setLetter('')}
                className={`cursor-pointer  ${
                  checked ? 'text-color_green_7' : 'text-gray-500'
                }`}
              >
                O-Z
              </span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      <Link
        to="/tienda/search-product"
        className="block translate-y-2 translate-x-3 text-color_green_7 sm:hidden"
      >
        <IconSearch />
      </Link>
    </div>
  )
}

export default Filtro
