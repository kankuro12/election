import React, { useState } from 'react';
import API from '../../../api';

const AddElection = ({ added, canceled }) => {
    const [electionName, setElectionName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newElection = {
            electionName,
            startDate,
            endDate
        };
        API.post('/elections/add', newElection)
            .then(data => added(data))
            .catch(err => console.log(err));
        setElectionName('');
        setStartDate('');
        setEndDate('');
    };

    return (
        <div>
            <h2>Add Election</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <div className="row">
                    <div className="col-md-3">
                        <label>
                            Election Name:
                        </label>
                        <input required className='form-control' type="text" value={electionName} onChange={e => setElectionName(e.target.value)} />

                    </div>
                    <div className="col-md-3">
                        <label>
                            Start Date:
                        </label>
                        <input required className='form-control' type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />

                    </div>
                    <div className="col-md-3">
                        <label>
                            End Date:
                        </label>

                        <input required className='form-control' type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
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
};

export default AddElection;
