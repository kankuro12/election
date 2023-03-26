import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setupLogin } from './store/reducer';
import API from './api';
import Router from './Routers';

function App() {
  const authChecked = true;

  const dispatch=useDispatch();
    useEffect(() => {
      dispatch(
          setupLogin()
      );
     
  }, []);
 
  API.init();
  return (
      <div>
        {
          authChecked?<Router/>:<div>Loading</div>
        }
      </div>
  );
}

export default App;
