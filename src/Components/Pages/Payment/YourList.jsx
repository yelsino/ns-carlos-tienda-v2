import { LayoutGroup, motion } from "framer-motion";
import { useContext } from "react";
import { ListContext } from "../../../Context/List/ListContext";
import ItemList from "../Tienda/ViewProduct/ListProduct/ItemList";


const YourList = () => {
  const {
    liststate: { list },
  } = useContext(ListContext);
    return ( 
      <>
       <h2 className='text-3xl font-poppins font-extrabold'>Su Lista</h2>
        <p className='text-lg font-poppins'>Arroz con pollo a la wachana</p>
        <p className='flex justify-between w-full px-2'>
          <span className='font-bold font-poppins text-lg'>Productos</span>
          <button className='text-purple-500'>Cambiar lista</button>
        </p>

        <LayoutGroup>
          <motion.ul
            className=' w-full gap-y-1   h-[calc(100vh-310px)]  overflow-y-scroll px-2 pt-1 flex flex-col '
            layout
            initial={{ borderRadius: 25 }}
          >
            {list?.products?.map(item => (
              <ItemList
                key={item._id}
                item={item}
              />
            ))}
          </motion.ul>
        </LayoutGroup>

        <div className='w-full px-2 '>
          <p className='flex justify-between'>
            <span>Costo de envio</span>
            <span>S/ 0.00</span>
          </p>
          <p className='flex justify-between'>
            <span>Sub total</span>
            <span>S/ 0.00</span>
          </p>
          <p className="border-b pt-3"></p>
          <p className='flex justify-between'>
            <span>Total</span>
            <span className="font-bold">S/ 0.00</span>
          </p>
        </div>
      </>
        
     );
}
 
export default YourList;