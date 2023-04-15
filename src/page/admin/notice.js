import { useEffect, useState } from "react";
import API from "../../api";

export default function AdminNotice() {
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState('');
    const [editNotice, setEditNotice] = useState(null);

    // Fetch all notices from the server on component mount
    useEffect(() => {
        loadNotice();
    }, []);

    const loadNotice=()=>{
        API.get('/notices')
            .then(data => {
                setNotices(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Add a new notice to the server
    const addNotice = (event) => {
        event.preventDefault();
        API.post('/notices', { message: newNotice })
            .then(_notices => {
                console.log(_notices);
                loadNotice();
                newNotice('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Update an existing notice on the server
    const updateNotice = (event) => {
        event.preventDefault();
        API.post(`/notices/update`, editNotice)
            .then(_data => {
                setNotices(notices.map(notice => notice._id === _data._id ? _data : notice));
                setEditNotice(null);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Delete a notice from the server
    const deleteNotice = (id) => {
        API.post(`/notices/del`,{id})
            .then(response => {
                setNotices(notices.filter(notice => notice._id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (

        <div>
            <h1>Notices</h1>

            <div className="p-3 shadow bg-white mb-3">
                <form onSubmit={addNotice}>
                    <div className="row">
                        <div className="col-md-9">
                            <input className="form-control" type="text" value={newNotice} onChange={(event) => setNewNotice(event.target.value)} />

                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" type="submit">Add Notice</button>
                        </div>
                    </div>
                </form>

            </div>

            {/* Edit notice form */}
            {editNotice &&
                <div className="p-3 shadow bg-white mb-3">
                    <form onSubmit={updateNotice}>
                        <div className="row">
                            <div className="col-md-9">
                                <input className="form-control" type="text" value={editNotice.message} onChange={(event) => setEditNotice({ ...editNotice, message: event.target.value })} />

                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary" type="submit">Update Notice</button>
                                <button className="btn btn-danger" onClick={()=>{setEditNotice(null)}} type="submit">Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            }

            {/* List of notices */}
            <div className="bg-white shadow mb-3 p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Notice
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {notices.map(notice => (
                            <tr key={notice._id}>
                                <td>
                                    {notice.message}

                                </td>
                                <td>
                                    <button onClick={() => setEditNotice(notice)}>Edit</button>
                                    <button onClick={() => deleteNotice(notice._id)}>Delete</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );

}