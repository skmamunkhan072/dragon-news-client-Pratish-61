import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { user, loding } = useContext(AuthContext);
  const location = useLocation();
  if (loding) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivetRoute;
