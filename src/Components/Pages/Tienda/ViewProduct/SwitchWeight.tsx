import { RadioGroup } from '@headlessui/react'
import './cssViewProduct.css'
import { motion } from 'framer-motion'

import { useSwitchWeight } from 'Hooks/useSwitchWeight'
import { IconDelete } from 'Components/Atoms/Icons';
import { IProducto } from 'types-yola';
import { useContext, useState } from 'react';
import { ListContext } from 'Context/List/ListContext';
import { convertirTipoVenta } from 'utils/pipe';

interface Props {
  producto: IProducto
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
  adding: boolean
}


const SwitchWeight = ({ producto, setAdding, adding }:Props) => {

  const { 
    pesoSeleccionado,
    seleccionarPeso,
    cantidadEnLista,
    precioSeleccionado,
    montoTotalDelProducto,
    cantidadTotalDelProducto,
    // quantitySelected,
    // totalProduct,
    // totalWeight,
    removeProductOfList,
    itemLista,
    addProductToList
  } = useSwitchWeight({ 
    producto, 
    setAdding, 
  });

  return (
    <>
      {pesoSeleccionado && (
        <>
        
          <RadioGroup
            value={pesoSeleccionado}
            onChange={(e) => seleccionarPeso(e)}
            className="flex w-full justify-between"
          >
            {producto.precios.map(
              ({textoPesoA, textoPesoB, _id},index) => (
                <RadioGroup.Option
                  key={_id}
                  value={_id}
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
                        {checked ? textoPesoB : textoPesoA}
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
                <span className="text-md"> S/. </span>
                <span className="text-lg font-extrabold">
                  {precioSeleccionado}
                  </span>
              </span>
            </p>

            <p className="flex w-full justify-between">
              <span>Cantidad en lista</span>

              <span className="text-color_green_7">
                {cantidadEnLista} und</span>
            </p>
            <p className="flex w-full justify-between">
              <span>Cantidad Total</span>
              <span className="text-color_green_7">
                <motion.span
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ scaleY: 0 }}
                  // key={precioTotalSeleccionado}
                  className="inline-block font-bold"
                >
                  {cantidadTotalDelProducto}  
                </motion.span>
                 {` ${convertirTipoVenta(producto.tipoVenta) }`}
              </span>
            </p>
            <p className="flex w-full justify-between">
              <span>Monto total</span>
              <span className="text-color_green_7">
                {" S/. "}
                <motion.span
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ scaleY: 0 }}
                  // key={precioTotalSeleccionado}
                  className="inline-block font-bold"
                >
                  {montoTotalDelProducto}  
                </motion.span>
              </span>
            </p>
          </div>

          {/* BUTTONS */}

          <div className="flex w-full items-center justify-between" >
            <motion.button
              animate={adding ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={()=>addProductToList()}
              disabled={adding}
              className={`w-48 bg-orange-600 py-3 font-poppins font-semibold text-white ${
                adding ? 'cursor-wait' : 'cursor-pointer'
              }`}
            >
              Añadir
            </motion.button>

            <motion.button
              // onClick={removeProductOfList}
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
