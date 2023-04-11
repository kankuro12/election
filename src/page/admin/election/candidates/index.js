import { useParams } from "react-router-dom";
import { posts } from "../../../../constants/helper";
import { useEffect, useState } from "react";
import API from "../../../../api";
import Switch from "../../../../components/switch";
import AddCandidate from "./add";
import EditCandidate from "./edit";
import { load } from "cheerio";

export default function AdminCandidate(){
    
    const [candidates,setCandidates]=useState([]);
    const [t,setT]=useState("");
    const [mode,setMode]=useState(1);
    const [candidate,setCandidate]=useState(null);




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

      const initEdit=(candidate)=>{
        setCandidate(candidate);
        setMode(3);
      }

      const initDel=(candidate)=>{
        API.post('/candidates/del',{id:candidate._id})
        .then((data)=>{
            loadData();
        })
        .catch((err)=>{

        });
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
                            <div className="row">
                                {
                                    candidates.filter(o=>o.type==post).map((candidate,i)=> <div className="col-md-2" key={1}>
                                        <div className="shadow">
                                            <img src={API.img(candidate.partyLogo)} alt="" className="w-100"/>
                                            <div className="p-2">
                                                {candidate.partyName} , {candidate.name}
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <span className="text-secondary" onClick={()=>{initEdit(candidate)}}>
                                                        Edit
                                                    </span>
                                                    <span className="text-danger" onClick={()=>{initDel(candidate)}}>
                                                        Del
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div> )
                                }
                            </div>
                        </div>
                    </div>)}
                
            </div>
            <div value={2}>
                <AddCandidate election={id} canceled={()=>{setMode(1)}} type={t} onAdd={()=>{loadData();setMode(1);}}></AddCandidate>
            </div>
            <div value={3}>
                <EditCandidate candidate={candidate} canceled={()=>{setMode(1)}} onAdd={()=>{loadData();setMode(1);}}></EditCandidate>
            </div>


           
        </Switch>
        </div>
    );
}