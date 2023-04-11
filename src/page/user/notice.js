import { useEffect, useState } from "react";
import API from "../../api";
import TimeAgo from "../../components/time_ago";

export default function UserNotices() {
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