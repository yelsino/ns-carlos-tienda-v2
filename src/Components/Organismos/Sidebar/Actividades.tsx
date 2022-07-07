// import { useLocation } from "react-router-dom";

const Actividades = () => {
  return (
    <div className=" flex flex-col pb-2  pt-3 font-poppins text-color_gray_1   ">
      <p className="text-sm  text-color_green_5">Colegas</p>

      <div className="flex flex-col gap-y-4 py-4 text-sm">
        <p>Pedido #200 pediente</p>
        <p>Activar nuevo trabajador</p>
        <p>Arqueo de caja</p>
        <p>Pedido #200 pediente</p>
      </div>
      <p className=" cursor-pointer text-sm font-semibold text-color_green_7">
        ver mas
      </p>
    </div>
  )
}

export default Actividades
