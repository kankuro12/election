import { Navigate, useRoutes } from "react-router-dom";
import Forgot from "../page/auth/forget.js";
import Login from "../page/auth/login.js";
import Register from "../page/auth/register.js";

export default function AuthRoutes(){

   
    return useRoutes([
        {
          path: '/',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/forgot',
          element: <Forgot />,
        }
    ]);
}