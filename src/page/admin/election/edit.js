import React, { useState, useEffect } from 'react';
import API from '../../../api';
import { getLocalDate } from '../../../constants/helper';

const EditElection = ({election,onUpdate,canceled}) => {
  const [electionName, setElectionName] = useState(election.electionName);
  const [startDate, setStartDate] = useState(getLocalDate(election.startDate));
  const [endDate, setEndDate] = useState(getLocalDate(election.endDate));


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedElection = {
      electionName,
      startDate,
      endDate,
      id:election._id
    };
    API.post(`/elections/update`, updatedElection)
      .then(data =>onUpdate())
      .catch(err => console.log(err));
  };

  return (
    <div>
        <h2>Edit Election</h2>
        <hr />
        <form onSubmit={handleSubmit} >
            <div className="row">
                <div className="col-md-3">
                    <label>
                        Election Name:
                    </label>
                    <input required className='form-control' type="text"   value={electionName} onChange={e => setElectionName(e.target.value)} />

                </div>
                <div className="col-md-3">
                    <label>
                        Start Date:
                    </label>
                    <input required className='form-control' type="datetime-local"    value={startDate} onChange={e => setStartDate(e.target.value)} />

                </div>
                <div className="col-md-3">
                    <label>
                        End Date:
                    </label>

                    <input required className='form-control' type="datetime-local"    value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <div className="col-md-3 pt-3">
                    <div>

                        <button className='btn btn-primary me-2' type="submit">Update Election</button> 
                        <span className='btn btn-danger ' onClick={canceled}>cancel</span>
                    </div>

                </div>
            </div>

        </form>
    </div>
);
  }

export default EditElection;
