import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import API from "../../api";
import TimeAgo from "../../components/time_ago";

export default function AdminDashboard() {

        const [notices, setNotices] = useState([]);


        // Fetch all notices from the server on component mount
        useEffect(() => {
                loadNotice();
        }, []);

        const loadNotice = () => {
                API.get('/notices')
                        .then(data => {
                                setNotices([data.slice(-3)]);
                        })
                        .catch(error => {
                                console.log(error);
                        });
        }
        return (
                <div>
                        {

                                notices.map((notice, i) =>
                                        <div className="bg-white shadow mb-3 p-3">
                                                {notice.message}
                                                <div className="text-end">
                                                        <TimeAgo datetime={notice.updatedAt}></TimeAgo>
                                                </div>
                                        </div>
                                )
                        }        </div>
        );
}