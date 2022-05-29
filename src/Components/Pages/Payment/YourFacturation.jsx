const YourFacturation = () => {
  return (
    <>
      <h2 className='text-3xl font-poppins font-extrabold'>Su Facturación</h2>
      <img
        className='rounded-full object-cover w-32 h-32'
        src='https://res.cloudinary.com/dwkfj5sxb/image/upload/v1651857885/ale_g4ceqr.jpg'
      />

      <div className='w-full font-poppins'>
        <div>
          <p>Sus nombres</p>
          <input className='bg-color_green_2 w-full py-4 outline-none px-5 text-color_green_7' />
        </div>
        <div>
          <p>Apellidos</p>
          <input className='bg-color_green_2 w-full py-4 outline-none px-5 text-color_green_7' />
        </div>
        <div>
          <p>Celular</p>
          <input className='bg-color_green_2 w-full py-4 outline-none px-5 text-color_green_7' />
        </div>
      </div>
      <p className='flex justify-between w-full pt-5 font-poppins'>
        <span className='font-bold'>Indique su dirección</span>
        <span className='text-purple-500'>añadir</span>
      </p>

      <div className='w-full flex flex-col gap-y-3 font-poppins'>
        <div className='flex items-center justify-between px-5 py-4 border'>
          <span className='truncate'>Jr 1° de noviembre 1555</span>
          <input type='radio' />
        </div>
        <div className='flex items-center justify-between px-5 py-4 border'>
          <span className='truncate'>Jr 1° de noviembre 1555</span>
          <input type='radio' />
        </div>
        <div className='flex items-center justify-between px-5 py-4 border'>
          <span className='truncate'>Jr 1° de noviembre 1555</span>
          <input type='radio' />
        </div>
      </div>

      <div className='w-full font-poppins'>
        <div>
          <p>Nombre y numero de diracción</p>
          <input className='bg-color_green_2 w-full py-4 outline-none px-5 text-color_green_7' />
        </div>
        <div>
          <p>Detalles</p>
          <textarea className='bg-color_green_2 text-color_green_7 w-full py-3 outline-none px-5' />
        </div>
      </div>

      <p className='flex justify-between w-full pt-3'>
        <span className='font-bold'>¿Como desea pagar?</span>
      </p>

      <div className='w-full font-poppins'>
        <div className='flex items-center justify-between px-5 py-4 border'>
          <span className='truncate'>Pagaré al recibir mi pedido</span>
          <input type='radio' />
        </div>
        <div className='flex items-center justify-between px-5 py-4 border'>
          <span className='truncate'>Deseo pagar ahora con tarjeta</span>
          <input type='radio' />
        </div>
      </div>
    </>
  );
};

export default YourFacturation;
