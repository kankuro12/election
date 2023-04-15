import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { posts } from "../../../../constants/helper";
import API from "../../../../api";
import BarChart from "../../../result/bar_chart";
import './result.css';
import PieChart from "../../../result/pie_chart";
export default function AdminResult() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [mode, setmode] = useState(1);
    const [pieData, setPieData] = useState(null);

    const loadData = () => {
        API.post('/elections/result', { id, type: 1 })
            .then(_data => {

                setData(_data);
                console.log(_data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadData();
    }, id);

    return (
        <div>
            {
                data ?
                    <div>
                        <div className="shadow bg-white mb-3 px-3 pt-3 d-flex justify-content-between">
                            <button onClick={() => { setmode(1) }} className={"btn" + (mode == 1 ? " active" : "")}>Voter Result</button>
                            <button onClick={() => { setmode(2) }} className={"btn" + (mode == 2 ? " active" : "")}>Group By Age</button>
                            <button onClick={() => { setmode(3) }} className={"btn" + (mode == 3 ? " active" : "")}>Group By gender</button>
                        </div>
                        <div className={mode == 1 ? "" : "d-none"}>
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
                                            {
                                                data.ballots[post].length > 0 ?
                                                    <BarChart data={data.ballots[post]} type={post} />
                                                    : <h5 className="text-danger">No votes in this category</h5>
                                            }
                                        </div>
                                    </div>)}
                            </div>

                        </div>
                        <div className={mode == 2 ? "" : "d-none"}>
                            <div className="shadow p-2 bg-white" >

                                <PieChart ageGroup={data.ageGroup} d={"age"} title={"Grop Wise Report"} />
                            </div>
                        </div>
                        <div className={mode == 3 ? "" : "d-none"}>
                            <div className="shadow p-2 bg-white" >
                                <PieChart ageGroup={data.genderGroup} title={"Gender Wise REport Report"} />
                            </div>                    
                        </div>

                    </div> : "Loading Data"

            }
        </div>
    );

}