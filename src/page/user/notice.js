import { useEffect, useState } from "react";
import API from "../../api";

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

        <div></div>
    )
    
}