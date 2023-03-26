import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveAuth } from "../../store/reducer";
import "../../styles/auth.css";
export default function Login(){
    const [ID,setID]=useState("");
    const [password,setPassword]=useState("");
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const login=(e)=>{
        e.preventDefault();
        dispatch(
            saveAuth()
        );
        navigate("/admin/index");
    }
    return (<div className="authpage">
        <div className="shadow loginholder p-3" >
            <h1 className="text-center">Logo</h1>
            <hr />
            <form onSubmit={login}>
                <div className="form-group mb-2">
                    <label >ID</label>
                    <input type="text" className="form-control" value={ID}  onChange={(event)=>{setID(event.target.value)}}  placeholder="ID" />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} className="form-control" />
                </div>
                <div className="text-end mb-2">
                    <Link>Forgot password</Link>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary w-100">
                            Login
                        </button>
                    </div>
                    <div className="col-md-6">
                        <Link className="btn btn-success w-100" to={"/auth/register"}>
                            Register
                        </Link>
                    </div>
                </div>

            </form>
        </div>
    </div>);
}