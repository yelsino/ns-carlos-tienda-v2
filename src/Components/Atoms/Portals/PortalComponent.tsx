import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { IProducto } from 'interfaces/producto.interface'

interface Props {
  children: JSX.Element | JSX.Element[]
  open: boolean
  setOpen: (open: boolean) => void
  closeChildren?: (children: IProducto | null) => void
  // closeChildren?: (children: React.ReactNode) => void
}

function PortalComponent({ children, open, setOpen, closeChildren }: Props) {
  const handleClose = () => {
    setOpen(false)
    if (closeChildren) {
      closeChildren(null)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        <motion.div
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 "
        ></motion.div>
      </div>

      <div>
        <Dialog.Panel
          className=" absolute top-0 left-0
          flex h-screen w-screen items-center justify-center"
        >
          <div
            className="  z-30 flex h-full w-full items-center justify-center"
            onClick={handleClose}
          >
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default PortalComponent
