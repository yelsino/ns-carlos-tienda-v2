import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AnimationBook from "../../Atoms/Animation/Book";
import { IconGridView, IconMinus, IconPlus } from "../../Icons";

const ListProduct = () => {


  const [viewlist] = useOutletContext();
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const timeout = setTimeout(() => {
      setShow(true);
    },700);

    return () => clearTimeout(timeout);
  },[viewlist])

  return (
   <>
     
    <Transition
      show={show}
     
      leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
    <div className=' flex items-center  flex-col mt-5 lg:mt-10  w-full'>
      <div className='flex justify-between w-[300px]  mb-3 '>
        <span className='text-white'>
          <IconGridView />
        </span>
        <p className='font-bold '>MI nombre de lista</p>
        <span className='text-gray-500'>
          <IconGridView />
        </span>
      </div>

      <div className='lg:text-sm w-[340px]  lg:w-[310px]'>
        {[1, 2, 3, 4, 5, 6, 7,8,9,10,11,12].map(item => (
          <div
            key={item}
            className='shadow-md rounded-lg px-5 py-3  first-letter:text-[10px] flex  justify-between items-center'
          >
            <span className='text-color_green_7 font-semibold '>x1</span>{' '}
            Cebolla china
            <div className='flex gap-2 text-color_green_7'>
              <button className='bg-color_green_2 rounded-md px-1 flex justify-center items-center'>
                <IconMinus />
              </button>
              <button className='bg-color_green_2 rounded-md px-2 py-[2px] flex justify-center items-center'>
                <IconPlus />
              </button>
            </div>
            <div className='flex items-center'>
              5<span className='text-[10px]'>Kg</span>
            </div>
            <div className='flex items-center'>
              <span className='text-[10px] '>S/.</span>
              <span className='text-color_green_7 font-semibold'>20</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Transition>

    <Transition
      show={!show}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
    <div className=" flex justify-center items-center mt-20 ">
    <AnimationBook/>
    </div>
    </Transition>
   </>
  );
};

export default ListProduct;
