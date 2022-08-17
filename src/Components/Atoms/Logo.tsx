import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    // <Link to="/tienda" className=" hidden w-60 gap-2 md:w-64 lg:flex">
    <Link to="/tienda" className="flex w-52 gap-2 md:w-64">
      <div>
        <img
          className=""
          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/30/000000/external-fruit-tropical-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
        />
      </div>
      <h1 className="font-concert-one text-2xl tracking-widest">YOLA</h1>
    </Link>
  )
}

export default Logo
