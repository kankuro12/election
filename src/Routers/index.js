import { Navigate, useRoutes } from "react-router-dom";
import Front from "../layout/front";
import AdminLayout from "../layout/admin";
import AuthRoutes from "./AuthRoutes";
import AdminDashboard from "../page/admin/dashboard";


export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <Front />,
            children: [
                { 
                    path: "admin",
                    element: <AdminLayout />,
                    children: [
                        { path: "index", element: <AdminDashboard /> }
                    ]
                },
                { path: "/auth", element: <AuthRoutes /> }
            ]
        },
        // { path: '*', element: <Navigate to="/" replace={true} /> },
    ]);
}