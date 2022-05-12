import { motion } from "framer-motion";
import ItemReceta from "./ItemReceta";


const FoodRecipes = () => {

    
    return ( 
        <div>
        <p className='font-poppins mb-5'>Recetas de mandarina</p>
        <motion.div
          transition={{
            duration: 1,
          }}
          initial='hidden'
          animate='visible'
          variants={list}
          className='grid grid-cols-2 gap-5'
        >
          {[1, 2, 3, 4, 5, 6].map((i, index) => (
            <ItemReceta key={index} item={i} animation={item} />
          ))}
        </motion.div>
      </div>
     );
}
 
export default FoodRecipes;


const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };


    const item = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
    hidden: { opacity: 0 },
  };