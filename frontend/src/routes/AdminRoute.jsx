import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

function AdminRoute({ children, role }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to='/login' />
    }

    if (role && user.role !== 'admin') {
        return <Navigate to="/" />
    }
    return children;
}

export default AdminRoute;