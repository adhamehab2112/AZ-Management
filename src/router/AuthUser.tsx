import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthUserProps {
    children: ReactNode;
}

function AuthUser({ children }: AuthUserProps) {
    if (localStorage.getItem('userDetails')) {
        return <>{children}</>
    }
    else {
        return <Navigate to="/login" />
    }
}
export default AuthUser ;