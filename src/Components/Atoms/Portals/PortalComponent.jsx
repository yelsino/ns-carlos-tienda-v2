// import { motion } from 'framer-motion';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function PortalComponent({ close, setClose, children }) {

  const [open, setOpen] = useState(false);


  // determina si la animacion va ser de entrada o salida
  useEffect(()=>{
    if(close === null){
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [close]);

  return (
    // Use the `Transition` component at the root level
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => setClose(null)}>
        <Transition.Child


          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/60'></div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-50'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-300'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'

          
        >
          <Dialog.Panel
            // onClick={() => setClose(null)}
            className=' absolute top-0 left-0
          flex justify-center items-center w-screen h-screen'
          >
            <div className='  w-full h-full flex justify-center items-center' onClick={() => setClose(null)}>
              {children}
            </div>
            {/* ... */}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default PortalComponent;

PortalComponent.propTypes = {
  close: null || PropTypes.bool,
  setClose: PropTypes.func,
  children: PropTypes.element,
};
