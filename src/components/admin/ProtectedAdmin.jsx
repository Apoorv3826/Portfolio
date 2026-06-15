import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    return children;
}
