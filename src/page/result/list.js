import { useEffect, useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";

export default function CommonResultList(){
    const [elections,setElections]=useState([]);
    const loadData=()=>{
        API.get('/elections/list')
        .then((eles)=>{
            setElections(eles.filter(o=>o.posted));
        })
    }

    useEffect(() => {
        loadData();
    },[]);


    return (
        <div className="shadow p-3 mb-3">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Election</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {elections.map((election,i)=>
                    <tr>
                        <td>{election.electionName}</td>
                        <td>{election.startDate}</td>
                        <td>{election.endDate}</td>
                        <td>
                            <Link to={"/user/result/" + election._id} className="btn btn-primary m-2">View Result</Link>

                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}