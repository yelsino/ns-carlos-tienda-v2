import { motion } from "framer-motion";
import ReactDOM from "react-dom";

const PortalComponent = ({children, setClose}) => {
    // create a portal 
    
    const portal = document.getElementById('portal-1');

    return ReactDOM.createPortal( 

        <motion.div
        initial={{ scale: 0, }}
        transition={{
            delay: 0.2,
            duration: 0.3,
        }}
        animate={{ scale: 1}}
        exit={{ scale: 0, transition: { duration: 0.30 } }}
        style={{ pointerEvents: "auto" }}
        className=' absolute left-0 top-0   w-full  h-full flex justify-center items-center bg-opacity-80 bg-black  '
        onClick={()=> setClose(null)}
        >
            {children}
        </motion.div>, portal
     );
}
 
export default PortalComponent;