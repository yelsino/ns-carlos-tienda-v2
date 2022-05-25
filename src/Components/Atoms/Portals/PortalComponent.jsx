// import { motion } from 'framer-motion';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

function PortalComponent({ children, open, setOpen }) {


  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Transition show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
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
            className=' absolute top-0 left-0
          flex justify-center items-center w-screen h-screen'
          >
            <div
              className='  w-full h-full flex justify-center items-center'
              onClick={() => {
                setOpen(false);
              }}
            >
              {children}
            </div>
            {/* ... */}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
    </motion.div>
  );
}

export default PortalComponent;

PortalComponent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.element,
};
