import { Link } from 'react-router-dom'

const Colegas = () => {
  return (
    <div className=" flex flex-col border-b  border-color_green_4 pb-2 pt-3 font-poppins ">
      <p className="text-sm  text-color_green_5">Colegas</p>
      <div className="flex flex-col gap-y-4 py-4 text-sm">
        {[1, 2, 3, 4].map((usuario) => (
          <Link
            key={usuario}
            to={`/trabajadores/321321321/chat`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-x-3 ">
              <img
                alt="img de colega"
                src="https://res.cloudinary.com/dwkfj5sxb/image/upload/v1651857885/ale_g4ceqr.jpg"
                className="h-10 w-10 rounded-full object-cover "
              />
              <div>
                <p className="w-32 truncate font-semibold capitalize text-color_gray_1">
                  YUZU YAZU
                </p>
                <p className="text-xs font-light text-color_green_5"></p>
              </div>
            </div>
            {usuario.online ? (
              <span className="block h-2 w-2 rounded-full bg-color_green_8"></span>
            ) : (
              <span className="block h-2 w-2 rounded-full bg-gray-500"></span>
            )}
          </Link>
        ))}

        <p className=" flex cursor-pointer items-center justify-between text-sm font-semibold text-color_green_7">
          <span>ver mas</span>
          <span className="text-lg">...</span>
        </p>
      </div>
    </div>
  )
}

export default Colegas
