import { useEffect, useState } from "react";
import API from "../../../api";
import { NormalTime } from "../../../constants/helper";
import { Link } from "react-router-dom";

export default function UserElection(){

    const [elections, setElections] = useState([]);
    



    useEffect(() => {
        loadData();
      }, []);


   

      const loadData=()=>{
        API.get('/elections/current')
        .then(data => setElections(data.elections))
        .catch(err => console.log(err));
      }


    return (
        <div>
            {
                elections.map(
                    (election,i)=><div className="shadow bg-white p-3 mb-3" key={i}>
                        <div className=" d-flex justify-content-between" >
                            <h6>
                                {election.electionName} <br /> <Link to={"/user/vote/"+election._id} className="btn btn-primary my-2">Vote Nows</Link>
                            </h6>
                            <span>
                                <span className="me-2">
                                    Start : <NormalTime dateStr={election.startDate} />
                                </span> 
                                <br />
                                <span className="me-2">
                                    End : <NormalTime dateStr={election.endDate} />
                                </span>
                            </span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}