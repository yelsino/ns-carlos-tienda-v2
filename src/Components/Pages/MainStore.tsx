import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header'
import MenuMovil from '../Menu/MenuMovil'

interface Props {
  isAutenticated: boolean
}

const MainStore = ({ isAutenticated }: Props) => {
  return (
    <>
      {isAutenticated ? (
        <div className="mx-auto max-w-[100rem] px-5">
          <Header />
          <div className="flex">
            <div className="w-full px-5 pt-5 ">
              <Outlet />
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
