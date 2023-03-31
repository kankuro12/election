import React from "react"
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function UserLayout() {


    const logged = useSelector((state) => state.election.logged);
    
    if (!logged) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div >
                <NavBar role="user" />
                <div className="page">
                    <div className="inner">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }
}