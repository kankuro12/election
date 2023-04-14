/* eslint-disable no-restricted-globals */
import { useNavigate, useParams } from "react-router-dom";
import { posts } from "../../../constants/helper";
import { useEffect, useState } from "react";
import API from "../../../api";
import { useSelector } from "react-redux";

export default function UserVotes() {

    const [candidates, setCandidates] = useState([]);
    const [checked, setchecked] = useState(false);
    const { id } = useParams();
    const user = useSelector((state) => state.election.user);
    const navigate=useNavigate();
    const [ballot, setBallot] = useState({
        'mayor': null,
        'deputyMayor': null,
        'wardChairperson': null,
        'wardMember1': null,
        'wardMember2': null,
        'wardMember3': null,
        'wardMember4': null
    });

    useEffect(() => {
        loadData();
    }, []);

    const set = (type, user_id) => {
        const data = { ...ballot };
        data[type] = user_id;
        setBallot(data);
    };

    const loadData = () => {
        API.post('/elections/detail', { id })
            .then(data => {

                setCandidates(data.candidates);
            })
            .catch(err => console.log(err));
    }



    const saveBallot=()=>{
        const data = Object.keys(ballot).filter(key => ballot[key] === null);
        if(!checked){
            alert("Please Accept Policy")
            return;
        }
        if(data.length>0){
            if(!(confirm(`The votes for position ${data.join(", ")} ${data.length>1?"are":"is"} is not found.Do you want to continue?`))){
                return;  
            }
        }
        API.post("ballot",{...ballot,votedBy:user.id,electionId:id})
        .then((data)=>{
            navigate('/user/elections');
        })
        .catch((err)=>{

        });
        console.log(data);
    };


    return (
        <div>
            <div value={1}>
                {posts.map((post, i) =>
                    <div className="shadow mb-3 bg-white" key={i}>
                        <h6 className="d-flex pt-3 ps-3 justify-content-between">
                            <span className="text-capitalize ">
                                {post}
                            </span>

                        </h6>
                        <hr />
                        <div className="p-3">
                            <div className="row">
                                {
                                    candidates.filter(o => o.type == post).map((candidate, i) => <div className="col-md-2 " key={1}>
                                        <div className="shadow ballot-cross ballotholder" onClick={()=>{set(post,candidate._id)}}>
                                            <img src={API.img(candidate.partyLogo)} alt="" className="w-100" />
                                            <div className="p-2">
                                                {candidate.partyName},
                                                <br />
                                                {candidate.name}

                                            </div>
                                            {
                                                ballot[post]==candidate._id?
                                                <div className="chap">
                                                    <img className="w-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Broken_crossed_circle.svg/768px-Broken_crossed_circle.svg.png" alt="" />
                                                </div>
                                                :
                                                ""

                                            }

                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>)}

            </div>
            <div className="shadow mb-3 bg-white p-3" >
                <h6>
                    <input type="checkbox" checked={checked} onChange={()=>{setchecked(!checked)}} /> Policy notice
                </h6>
                <button className="btn btn-primary" onClick={()=>{saveBallot()}}>
                    Save Ballot
                </button>
            </div>
            
        </div>
    );
}