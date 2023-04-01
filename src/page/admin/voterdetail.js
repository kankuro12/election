import { Link, useParams } from "react-router-dom";
import { voterStates, voterURLs } from "../../constants/voter";
import { useEffect, useState } from "react";
import API from "../../api";
import DataTable from 'react-data-table-component';

export default function AdminVoterDetail(){
    const { id } = useParams();
    
    return (<div>
        
    </div>);
}