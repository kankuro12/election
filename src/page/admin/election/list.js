import { Link } from "react-router-dom";
import { getLocalDate } from "../../../constants/helper";

export default function AdminElectionList({elections,onDel,onEdit,onPost}){
    return (
    <table className="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                elections.map(election=><tr>
                    <td>{election.electionName}</td>
                    <td>{ getLocalDate(election.startDate).replace('T',"  ")}</td>
                    <td>{getLocalDate(election.endDate).replace('T','  ')}</td>
                    <td>
                        <button className="me-2 btn btn-primary" onClick={()=>{onEdit(election)}}>Edit</button>
                        {

                            election.posted?"":
                            <button className="me-2 btn btn-success" onClick={()=>{onPost(election)}}>Post Election</button>
                        }
                        <button className="me-2 btn btn-danger" onClick={()=>{onDel(election)}}>Del</button>
                        <Link className="me-2 btn btn-success" to={"/admin/candidates/"+election._id}>Manage</Link>
                        <Link className="me-2 btn btn-success" to={"/admin/result/"+election._id}>Result</Link>
                    </td>
                </tr>)
            }
        </tbody>
    </table>
    );
}