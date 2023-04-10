import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/reducer";


import { FaBeer,FaUsers } from 'react-icons/fa';
import { RiUserVoiceFill,RiLogoutBoxRFill } from 'react-icons/ri';
import { BiNotepad } from 'react-icons/bi';


import "../styles/sidebar.css";
export default function NavBar({role='admin'}){
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
            {path:"/admin/index",title:"Dashboard",icon:<FaBeer size={30} className="icon"/>,id:1},
            {path:"/admin/voters",title:"Voters",icon:<FaUsers size={30} className="icon"/>,id:2},
            {path:"/admin/elections",title:"Election",icon:<RiUserVoiceFill  fontSize={30} className="icon"/>,id:3},
            {path:"/admin/notices",title:"Notices",icon:<BiNotepad size={30} className="icon"/>,id:4},
          
        ],
        user:[
          {path:"/user/index",title:"Dashboard",icon:<FaBeer size={30} className="icon"/>,id:1},
          {path:"/user/candidates",title:"Candidates",icon:<RiUserVoiceFill  fontSize={30} className="icon"/>,id:3},
          {path:"/user/notices",title:"Notices",icon:<BiNotepad size={30} className="icon"/>,id:4},
      ]
      };

    console.log(paths[role]);
    return (
        <div className="sidebar">
            <div className="head text-white">Election</div>
            {paths[role].map((path)=>(
                    <NavLink key={path.id} className={({ isActive }) => isActive? "active link": 'link'}  to={path.path}>
                      {path.icon}
                      {path.title}
                    </NavLink>
            ))}
            <div className="link" style={{cursor:"pointer"}} onClick={()=>{dispatch(logout())}}>
              <RiLogoutBoxRFill size={30} className="icon"/>
              Logout
            </div>
        </div>
    );
}