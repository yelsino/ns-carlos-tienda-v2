import { RadioGroup } from '@headlessui/react'
import './cssViewProduct.css'
import { motion } from 'framer-motion'
import { IconDelete } from '../../../Atoms/Icons'

import { ProductModel } from 'schemas/Product.model'
import { useSwitchWeight } from 'Hooks/useSwitchWeight'
import { useState } from 'react'

interface Props {
  product: ProductModel
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
  adding: boolean
}


const SwitchWeight = ({ product, setAdding, adding }:Props) => {



  const { 
    weight,
    setWeight,
    alterproduct,
    priceSelected,
    quantitySelected,
    totalProduct,
    totalWeight,
    removeProductOfList,
    addProductToList
  } = useSwitchWeight({ 
    product, 
    setAdding, 
  });

  return (
    <>
      {weight && (
        <>
          <RadioGroup
            value={weight}
            onChange={(e) => setWeight(e)}
            className="flex w-full justify-between"
          >
            {alterproduct.pricePerWeight.map(
              ({ id, weighttextlg, weighttextmd },index) => (
                <RadioGroup.Option
                  key={id}
                  value={id}
                  className="flex w-full justify-between gap-x-3"
                >
                  {({ checked }) => {
                    if(checked) localStorage
                      .setItem("position", JSON.stringify(index))
                    return (
                      <button
                        className={`overflow-hidden truncate rounded-sm border border-black px-6 py-4 tracking-tight transition duration-300 ease-in-out ${
                          checked
                            ? 'width-active1 bg-black text-white  '
                            : 'width-inactive1 bg-white'
                        }`}
                      >
                        {checked ? weighttextlg : weighttextmd}
                      </button>
                    )
                  }}
                </RadioGroup.Option>
              )
            )}
          </RadioGroup>

          {/* PRICE */}

          <div className="flex w-full flex-col gap-y-1">
            <p className="flex w-full justify-between ">
              <span className="">Precio</span>
              <span>
                <span className="text-lg font-extrabold">{priceSelected}</span>
                <span className="text-md">s/ </span>
              </span>
            </p>

            <p className="flex w-full justify-between">
              <span>En lista</span>

              <span className="text-color_green_7">{quantitySelected} und</span>
            </p>
            <p className="flex w-full justify-between">
              <span>Total</span>
              <span className="text-color_green_7">
                <motion.span
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ scaleY: 0 }}
                  key={totalProduct}
                  className="inline-block font-bold"
                >
                  {totalWeight}
                </motion.span>
                {totalProduct}
              </span>
            </p>
          </div>

          {/* BUTTONS */}

          <div className="flex w-full items-center justify-between" >
            <motion.button
              animate={adding ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={addProductToList}
              disabled={adding}
              className={`w-48 bg-orange-600 py-3 font-poppins font-semibold text-white ${
                adding ? 'cursor-wait' : 'cursor-pointer'
              }`}
            >
              Añadir
            </motion.button>

            <motion.button
              onClick={removeProductOfList}
              className="flex h-full w-14 items-center justify-center text-2xl hover:text-orange-600 ease-in duration-300"
            >
              <IconDelete />
            </motion.button>
          </div>
        </>
      )}
    </>
  )
}

export default SwitchWeight
