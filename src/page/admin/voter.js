import { Link, useParams } from "react-router-dom";
import { voterStates, voterURLs } from "../../constants/voter";
import { useEffect, useState } from "react";
import API from "../../api";
import DataTable from 'react-data-table-component';
import Modal from "../../components/modal";

export default function AdminVoter(){
    const { stat } = useParams();
    const [voters,SetVoters]=useState([]);
    const [voter,Setvoter]=useState(null);
    const columns = [
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Mobile no',
            selector: row => row.mobileNumber,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Citizenship No',
            selector: row => row.citizenshipNumber,
            sortable: true,
        },
        {
            name: "Actions",
            button: true,
            cell: (row) => (
                row.isVerified || row.isDeleted?
                <button
                className="btn btn-sm btn-link"
                onClick={(e) =>showDetail(row) }
            >
                Detail
            </button>
                :
                <button
                    className="btn btn-sm btn-link"
                    onClick={(e) =>verifyUser(row) }
                >
                    Verify
                </button>
            ),
        }
    ];

    const showDetail=(id)=>{
        Setvoter(id);
    };

    const verifyUser=(voter)=>{

        API.post(`/admin/users/${voter._id}/verifyUser`,{})
        .then(()=>{
            loadData();
        })
        console.log(voter);
    };
    useEffect(()=>{
        console.log(stat);
        loadData();
    },[stat]);

    const loadData=()=>{
        API.get(voterURLs[stat])
        .then((data)=>{
            SetVoters(data.users);
            
        }).catch((err)=>{
            SetVoters([]);
        })
    };
    return <div className="">
        <div className="row">
            {
                voterStates.map((data,i)=><div key={i} className="col-4 text-center">
                    <Link to={"/admin/voters/"+i} className={"btn w-100 "+(stat==i?'btn-primary':"btn-link")}>
                        {data}
                    </Link>
                </div>)
            }
        </div>


        <div className="my-3 bg-white shadow p-3">
        <DataTable
                        pagination
                        responsive
                        selectableRowsSingles  s
                        columns={columns}
                        data={voters}
                    />
        </div>

        {
            voter!=null?
            <Modal title={"Detail of "+voter.name} onClose={()=>{Setvoter(null)}}>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <strong>Name</strong> 
                        <div className="pt-1">{voter.name}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Date of Birth</strong> 
                        <div className="pt-1">{voter.dateOfBirth}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Email</strong> 
                        <div className="pt-1">{voter.email}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Mobile number</strong> 
                        <div className="pt-1">{voter.mobileNumber}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Gender</strong> 
                        <div className="pt-1">{voter.gender}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Citizen ship</strong> 
                        <div className="pt-1">{voter.citizenshipNumber}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Issued District</strong> 
                        <div className="pt-1">{voter.issuedDistrict}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Issued Authority</strong> 
                        <div className="pt-1">{voter.issuedAuthority}</div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <strong>Issued Date</strong> 
                        <div className="pt-1">{voter.issuedDate}</div>
                    </div>
                  

                </div>
            </Modal>:""
        }
    </div>
}