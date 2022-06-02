import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

function PortalComponent({ children, open, setOpen,closeChildren }) {


  const handleClose = () => {
    setOpen(false);
    if(closeChildren){
      closeChildren(null)
    }
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <div>
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/60'
          ></motion.div>
        </div>

        <div >
          <Dialog.Panel
            className=' absolute top-0 left-0
          flex justify-center items-center w-screen h-screen'
          >
            <div
              className='  w-full h-full flex justify-center items-center'
              onClick={handleClose}
            >
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
  );
}

export default PortalComponent;

PortalComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
  closeChildren: PropTypes.func,
  children: PropTypes.element,
};
