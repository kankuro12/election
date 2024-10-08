import { useState } from "react";
import API from "../../../../api";
import ImageUploader from "../../../../components/imageuploader";

export default function AddCandidate({type,onAdd,canceled,election}){

  

    const handleSubmit=(e)=>{
        e.preventDefault();
        API.postForm("/candidates",new FormData(e.target))
        .then((data)=>{
            onAdd();
        })
        .catch((err)=>{

        });
    };
    
    return (
        <div className="bg-white p-3 shadow">
            <h2>Add {type} Candidate</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <input type="hidden" name="type" value={type} />
                <input type="hidden" name="election" value={election} />
                <div className="row">
                    <div className="col-md-3">
                        <label>
                            Party Logo:
                        </label>
                        <ImageUploader isrequired={true} name="image"/>
                    </div>
                    <div className="col-md-3">
                        <label>
                            Name:
                        </label>
                        <input required name="name" className='form-control' type="text"  />

                    </div>
                    <div className="col-md-3">
                        <label>
                            Party:
                        </label>
                        <input required name="partyName" className='form-control' type="text"  />

                    </div>
                    
                    <div className="col-md-3 pt-3">
                        <div>

                            <button className='btn btn-primary me-2' type="submit">Add</button> 
                            <span className='btn btn-danger ' onClick={canceled}>cancel</span>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );

}