import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TimeAgo from "../../components/time_ago";
import { useEffect, useState } from "react";
import API from "../../api";

export default function UserDashboard(){
        const [notices, setNotices] = useState([]);
  

    useEffect(() => {
        API.get('/notices')
            .then(data => {
                setNotices(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (

        <div>
            {

                notices.map((notice,i)=>
                <div className="bg-white shadow mb-3 p-3">
                    {notice.message}
                    <div className="text-end">
                        <TimeAgo datetime={notice.updatedAt}></TimeAgo>
                    </div>
                </div>
                )
            }
            
        </div>
    )
}