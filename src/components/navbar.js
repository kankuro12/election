import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/reducer";
import "../styles/sidebar.css";
export default function NavBar({isMobile}){
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true)
      }
      const handleClose = () => {
        setOpen(false)
      }

      const dispatch = useDispatch();

      const paths={
        admin:[
            {path:"/admin/index",title:"Dashboard",id:1},
          
        ]
      };
      const role='admin';

    console.log(paths[role]);
    return (
        <div className="sidebar">
            <div className="head text-white">Election</div>
            {paths[role].map((path)=>(
                    <NavLink key={path.id} className={({ isActive }) => isActive? "active link": 'link'}  to={path.path}>{path.title}</NavLink>
            ))}
            <div className="link" style={{cursor:"pointer"}} onClick={()=>{dispatch(logout())}}>
              Logout
            </div>
        </div>
    );
}