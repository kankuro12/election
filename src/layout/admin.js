import React from "react"
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function AdminLayout() {

    const isMobile = window.innerWidth < 426;

    const logged = useSelector((state) => state.election.logged);
    
    if (!logged) {
        return <Navigate to="/auth" />;
    } else {
        return (
            <div >
                <NavBar isMobile={isMobile} />
                <div className="page">
                    <div className="inner">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }
}