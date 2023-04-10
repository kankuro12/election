/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import API from '../../../api';
import AdminElectionList from './list';
import AddElection from './add';
import Switch from '../../../components/switch';
import EditElection from './edit';

export default function AdminElection(){
    const [elections, setElections] = useState([]);
    const [election, setElection] = useState(null);
    const [mode,setMode]=useState(1);

    useEffect(() => {
        loadData();
      }, []);

      const loadData=()=>{
        API.get('/elections/list')
        .then(data => setElections(data))
        .catch(err => console.log(err));
      }
      const initEdit = (_election)=>{
        setElection(_election);
        setMode(3);
      };

      const initDel = (_election)=>{
        if(confirm('Delete??')){
            API.post('/elections/del',{id:_election._id})
            .then((data)=>{
                loadData();
                setMode(1);
            }).catch((err)=>{
                console.log(err);
            })
        }
      };

      return (<div>
        <div className="bg-white shadow p-3 mb-3 text-end">
            <button className="btn btn-primary" onClick={()=>{setMode(2)}}>
                New Election
            </button>
        </div>
        <div className="bg-white shadow p-3 mb-3 text-start">

        <Switch test={mode}>
            <div value={1}>
                <AdminElectionList elections={elections} onEdit={initEdit} onDel={initDel}></AdminElectionList>
            </div>
            <div value={2}>
                <AddElection canceled={()=>{setMode(1)}} added={()=>{loadData();setMode(1);}}/>
            </div>


            <div value={3}>
                <EditElection election={election} canceled={()=>{setMode(1)}} onUpdate={()=>{loadData();setMode(1);}}/>
            </div>
        </Switch>
</div>
        
      </div>);
}