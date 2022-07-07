import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ isAutenticated }) => {
  return <>{!isAutenticated ? <Outlet /> : <Navigate to="/" />}</>
}

export default PublicRoute

PublicRoute.propTypes = {
  isAutenticated: PropTypes.bool
}
