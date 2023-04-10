import { useState } from "react";
import API from "../../../../api";

export default function AddCandidate({type,onAdd,canceled}){

  

    const handleSubmit=()=>{

    };
    return (
        <div>
            <h2>Add {type} Candidate</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <input type="hidden" name="type" value={type} />
                <div className="row">
                    <div className="col-md-3">
                        <label>
                            Name:
                        </label>
                        <input required className='form-control' type="text"  />

                    </div>
                    <div className="col-md-3">
                        <label>
                            Party:
                        </label>
                        <input required className='form-control' type="text"  />

                    </div>
                    <div className="col-md-3">
                        <label>
                            Party Logo:
                        </label>

                        <input required className='form-control' type="file" name="" />
                    </div>
                    <div className="col-md-3 pt-3">
                        <div>

                            <button className='btn btn-primary me-2' type="submit">Add Election</button> 
                            <span className='btn btn-danger ' onClick={canceled}>cancel</span>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );

}