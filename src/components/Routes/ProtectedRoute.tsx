import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <>{element}</>;
};

export default ProtectedRoute;
