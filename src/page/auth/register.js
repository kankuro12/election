import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import allDistricts from "../../constants/district";
import { saveAuth } from "../../store/reducer";

export default function Register(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitData=(e)=>{
        e.preventDefault();
        const data=API.getFormData(e.target);
        if(data.password!=data.confirm_password){
            alert('Please confirm your password');
            document.getElementsByName('password')[0].focus();
            return;
        }

        API.post("auth/register",data)
        .then((res)=>{
            API.setToken(res.token);
            dispatch(saveAuth(res.user));
            navigate('/user/index');
        })
        .catch((err)=>{
            if(err.response){
                alert(err.response.data.msg);
            }
        })

    }
    return (<div className="my-4">
        <form onSubmit={submitData}>

            <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <label htmlFor="name">Name *</label>
                            <input type="text" name="name" className="form-control"  required/>
                        </div>

                        <div className="col-md-4 mb-2">
                            <label htmlFor="dateOfBirth">Date of Birth *</label>
                            <input type="date" name="dateOfBirth" className="form-control" required/>
                        </div>

                        <div className="col-md-4 mb-2">
                            <label htmlFor="email">Email *</label>
                            <input type="email" name="email" className="form-control" required/>
                        </div>

                        <div className="col-md-4 mb-2">
                            <label htmlFor="mobileNumber">Mobile Number *</label>
                            <input type="text" name="mobileNumber" className="form-control" required/>
                        </div>
                        <div className="col-md-4 mb-2">
                            <label htmlFor="gender">Gender *</label>
                            <select name="gender" className="form-control" required>
                                <option >Please select a gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Other</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <h5>Citizenship Detail</h5>
                        </div>

                        <div className="col-md-4 mb-2">
                            <label htmlFor="citizenshipNumber">Citizenship Number *</label>
                            <input type="text" name="citizenshipNumber" className="form-control" required/>
                        </div>
                        <div className="col-md-4 mb-2">
                            <label htmlFor="issuedDistrict">Issued District</label>
                            <select name="issuedDistrict" className="form-control">
                                {
                                    allDistricts.map((district,i)=><option key={i} value={district}>{district}</option>)
                                }
                            </select>
                        </div>

                        <div className="col-md-4 mb-2">
                                <label htmlFor="issuedAuthority">Issued Authority</label>
                                <input type="text" name="issuedAuthority" className="form-control" />
                        </div>

                        <div className="col-md-4 mb-2">
                            <label htmlFor="issuedDate">Issued Date*</label>
                            <input type="date" name="issuedDate" className="form-control" required/>
                        </div>

                        <div className="col-md-4 mb-2"><label htmlFor="password">Password *</label><input type="password" className="form-control" name="password" required /></div>
                        <div className="col-md-4 mb-2"><label htmlFor="confirm_password">Confirm Password *</label><input type="password" className="form-control" name="confirm_password" required /></div>

                        <div className="col-12 text-right">
                                <button className="btn btn-primary">Register</button>
                        </div>
                        
                    </div>
            </div>
        </form>
    </div>);
}