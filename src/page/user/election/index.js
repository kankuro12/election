import { useEffect, useState } from "react";
import API from "../../../api";
import { NormalTime, isDateBetween, posts } from "../../../constants/helper";
import { Link } from "react-router-dom";
import Modal from "../../../components/modal";
import { useSelector } from "react-redux";

export default function UserElection() {

    const [ballots, setBallots] = useState([]);
    const [view, setview] = useState(false);
    const [election, setElection] = useState([]);
    const [currentElection, setcurrentElection] = useState([]);
    const [votedElection, setvotedElection] = useState([]);
    const user = useSelector((state) => state.election.user);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        API.get('/elections/current')
            .then(data => {

                const eles = data.elections;
                const bals = data.ballots;
                const eID = bals.map(ele => ele.electionId);
                console.log(eID,);
                let e1 = [];
                let e2 = [];
                const now = Date();
                for (let index = 0; index < eles.length; index++) {
                    const ele = eles[index];
                    console.log(ele.ballots);
                    if (eID.includes(ele._id)) {
                        e1.push(ele);
                    } else {
                        if (isDateBetween(now, ele.startDate, ele.endDate)) {
                            e2.push(ele);
                        }
                    }
                }
                console.log(e1);
                console.log(e2);

                setcurrentElection(e2);
                setvotedElection(e1);
                setBallots(bals);
            })
            .catch(err => console.log(err));
    }

    const viewBallot = (election) => {
        setElection(election);
        console.log(ballots);
        setview(true);
    }

    return (
        <div>
            {
                user.isVerified ?
                    <div>

                        <div className="shadow bg-white mb-3">
                            <h5 className="mb-0  p-3">
                                Currently Running Elections
                            </h5>
                            <hr className="m-0" />
                            <div className="p-3">
                                {
                                    currentElection.map(
                                        (election, i) => <div key={i}>
                                            <div className=" d-flex justify-content-between" >
                                                <h6>
                                                    {election.electionName} <br />
                                                    <Link to={"/user/vote/" + election._id} className="btn btn-primary m-2">Vote Now</Link>
                                                    <Link to={"/user/result/" + election._id} className="btn btn-primary m-2">View Result</Link>
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
                        </div>

                        <div className="shadow bg-white mb-3">
                            <h5 className="  p-3 mb-0">
                                Voted Elections
                            </h5>
                            <hr className="m-0" />
                            <div className="p-3">
                                {
                                    votedElection.map(
                                        (election, i) => <div key={i}>
                                            <div className=" d-flex justify-content-between" >
                                                <h6>
                                                    {election.electionName} <br />
                                                    <button onClick={() => { viewBallot(election); }} className="btn btn-primary m-2">View Ballot</button>
                                                    <Link to={"/user/result/" + election._id} className="btn btn-primary m-2">View Result</Link>
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
                        </div>

                        {

                            view ? <Modal onClose={() => { setview(false) }} title={`My Votes In ${election.electionName}`}>
                                <div>
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
                                                        election.candidates.filter(o => o.type == post).map((candidate, i) => <div className="col-md-2 " key={1}>
                                                            <div className="shadow ballot-cross ballotholder" >
                                                                <img src={API.img(candidate.partyLogo)} alt="" className="w-100" />
                                                                <div className="p-2">
                                                                    {candidate.partyName},
                                                                    <br />
                                                                    {candidate.name}

                                                                </div>
                                                                {
                                                                    ballots.find(o => o.electionId == election._id)[post] == candidate._id ?
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
                            </Modal> : ""
                        }
                    </div>
                    :
                    <div className="shadow bg-white mb-3">
                        Your Account has not been verified yet.
                    </div>
            }

        </div>
    );
}