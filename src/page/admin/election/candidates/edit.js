import { useState } from "react";
import API from "../../../../api";
import ImageUploader from "../../../../components/imageuploader";

export default function EditCandidate({candidate,onAdd,canceled}){

  

    const handleSubmit=(e)=>{
        e.preventDefault();
        API.postForm("/candidates/edit",new FormData(e.target))
        .then((data)=>{
            onAdd();
        })
        .catch((err)=>{

        });
    };
    
    return (
        <div className="bg-white p-3 shadow">
            <h2>Edit Candidate</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <input type="hidden" name="id" value={candidate._id} />
                <div className="row">
                    <div className="col-md-3">
                        <label>
                            Party Logo:
                        </label>
                        <ImageUploader name="image"  oldfile={API.img(candidate.partyLogo)}/>
                    </div>
                    <div className="col-md-3">
                        <label>
                            Name:
                        </label>
                        <input required name="name" defaultValue={candidate.name} className='form-control' type="text"  />

                    </div>
                    <div className="col-md-3">
                        <label>
                            Party:
                        </label>
                        <input required name="partyName"  defaultValue={candidate.partyName} className='form-control' type="text"  />

                    </div>
                    
                    <div className="col-md-3 pt-3">
                        <div>

                            <button className='btn btn-primary me-2' type="submit">Update</button> 
                            <span className='btn btn-danger ' onClick={canceled}>cancel</span>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );

}