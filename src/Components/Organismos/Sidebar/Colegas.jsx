import { Link } from 'react-router-dom';

const Colegas = () => {
  return (
    <div className=' pb-2 pt-3 font-poppins  flex flex-col border-b border-color_green_4 '>
      <p className='text-color_green_5  text-sm'>Colegas</p>
      <div className='flex flex-col gap-y-4 py-4 text-sm'>
        {[1, 1, 1, 11].map(usuario => (
          <Link
            key={'ewqewq'}
            to={`/trabajadores/321321321/chat`}
            className='flex justify-between items-center'
          >
            <div className='flex gap-x-3 items-center '>
              <img
                alt='img de colega'
                src='https://res.cloudinary.com/dwkfj5sxb/image/upload/v1651857885/ale_g4ceqr.jpg'
                className='w-10 rounded-full h-10 object-cover '
              />
              <div>
                <p className='text-color_gray_1 font-semibold truncate w-32 capitalize'>
                  YUZU YAZU
                </p>
                <p className='text-xs text-color_green_5 font-light'>
                  
                </p>
              </div>
            </div>
            {usuario.online ? (
              <span className='bg-color_green_8 w-2 h-2 rounded-full block'></span>
            ) : (
              <span className='bg-gray-500 w-2 h-2 rounded-full block'></span>
            )}
          </Link>
        ))}

        <p className=' text-sm text-color_green_7 font-semibold cursor-pointer flex justify-between items-center'>
          <span>ver mas</span>
          <span className='text-lg'>...</span>
        </p>
      </div>
    </div>
  );
};

export default Colegas;
