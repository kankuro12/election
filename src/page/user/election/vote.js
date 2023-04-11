import { useParams } from "react-router-dom";
import { posts } from "../../../constants/helper";
import { useEffect, useState } from "react";
import API from "../../../api";

export default function UserVotes() {

    const [candidates, setCandidates] = useState([]);
    const { id } = useParams();

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





    return (
        <div>
            <div value={1}>
                {posts.map((post, i) =>
                    <div className="shadow mb-3 p-3 bg-white" key={i}>
                        <h5 className="d-flex justify-content-between">
                            <span className="text-capitalize ">
                                {post}
                            </span>

                        </h5>
                        <hr />
                        <div>
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
        </div>
    );
}