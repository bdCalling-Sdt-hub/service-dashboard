import { Navigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser"

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({ children }) => {
    const { user } = useUser();
    const location = useLocation();
    if (user && user?.role === 'Admin') {
        return children;
    }
    return <Navigate to={"/auth"} state={{ from: location }} replace={true}></Navigate>;
}

export default AdminRoutes

