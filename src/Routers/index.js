import { Navigate, useRoutes } from "react-router-dom";
import Front from "../layout/front";
import AdminLayout from "../layout/admin";
import AuthRoutes from "./AuthRoutes";
import AdminDashboard from "../page/admin/dashboard";
import Forgot from "../page/auth/forget.js";
import Login from "../page/auth/login.js";
import Register from "../page/auth/register.js";
import UserLayout from "../layout/user";
import UserDashboard from "../page/user/dashboard";
import AdminVoter from "../page/admin/voter";
import AdminNotice from "../page/admin/notice";
export default function Router() {
    return useRoutes([
        {
            path: "admin",
            element: <AdminLayout />,
            children: [
                { path: "index", element: <AdminDashboard /> },
                { path: "notices", element: <AdminNotice /> },
                { path: "voters/:stat", element: <AdminVoter /> },
                { path: '', element: <Navigate to="/admin/index" replace={true} /> },
                { path: 'voters', element: <Navigate to="/admin/voters/0" replace={true} /> },
                { path: '*', element: <Navigate to="/admin/index" replace={true} /> },

            ]
        },
        {
            path: "user",
            element: <UserLayout />,
            children: [
                { path: "index", element: <UserDashboard /> },
                { path: '', element: <Navigate to="/user/index" replace={true} /> },
                { path: '*', element: <Navigate to="/user/index" replace={true} /> },

            ]
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/forgot',
            element: <Forgot />,
        },

        { path: '*', element: <Navigate to="/login" replace={true} /> },
    ]);
}