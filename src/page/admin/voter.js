import { Link, useParams } from "react-router-dom";
import { voterStates, voterURLs } from "../../constants/voter";
import { useEffect, useState } from "react";
import API from "../../api";
import DataTable from 'react-data-table-component';

export default function AdminVoter(){
    const { stat } = useParams();
    const [voters,SetVoters]=useState([]);
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
                <button
                    className="btn btn-sm btn-link"
                    onClick={(e) =>showDetail(row._id) }
                >
                    Detail
                </button>
            ),
        }
    ];

    const showDetail=(id)=>{
        alert(id);
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
                voterStates.map((data,i)=><div key={i} className="col-6 text-center">
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
    </div>
}