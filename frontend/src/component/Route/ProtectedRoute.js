import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Redirecionando para login se não estiver autenticado em rota protegida 
const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
  
    return (
      <Fragment>
        {!loading && (
          isAuthenticated ? (
            <Element {...rest} />
          ) : (
            <Navigate to="/login" replace />
          )
        )}
      </Fragment>
    );
};
  
export default ProtectedRoute;
