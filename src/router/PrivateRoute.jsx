// import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  isAutenticated,
}) => {
  return (
    <>
      {
        !isAutenticated
          ? <Outlet />
          : <Navigate to="/" />
      }
    </>

  );
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  // isAutenticated: PropTypes.bool.isRequired,
  isAutenticated: true,
}