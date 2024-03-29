import Header from 'Components/Header';
import MenuMovil from 'Components/Menu/MenuMovil';
import { useOnClick } from 'Hooks/useOnClick'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAutenticated: boolean
}

const MainStore = ({ isAutenticated }: Props) => {

  const [adding, setAdding] = useOnClick(400);

  return (
    <>
      {isAutenticated ? (
        <div className="mx-auto max-w-[100rem] px-5">
          <Header adding={adding} />
          <div className="flex">
            <div className="w-full px-5 pt-5 ">
              <Outlet context={{setAdding, adding}} />
            </div>
            <MenuMovil />
          </div>
        </div>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  )
}

export default MainStore
