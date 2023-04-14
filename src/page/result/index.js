import { useParams } from "react-router-dom";
import API from "../../api";
import { useEffect, useState } from "react";
import { posts } from "../../constants/helper";
import BarChart from "./bar_chart";

export default function CommonResult(){
    const { id } = useParams();
    const [data,setData]=useState(null);
    const loadData = () => {
        API.post('/elections/result', { id })
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
                data?
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
                                data.ballots[post].length>0?
                                <BarChart data={data.ballots[post]} type={post}/>
                                :<h5 className="text-danger">No votes in this category</h5>
                            }
                        </div>
                    </div>)}
                </div>:""
                
            }
        </div>
    );

}