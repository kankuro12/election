import { useParams } from "react-router-dom";
import { posts } from "../../../../constants/helper";
import { useEffect, useState } from "react";
import API from "../../../../api";
import Switch from "../../../../components/switch";
import AddCandidate from "./add";

export default function AdminCandidate(){
    
    const [candidates,setCandidates]=useState([]);
    const [t,setT]=useState("");
    const [mode,setMode]=useState(1);




    useEffect(() => {
        loadData();
      }, []);

      const loadData=()=>{
        API.post('/elections/detail',{id})
        .then(data => {
            setCandidates(data.candidates);
        })
        .catch(err => console.log(err));
      }

      const {id}=useParams();
      return (
          <div>
             <Switch test={mode}>
            <div value={1}>
          {posts.map((post,i)=>
                    <div className="shadow mb-3 p-3 bg-white" key={i}>
                        <h5 className="d-flex justify-content-between">
                            <span className="text-capitalize ">
                                {post}
                            </span>
                            <button className="btn nbtn-sm btn-primary" onClick={()=>{setT(post);setMode(2)}}>
                                Add Candidate
                            </button>
                        </h5>
                        <hr />
                        <div>

                        </div>
                    </div>)}
                
            </div>
            <div value={2}>
                <AddCandidate type={t} onAdd={()=>{loadData();setMode(1);}}></AddCandidate>
            </div>


            <div value={3}>
            </div>
        </Switch>
        </div>
    );
}