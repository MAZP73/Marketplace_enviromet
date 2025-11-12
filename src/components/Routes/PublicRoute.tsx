import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface PublicRouteProps {
    children: React.ReactNode;
    redirectIfLoggedIn?: boolean;
}

const PublicRoute = ({ children, redirectIfLoggedIn = true }: PublicRouteProps) => {
    if (isAuthenticated() && redirectIfLoggedIn) {
        return <Navigate to="/welcome" replace />;
    }
    return <>{children}</>;
};

export default PublicRoute;
