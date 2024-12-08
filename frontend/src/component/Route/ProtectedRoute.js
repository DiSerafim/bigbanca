import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Redirecionando para login se não estiver autenticado em rota protegida 
const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  
    return (
      <Fragment>
        {loading === false &&
          isAuthenticated ? (
            isAdmin && user.role !== "admin" ? (
              <Navigate to="/login" replace />
            ) : (
              <Element {...rest} />
            )) : (
              <Navigate to="/login" replace />
            )}
      </Fragment>
    );
};

export default ProtectedRoute;
